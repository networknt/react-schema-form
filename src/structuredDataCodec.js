import {
  isAlias,
  isMap,
  isPair,
  isScalar,
  isSeq,
  parseDocument,
  stringify,
} from 'yaml'

export const DEFAULT_STRUCTURED_DATA_LIMITS = Object.freeze({
  maxAliasCount: 20,
  maxDepth: 100,
  maxInputBytes: 1024 * 1024,
  maxNodes: 10000,
})

const formats = new Set(['json', 'yaml'])
const unsafeKeys = new Set(['__proto__', 'constructor', 'prototype'])
const coreYamlTags = new Set([
  'tag:yaml.org,2002:bool',
  'tag:yaml.org,2002:float',
  'tag:yaml.org,2002:int',
  'tag:yaml.org,2002:map',
  'tag:yaml.org,2002:null',
  'tag:yaml.org,2002:seq',
  'tag:yaml.org,2002:str',
])

export class StructuredDataError extends Error {
  constructor(code, message, details = {}) {
    super(message, details.cause ? { cause: details.cause } : undefined)
    this.name = 'StructuredDataError'
    this.code = code
    Object.assign(this, details)
  }
}

function getLimits(options) {
  return {
    ...DEFAULT_STRUCTURED_DATA_LIMITS,
    ...options,
  }
}

function assertFormat(format) {
  if (!formats.has(format)) {
    throw new StructuredDataError(
      'UNSUPPORTED_FORMAT',
      `Unsupported structured-data format: ${format}`,
      { format },
    )
  }
}

function assertInputSize(text, format, maxInputBytes) {
  const bytes = new TextEncoder().encode(text).byteLength
  if (bytes > maxInputBytes) {
    throw new StructuredDataError(
      'INPUT_TOO_LARGE',
      `Input is ${bytes} bytes; the limit is ${maxInputBytes} bytes`,
      { bytes, format, maxInputBytes },
    )
  }
}

function yamlErrorCode(error) {
  if (error.code === 'DUPLICATE_KEY') return 'DUPLICATE_KEY'
  if (error.code === 'MULTIPLE_DOCS') return 'MULTIPLE_DOCUMENTS'
  return 'SYNTAX_ERROR'
}

function assertSafeYamlTags(node) {
  if (!node) return

  if (node.tag && !coreYamlTags.has(node.tag)) {
    throw new StructuredDataError(
      'CUSTOM_TAG',
      `YAML tag ${node.tag} is not allowed`,
      { format: 'yaml', tag: node.tag },
    )
  }

  if (isPair(node)) {
    assertSafeYamlTags(node.key)
    assertSafeYamlTags(node.value)
  } else if (isMap(node) || isSeq(node)) {
    node.items.forEach(assertSafeYamlTags)
  } else if (!isAlias(node) && !isScalar(node)) {
    throw new StructuredDataError(
      'UNSUPPORTED_YAML_NODE',
      'YAML contains an unsupported node type',
      { format: 'yaml' },
    )
  }
}

function parseYaml(text, options) {
  const document = parseDocument(text, {
    customTags: [],
    merge: false,
    prettyErrors: true,
    resolveKnownTags: false,
    schema: 'core',
    strict: true,
    stringKeys: true,
    uniqueKeys: true,
    version: '1.2',
  })

  if (document.errors.length > 0) {
    const error = document.errors[0]
    const start = error.linePos?.[0]
    throw new StructuredDataError(yamlErrorCode(error), error.message, {
      cause: error,
      column: start?.col,
      format: 'yaml',
      line: start?.line,
      position: error.pos,
    })
  }

  assertSafeYamlTags(document.contents)

  try {
    return document.toJS({ maxAliasCount: options.maxAliasCount })
  } catch (error) {
    const aliasError = error instanceof ReferenceError && /alias/i.test(error.message)
    throw new StructuredDataError(
      aliasError ? 'ALIAS_LIMIT' : 'SYNTAX_ERROR',
      error.message,
      { cause: error, format: 'yaml' },
    )
  }
}

function normalize(value, options, path, depth, ancestors, count) {
  if (depth > options.maxDepth) {
    throw new StructuredDataError(
      'MAX_DEPTH_EXCEEDED',
      `Value exceeds the maximum depth of ${options.maxDepth}`,
      { path },
    )
  }

  count.value += 1
  if (count.value > options.maxNodes) {
    throw new StructuredDataError(
      'MAX_NODES_EXCEEDED',
      `Value exceeds the maximum node count of ${options.maxNodes}`,
      { path },
    )
  }

  if (value === null || typeof value === 'string' || typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'number') {
    if (!Number.isFinite(value)) {
      throw new StructuredDataError(
        'NON_FINITE_NUMBER',
        'Structured data cannot contain non-finite numbers',
        { path },
      )
    }
    return value
  }

  if (typeof value !== 'object') {
    throw new StructuredDataError(
      'UNSUPPORTED_VALUE',
      `Structured data cannot contain ${typeof value} values`,
      { path },
    )
  }

  if (ancestors.has(value)) {
    throw new StructuredDataError(
      'CYCLIC_VALUE',
      'Structured data cannot contain cycles',
      { path },
    )
  }

  ancestors.add(value)
  try {
    if (Array.isArray(value)) {
      return value.map((item, index) => normalize(
        item,
        options,
        `${path}[${index}]`,
        depth + 1,
        ancestors,
        count,
      ))
    }

    const prototype = Object.getPrototypeOf(value)
    if (prototype !== Object.prototype && prototype !== null) {
      throw new StructuredDataError(
        'UNSUPPORTED_VALUE',
        'Structured data can only contain plain objects and arrays',
        { path },
      )
    }

    return Object.keys(value).reduce((result, key) => {
      if (unsafeKeys.has(key)) {
        throw new StructuredDataError(
          'UNSAFE_KEY',
          `Object key ${key} is not allowed`,
          { key, path },
        )
      }
      result[key] = normalize(
        value[key],
        options,
        `${path}.${key}`,
        depth + 1,
        ancestors,
        count,
      )
      return result
    }, {})
  } finally {
    ancestors.delete(value)
  }
}

export function normalizeStructuredValue(value, options = {}) {
  if (value === undefined && options.allowUndefined) return undefined
  return normalize(
    value,
    getLimits(options),
    '$',
    0,
    new WeakSet(),
    { value: 0 },
  )
}

function schemaRootTypes(schema) {
  if (!schema?.type) return ['object', 'array']
  return Array.isArray(schema.type) ? schema.type : [schema.type]
}

export function assertStructuredRoot(value, schema) {
  const types = schemaRootTypes(schema)
  const structuredTypes = types.filter((type) => type === 'object' || type === 'array')
  const supportsNull = types.includes('null')
  const unsupportedTypes = types.filter((type) => !structuredTypes.includes(type) && type !== 'null')

  if (structuredTypes.length === 0
    || (schema?.type && (structuredTypes.length !== 1 || unsupportedTypes.length > 0))) {
    throw new StructuredDataError(
      'UNSUPPORTED_SCHEMA_TYPE',
      'Structured-data fields require an object or array schema',
      { schemaTypes: types },
    )
  }

  if (value === null && supportsNull) return value
  const valueType = value === null
    ? 'null'
    : Array.isArray(value)
      ? 'array'
      : typeof value === 'object'
        ? 'object'
        : typeof value
  if (!structuredTypes.includes(valueType)) {
    throw new StructuredDataError(
      'WRONG_ROOT_TYPE',
      `Expected ${structuredTypes.join(' or ')}, received ${valueType}`,
      { actualType: valueType, expectedTypes: structuredTypes },
    )
  }
  return value
}

export function parseStructuredText(format, text, options = {}) {
  assertFormat(format)
  if (typeof text !== 'string') {
    throw new StructuredDataError('INVALID_INPUT', 'Structured-data input must be text', { format })
  }

  const limits = getLimits(options)
  assertInputSize(text, format, limits.maxInputBytes)
  if (text.trim() === '') {
    throw new StructuredDataError('EMPTY_INPUT', 'Structured-data input is empty', { format })
  }

  let parsed
  if (format === 'json') {
    try {
      parsed = JSON.parse(text)
    } catch (error) {
      const positionMatch = /position (\d+)/.exec(error.message)
      const position = positionMatch ? Number(positionMatch[1]) : undefined
      const beforeError = position === undefined ? undefined : text.slice(0, position)
      throw new StructuredDataError('SYNTAX_ERROR', error.message, {
        cause: error,
        column: beforeError === undefined
          ? undefined
          : beforeError.length - beforeError.lastIndexOf('\n'),
        format,
        line: beforeError === undefined
          ? undefined
          : beforeError.split('\n').length,
        position,
      })
    }
  } else {
    parsed = parseYaml(text, limits)
  }

  const normalized = normalizeStructuredValue(parsed, limits)
  return assertStructuredRoot(normalized, options.schema)
}

export function formatStructuredValue(format, value, options = {}) {
  assertFormat(format)
  if (value === undefined) return ''

  const normalized = normalizeStructuredValue(value, options)
  assertStructuredRoot(normalized, options.schema)
  if (format === 'json') {
    const indent = Math.min(10, Math.max(0, options.indent ?? 2))
    return JSON.stringify(normalized, null, indent)
  }
  const indent = Math.min(10, Math.max(1, options.indent ?? 2))
  return stringify(normalized, {
    aliasDuplicateObjects: false,
    indent,
    lineWidth: 0,
  })
}

export function structuredValuesEqual(left, right) {
  if (Object.is(left, right)) return true
  if (Array.isArray(left) || Array.isArray(right)) {
    return Array.isArray(left)
      && Array.isArray(right)
      && left.length === right.length
      && left.every((value, index) => structuredValuesEqual(value, right[index]))
  }
  if (left === null || right === null || typeof left !== 'object' || typeof right !== 'object') {
    return false
  }

  const leftKeys = Object.keys(left)
  const rightKeys = Object.keys(right)
  return leftKeys.length === rightKeys.length
    && leftKeys.every((key) => Object.prototype.hasOwnProperty.call(right, key)
      && structuredValuesEqual(left[key], right[key]))
}
