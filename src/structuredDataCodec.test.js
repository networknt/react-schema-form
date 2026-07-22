// @vitest-environment node

import { describe, expect, it } from 'vitest'
import {
  StructuredDataError,
  formatStructuredValue,
  normalizeStructuredValue,
  parseStructuredText,
  structuredValuesEqual,
} from './structuredDataCodec'

const objectSchema = { type: 'object' }
const arraySchema = { type: 'array' }

describe('structuredDataCodec', () => {
  it.each([
    [{ enabled: true, nested: { count: 3 }, values: ['first', 2, null] }, objectSchema],
    [[{ id: 2 }, { id: 1 }, 'last'], arraySchema],
  ])('preserves typed semantic equality across JSON and YAML', (value, schema) => {
    const yaml = formatStructuredValue('yaml', value, { schema })
    const fromYaml = parseStructuredText('yaml', yaml, { schema })
    const json = formatStructuredValue('json', fromYaml, { schema })
    const roundTrip = parseStructuredText('json', json, { schema })

    expect(structuredValuesEqual(roundTrip, value)).toBe(true)
    if (Array.isArray(value)) expect(roundTrip).toEqual(value)
  })

  it('keeps undefined, empty objects, and empty arrays distinguishable', () => {
    expect(formatStructuredValue('json', undefined)).toBe('')
    expect(formatStructuredValue('json', {}, { schema: objectSchema })).toBe('{}')
    expect(formatStructuredValue('json', [], { schema: arraySchema })).toBe('[]')
    expect(() => parseStructuredText('json', '', { schema: objectSchema }))
      .toThrow(expect.objectContaining({ code: 'EMPTY_INPUT' }))
  })

  it('rejects invalid JSON without returning a partial value', () => {
    expect(() => parseStructuredText('json', '{\n  "valid": nope\n}', { schema: objectSchema }))
      .toThrow(expect.objectContaining({ code: 'SYNTAX_ERROR' }))
  })

  it.each([
    ['duplicate YAML keys', 'name: first\nname: second\n', 'DUPLICATE_KEY', {}],
    ['multiple YAML documents', '---\na: 1\n---\nb: 2\n', 'MULTIPLE_DOCUMENTS', {}],
    ['custom YAML tags', 'value: !unsafe content\n', 'CUSTOM_TAG', {}],
    ['aliases beyond the configured bound', 'base: &base\n  x: 1\ncopy: *base\n', 'ALIAS_LIMIT', { maxAliasCount: 0 }],
    ['unsafe object keys', '{"__proto__":{"polluted":true}}', 'UNSAFE_KEY', { format: 'json' }],
    ['excessive input', 'value: this-is-too-large\n', 'INPUT_TOO_LARGE', { maxInputBytes: 8 }],
    ['non-finite numbers', 'value: .inf\n', 'NON_FINITE_NUMBER', {}],
  ])('rejects %s', (_name, text, code, options) => {
    const format = options.format ?? 'yaml'
    expect(() => parseStructuredText(format, text, {
      ...options,
      schema: objectSchema,
    })).toThrow(expect.objectContaining({ code }))
  })

  it('rejects a value whose root does not match the schema', () => {
    expect(() => parseStructuredText('json', '[1, 2]', { schema: objectSchema }))
      .toThrow(expect.objectContaining({ code: 'WRONG_ROOT_TYPE' }))
  })

  it('rejects ambiguous or non-nullable structured schema unions', () => {
    expect(() => parseStructuredText('json', '{}', {
      schema: { type: ['object', 'array'] },
    })).toThrow(expect.objectContaining({ code: 'UNSUPPORTED_SCHEMA_TYPE' }))
    expect(() => parseStructuredText('json', '{}', {
      schema: { type: ['object', 'string'] },
    })).toThrow(expect.objectContaining({ code: 'UNSUPPORTED_SCHEMA_TYPE' }))
  })

  it('reports YAML source locations when parsing fails', () => {
    expect(() => parseStructuredText('yaml', 'value: 1\nvalue: 2\n', { schema: objectSchema }))
      .toThrow(expect.objectContaining({ code: 'DUPLICATE_KEY', column: 1, line: 2 }))
  })

  it('accepts null only when the structured schema is nullable', () => {
    expect(parseStructuredText('yaml', 'null\n', {
      schema: { type: ['object', 'null'] },
    })).toBeNull()
    expect(() => parseStructuredText('yaml', 'null\n', { schema: objectSchema }))
      .toThrow(expect.objectContaining({ code: 'WRONG_ROOT_TYPE' }))
  })

  it('rejects cyclic and non-plain programmatic values', () => {
    const cyclic = {}
    cyclic.self = cyclic
    expect(() => normalizeStructuredValue(cyclic))
      .toThrow(expect.objectContaining({ code: 'CYCLIC_VALUE' }))
    expect(() => normalizeStructuredValue(new Date()))
      .toThrow(expect.objectContaining({ code: 'UNSUPPORTED_VALUE' }))
  })

  it('returns structured errors with stable codes', () => {
    try {
      parseStructuredText('toml', 'value = 1')
    } catch (error) {
      expect(error).toBeInstanceOf(StructuredDataError)
      expect(error).toMatchObject({ code: 'UNSUPPORTED_FORMAT', format: 'toml' })
    }
  })
})
