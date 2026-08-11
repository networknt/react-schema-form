import { expect, test } from 'vitest'
import utils from './utils'

test('rejects a value that violates the conditional schema', () => {
  const schema = {
    "title": "Create Product Version Form",
    "type": "object",
    "properties": {
      "hostId": {
        "title": "Host Id",
        "type": "string",
        "readonly": true
      },
      "productId": {
        "title": "Product Id",
        "type": "string"
      },
      "productVersion": {
        "type": "string",
        "title": "Product Version"
      },
      "light4jVersion": {
        "type": "string",
        "title": "Light-4j Version"
      },
      "breakCode": {
        "type": "boolean",
        "title": "Break Code"
      },
      "breakConfig": {
        "type": "boolean",
        "title": "Break Config"
      },
      "releaseNote": {
        "type": "string",
        "title": "Release Note"
      },
      "versionDesc": {
        "type": "string",
        "title": "Version Desc"
      },
      "releaseType": {
        "type": "string",
        "title": "Release Type"
      },
      "current": {
        "type": "boolean",
        "title": "Current"
      },
      "versionStatus": {
        "type": "string",
        "title": "Version Status"
      }
    },
    "required": [
      "hostId",
      "productId",
      "productVersion",
      "light4jVersion",
      "versionStatus",
      "releaseType"
    ],
    "if": {
      "properties": {
        "current": { "const": true }
      },
      "required": ["current"]
    },
    "then": {
      "properties": {
        "releaseType": { "const": "Production Release" }
      }
    }
  }
  const data = {
    "hostId": "N2CMw0HGQXeLvC1wBfln2A",
    "productId": "lps",
    "light4jVersion": "2.2.0",
    "releaseType": "Alpha Version",
    "versionStatus": "Supported",
    "current": true,
    "productVersion": "2.10.0"
  }  
  const valid = utils.validateBySchema(schema, data)
  expect(valid.valid).toBe(false)
  expect(valid.error).toContain('releaseType')
}
)

test('retains zero-valued numeric bounds in generated forms', () => {
  const result = utils.getDefaults({
    type: 'object',
    properties: {
      rate: {
        title: 'Rate',
        type: 'integer',
        minimum: 0,
        maximum: 0
      }
    }
  })

  expect(result.form[0]).toMatchObject({ minimum: 0, maximum: 0 })
})

test('caches field validators by complete schema instead of repeated leaf key', () => {
  const stringResult = utils.validate({
    key: ['a', 'timeout'],
    type: 'text',
    schema: { type: 'string' }
  }, 'slow')
  const integerResult = utils.validate({
    key: ['b', 'timeout'],
    type: 'number',
    schema: { type: 'integer', minimum: 100 }
  }, 5)

  expect(stringResult).toEqual({ valid: true })
  expect(integerResult.valid).toBe(false)
  expect(integerResult.error).toContain('>= 100')
  expect(integerResult.error).not.toContain('must be string')
})
