import { expect, test } from 'vitest'
import utils from './utils'

test('validate right schema and right value', () => {
  const form = {
    "key": [
        "email"
    ],
    "title": "Email",
    "description": "Email will be used for evil.",
    "required": true,
    "schema": {
        "title": "Email",
        "type": "string",
        "pattern": "^\\S+@\\S+$",
        "description": "Email will be used for evil."
    },
    "type": "text"
  }
  const data = 'stevehu'
  const valid = utils.validate(form, data)
  console.log("valid", valid);
  console.log("error", valid.errors);
      
}
)

