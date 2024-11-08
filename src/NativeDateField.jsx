import React from 'react'
import Text from './Text'

const NativeDateField = (props) => {
  const {
    value,
    localization: { getLocalizedDate },
    form,
    type
  } = props
  return (
    <Text
      {...props}
      form={{ ...form, type }}
      value={getLocalizedDate(value)}
      otherProps={{ InputLabelProps: { shrink: true } }}
      {...form.otherProps}
    />
  )
}

export default NativeDateField
