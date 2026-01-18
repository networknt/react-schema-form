import React from 'react'
import TextField from '@mui/material/TextField'
import useSchemaField from './useSchemaField'

function Text(props) {
  const {
    form,
    setDefault,
    model,
    localization: { getLocalizedString },
    otherProps
  } = props
  const fieldProps = useSchemaField(props)
  const value = props.value !== undefined ? props.value : fieldProps.value
  const valid = props.valid !== undefined ? props.valid : fieldProps.valid
  const error = props.error !== undefined ? props.error : fieldProps.error
  const onChangeValidate = props.onChangeValidate !== undefined ? props.onChangeValidate : fieldProps.onChangeValidate

  const { key } = form
  setDefault(key, model, form, fieldProps.value)

  return (
    <TextField
      type={form.type}
      label={form.title && getLocalizedString(form.title)}
      placeholder={form.placeholder && getLocalizedString(form.placeholder)}
      helperText={
        (error || form.description) &&
        getLocalizedString(error || form.description)
      }
      error={!valid}
      onChange={onChangeValidate}
      value={value || ''}
      disabled={form.readonly}
      fullWidth
      required={form.required}
      style={form.style}
      {...otherProps}
      {...form.otherProps}
    />
  )
}

Text.defaultProps = {
  otherProps: undefined
}

export default Text
