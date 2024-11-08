/**
 * Created by steve on 20/09/15.
 */
import React from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import ComposedComponent from './ComposedComponent'

function FormCheckbox(props) {
  const {
    model,
    form,
    value,
    setDefault,
    localization: { getLocalizedString },
    onChangeValidate
  } = props
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

export default ComposedComponent(FormCheckbox)
