import { expect, test } from 'vitest'
import utils from './utils'

test('validate right schema and right value', () => {
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
  console.log("valid", valid);
  console.log("error", valid.error);
      
}
)

