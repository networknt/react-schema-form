import React from 'react'
import Text from './Text'
import useSchemaField from './useSchemaField'

const NativeDateField = (props) => {
  const {
    localization: { getLocalizedDate },
    form,
    type
  } = props
  const { value, valid, error, onChangeValidate } = useSchemaField(props)

  return (
    <Text
      {...props}
      form={{ ...form, type }}
      value={getLocalizedDate(value)}
      valid={valid}
      error={error}
      onChangeValidate={onChangeValidate}
      otherProps={{ InputLabelProps: { shrink: true } }}
      {...form.otherProps}
    />
  )
}

export default NativeDateField
