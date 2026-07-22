import {
  formatStructuredValue,
  normalizeStructuredValue,
  parseStructuredText,
  structuredValuesEqual,
} from './structuredDataCodec'

function draftsFor(value, options) {
  return {
    json: formatStructuredValue('json', value, options),
    yaml: formatStructuredValue('yaml', value, options),
  }
}

function cleanState(state, canonicalValue, phase, options) {
  return {
    ...state,
    canonicalValue,
    dirty: { json: false, yaml: false },
    drafts: draftsFor(canonicalValue, options),
    error: null,
    hasPendingExternalValue: false,
    pendingExternalValue: undefined,
    phase,
  }
}

export function createStructuredDraftState({
  activeFormat = 'json',
  codecOptions = {},
  schema,
  value,
} = {}) {
  const options = { ...codecOptions, allowUndefined: true, schema }
  const canonicalValue = normalizeStructuredValue(value, options)
  return {
    activeFormat,
    canonicalValue,
    dirty: { json: false, yaml: false },
    drafts: draftsFor(canonicalValue, options),
    error: null,
    hasPendingExternalValue: false,
    pendingExternalValue: undefined,
    phase: 'clean',
  }
}

export function structuredDraftReducer(state, action) {
  switch (action.type) {
    case 'SET_ACTIVE_FORMAT':
      return { ...state, activeFormat: action.format }
    case 'EDIT':
      return {
        ...state,
        activeFormat: action.format,
        dirty: { ...state.dirty, [action.format]: true },
        drafts: { ...state.drafts, [action.format]: action.text },
        error: null,
        phase: 'dirty',
      }
    case 'APPLY_FAILURE':
      return { ...state, error: action.error, phase: 'invalid' }
    case 'APPLY_SUCCESS':
      return cleanState(state, action.value, 'applied', action.options)
    case 'RESET':
      return cleanState(state, state.canonicalValue, 'reset', action.options)
    case 'EXTERNAL_CLEAN':
      return cleanState(state, action.value, 'clean', action.options)
    case 'EXTERNAL_CONFLICT':
      return {
        ...state,
        hasPendingExternalValue: true,
        pendingExternalValue: action.value,
        phase: 'external-change',
      }
    case 'RELOAD_EXTERNAL':
      return cleanState(state, action.value, 'reset', action.options)
    case 'KEEP_DRAFT':
      return {
        ...state,
        canonicalValue: action.value,
        hasPendingExternalValue: false,
        pendingExternalValue: undefined,
        phase: state.error ? 'invalid' : 'dirty',
      }
    default:
      return state
  }
}

function optionsFor(schema, codecOptions) {
  return { ...codecOptions, allowUndefined: true, schema }
}

export function editStructuredDraft(state, format, text) {
  return structuredDraftReducer(state, { format, text, type: 'EDIT' })
}

export function applyStructuredDraft(state, {
  codecOptions = {},
  format = state.activeFormat,
  schema,
} = {}) {
  const options = optionsFor(schema, codecOptions)
  try {
    const value = parseStructuredText(format, state.drafts[format], options)
    return structuredDraftReducer(state, { options, type: 'APPLY_SUCCESS', value })
  } catch (error) {
    return structuredDraftReducer(state, { error, type: 'APPLY_FAILURE' })
  }
}

export function resetStructuredDraft(state, { codecOptions = {}, schema } = {}) {
  return structuredDraftReducer(state, {
    options: optionsFor(schema, codecOptions),
    type: 'RESET',
  })
}

export function receiveExternalStructuredValue(state, value, {
  codecOptions = {},
  schema,
} = {}) {
  const options = optionsFor(schema, codecOptions)
  const normalized = normalizeStructuredValue(value, options)
  if (structuredValuesEqual(normalized, state.canonicalValue)) return state

  const hasDraft = state.phase === 'dirty'
    || state.phase === 'invalid'
    || state.phase === 'external-change'
  return structuredDraftReducer(state, {
    options,
    type: hasDraft ? 'EXTERNAL_CONFLICT' : 'EXTERNAL_CLEAN',
    value: normalized,
  })
}

export function reloadExternalStructuredValue(state, {
  codecOptions = {},
  schema,
} = {}) {
  if (!state.hasPendingExternalValue) return state
  return structuredDraftReducer(state, {
    options: optionsFor(schema, codecOptions),
    type: 'RELOAD_EXTERNAL',
    value: state.pendingExternalValue,
  })
}

export function keepStructuredDraft(state) {
  if (!state.hasPendingExternalValue) return state
  return structuredDraftReducer(state, {
    type: 'KEEP_DRAFT',
    value: state.pendingExternalValue,
  })
}
