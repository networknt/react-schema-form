import React from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import useSchemaField from './useSchemaField'

function FormCheckbox(props) {
  const {
    model,
    form,
    setDefault,
    localization: { getLocalizedString }
  } = props
  const { value, onChangeValidate } = useSchemaField(props)
  const { key } = form
  setDefault(key, model, form, value)
  return (
    <FormGroup row>
      <FormControlLabel
        className={form.className}
        label={form.title && getLocalizedString(form.title)}
        control={
          <Checkbox
            name={form.key.slice(-1)[0]}
            value={form.key.slice(-1)[0]}
            checked={value || false}
            disabled={form.readonly}
            onChange={onChangeValidate}
          />
        }
        {...form.otherProps}
      />
    </FormGroup>
  )
}

export default FormCheckbox
