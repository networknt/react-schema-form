// @flow
/**
 * Created by steve on 15/09/15.
 */
import React from 'react'
import ComposedComponent from './ComposedComponent'
import Text from './Text'


/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */
const NumberComponent = (props) => {
  const {
    form,
    value,
    localization: { getLocalizedNumber },
    onChangeValidate
  } = props
  let inputValue = value || value === 0 ? value : ''
  if (form.useLocalizer) inputValue = getLocalizedNumber(inputValue)

  const onChange = (e) => {
    const type = form.schema ? form.schema.type : form.type
    let enteredValue = null
    if (type === 'integer') {
      enteredValue = parseInt(e.target.value, 10)
    } else if (type === 'number') {
      const values = e.target.value.split('.')
      if (values.length < 2) {
        enteredValue = parseInt(e.target.value, 10)
      } else if (values.length > 1) {
        if (values[1].length > 0) enteredValue = parseFloat(e.target.value)
        else enteredValue = `${parseInt(values[0], 10)}.`
      }
    }
    onChangeValidate(enteredValue)
  }

  return (
    <Text
      {...props}
      form={{ ...form, type: 'string' }}
      value={inputValue}
      otherProps={{ onChange }}
    />
  )
}

export default ComposedComponent(NumberComponent)
