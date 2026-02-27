import React, { useEffect } from 'react'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import useSchemaField from './useSchemaField'

const Timestamp = (props) => {
  const {
    model,
    form,
    setDefault,
    localization: { getLocalizedString }
  } = props
  const { value, valid, error, onChangeValidate } = useSchemaField(props)

  useEffect(() => {
    setDefault(form.key, model, form, value)
  }, [])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label={form.title && getLocalizedString(form.title)}
        value={value ? dayjs(value) : null}
        onChange={(newValue) => {
          const isoValue = newValue ? newValue.toISOString() : ''
          onChangeValidate(null, isoValue)
        }}
        disabled={form.readonly}
        slotProps={{
          textField: {
            helperText: (error || form.description) && getLocalizedString(error || form.description),
            error: !valid,
            placeholder: form.placeholder && getLocalizedString(form.placeholder),
            fullWidth: true,
            required: form.required,
            style: form.style,
            ...form.otherProps,
          }
        }}
        {...form.otherProps}
      />
    </LocalizationProvider>
  )
}

export default Timestamp