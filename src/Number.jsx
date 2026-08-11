import React from 'react'
import Text from './Text'
import useSchemaField from './useSchemaField'
import utils from './utils'

const INTEGER_PATTERN = /^-?\d+$/
const NUMBER_PATTERN = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/

/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */
const NumberComponent = (props) => {
  const {
    form,
    localization: { getLocalizedNumber }
  } = props
  const { value, valid, error, onChangeValidate } = useSchemaField(props)

  let inputValue = Object.is(value, -0)
    ? '-0'
    : value || value === 0 ? value : ''
  if (form.useLocalizer) inputValue = getLocalizedNumber(inputValue)

  const onChange = (e) => {
    const schemaType = form.schema ? form.schema.type : form.type
    const type = utils.stripNullType(schemaType)
    const input = e.target.value
    const trimmedInput = input.trim()
    let enteredValue = null
    if (trimmedInput === '') {
      enteredValue = null
    } else if (type === 'integer') {
      const parsed = Number(trimmedInput)
      enteredValue = INTEGER_PATTERN.test(trimmedInput) && Number.isSafeInteger(parsed)
        ? parsed
        : input
    } else if (type === 'number') {
      const parsed = Number(trimmedInput)
      const unsafeInteger = INTEGER_PATTERN.test(trimmedInput) && !Number.isSafeInteger(parsed)
      enteredValue = NUMBER_PATTERN.test(trimmedInput) && Number.isFinite(parsed)
        && !trimmedInput.endsWith('.') && !unsafeInteger
        ? parsed
        : input
    }
    onChangeValidate(null, enteredValue)
  }

  return (
    <Text
      {...props}
      form={{ ...form, type: 'string' }}
      value={inputValue}
      valid={valid}
      error={error}
      onChangeValidate={onChange}
    />
  )
}

export default NumberComponent
