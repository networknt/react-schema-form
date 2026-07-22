// @vitest-environment node

import { describe, expect, it } from 'vitest'
import {
  applyStructuredDraft,
  createStructuredDraftState,
  editStructuredDraft,
  keepStructuredDraft,
  receiveExternalStructuredValue,
  reloadExternalStructuredValue,
  resetStructuredDraft,
} from './structuredDataState'

const schema = { type: 'object' }

describe('structuredDataState', () => {
  it('starts clean with typed canonical data and both drafts', () => {
    const state = createStructuredDraftState({ schema, value: { count: 1 } })

    expect(state).toMatchObject({
      canonicalValue: { count: 1 },
      dirty: { json: false, yaml: false },
      phase: 'clean',
    })
    expect(state.drafts.json).toContain('"count": 1')
    expect(state.drafts.yaml).toContain('count: 1')
  })

  it('keeps the canonical value unchanged while editing and after invalid apply', () => {
    const initial = createStructuredDraftState({ schema, value: { count: 1 } })
    const dirty = editStructuredDraft(initial, 'json', '{"count":')
    const invalid = applyStructuredDraft(dirty, { schema })

    expect(initial.phase).toBe('clean')
    expect(dirty).toMatchObject({ canonicalValue: { count: 1 }, phase: 'dirty' })
    expect(invalid).toMatchObject({ canonicalValue: { count: 1 }, phase: 'invalid' })
    expect(invalid.error.code).toBe('SYNTAX_ERROR')
    expect(invalid.errorSource).toBe('draft')
    expect(invalid.drafts.json).toBe('{"count":')
  })

  it('keeps schema-invalid drafts out of the canonical value', () => {
    const initial = createStructuredDraftState({ schema, value: { count: 1 } })
    const dirty = editStructuredDraft(initial, 'json', '{"count": 0}')
    const invalid = applyStructuredDraft(dirty, {
      schema,
      validate: () => ({ valid: false, error: 'count must be positive' }),
    })

    expect(invalid).toMatchObject({ canonicalValue: { count: 1 }, phase: 'invalid' })
    expect(invalid.error).toMatchObject({
      code: 'SCHEMA_VALIDATION',
      message: 'count must be positive',
    })
  })

  it('applies a valid draft as typed data and synchronizes both formats', () => {
    const initial = createStructuredDraftState({ schema, value: { count: 1 } })
    const dirty = editStructuredDraft(initial, 'yaml', 'count: 2\nenabled: true\n')
    const applied = applyStructuredDraft(dirty, { schema })

    expect(applied).toMatchObject({
      canonicalValue: { count: 2, enabled: true },
      dirty: { json: false, yaml: false },
      error: null,
      phase: 'applied',
    })
    expect(applied.drafts.json).toContain('"enabled": true')
    expect(applied.drafts.yaml).toContain('count: 2')
  })

  it('resets a dirty or invalid draft to the canonical value', () => {
    const initial = createStructuredDraftState({ schema, value: { count: 1 } })
    const invalid = applyStructuredDraft(
      editStructuredDraft(initial, 'json', '{bad'),
      { schema },
    )
    const reset = resetStructuredDraft(invalid, { schema })

    expect(reset).toMatchObject({
      canonicalValue: { count: 1 },
      dirty: { json: false, yaml: false },
      error: null,
      phase: 'reset',
    })
    expect(reset.drafts.json).toContain('"count": 1')
  })

  it('adopts external changes immediately when the draft is clean', () => {
    const initial = createStructuredDraftState({ schema, value: { count: 1 } })
    const updated = receiveExternalStructuredValue(initial, { count: 2 }, { schema })

    expect(updated).toMatchObject({ canonicalValue: { count: 2 }, phase: 'clean' })
    expect(updated.drafts.yaml).toContain('count: 2')
  })

  it('contains invalid initial and external values and recovers on valid input', () => {
    const invalidInitial = createStructuredDraftState({ schema, value: [] })
    expect(invalidInitial).toMatchObject({
      canonicalValue: undefined,
      errorSource: 'external',
      phase: 'invalid',
    })
    expect(invalidInitial.error.code).toBe('WRONG_ROOT_TYPE')

    const clean = receiveExternalStructuredValue(invalidInitial, { count: 1 }, { schema })
    const rejected = receiveExternalStructuredValue(clean, new Date(), { schema })
    expect(rejected).toMatchObject({
      canonicalValue: { count: 1 },
      errorSource: 'external',
      hasPendingExternalValue: false,
      phase: 'external-change',
    })
    expect(rejected.error.code).toBe('UNSUPPORTED_VALUE')

    const recovered = receiveExternalStructuredValue(rejected, { count: 2 }, { schema })
    expect(recovered).toMatchObject({
      canonicalValue: { count: 2 },
      error: null,
      phase: 'clean',
    })
  })

  it('does not discard a dirty draft after an invalid then valid external update', () => {
    const initial = createStructuredDraftState({ schema, value: { count: 1 } })
    const dirty = editStructuredDraft(initial, 'json', '{"count": 3}')
    const rejected = receiveExternalStructuredValue(dirty, [], { schema })
    const conflicted = receiveExternalStructuredValue(rejected, { count: 2 }, { schema })

    expect(conflicted).toMatchObject({
      canonicalValue: { count: 1 },
      error: null,
      hasPendingExternalValue: true,
      pendingExternalValue: { count: 2 },
      phase: 'external-change',
    })
    expect(conflicted.drafts.json).toBe('{"count": 3}')
  })

  it('preserves dirty text when an external value changes until reload', () => {
    const initial = createStructuredDraftState({ schema, value: { count: 1 } })
    const dirty = editStructuredDraft(initial, 'json', '{"count": 3}')
    const conflicted = receiveExternalStructuredValue(dirty, { count: 2 }, { schema })

    expect(conflicted).toMatchObject({
      canonicalValue: { count: 1 },
      hasPendingExternalValue: true,
      pendingExternalValue: { count: 2 },
      phase: 'external-change',
    })
    expect(conflicted.drafts.json).toBe('{"count": 3}')

    const reloaded = reloadExternalStructuredValue(conflicted, { schema })
    expect(reloaded).toMatchObject({
      canonicalValue: { count: 2 },
      hasPendingExternalValue: false,
      phase: 'reset',
    })
  })

  it('can keep a draft while accepting the external value as its new baseline', () => {
    const initial = createStructuredDraftState({ schema, value: { count: 1 } })
    const dirty = editStructuredDraft(initial, 'json', '{"count": 3}')
    const conflicted = receiveExternalStructuredValue(dirty, { count: 2 }, { schema })
    const kept = keepStructuredDraft(conflicted)

    expect(kept).toMatchObject({
      canonicalValue: { count: 2 },
      hasPendingExternalValue: false,
      phase: 'dirty',
    })
    expect(kept.drafts.json).toBe('{"count": 3}')
  })

  it('distinguishes undefined, empty object, and empty array state', () => {
    const missing = createStructuredDraftState({ value: undefined })
    const object = createStructuredDraftState({ schema, value: {} })
    const array = createStructuredDraftState({ schema: { type: 'array' }, value: [] })

    expect(missing.drafts).toEqual({ json: '', yaml: '' })
    expect(object.drafts.json).toBe('{}')
    expect(array.drafts.json).toBe('[]')
  })
})
