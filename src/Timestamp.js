// @flow
/**
 * Created by steve on 15/09/15.
 */
import React from 'react'
import TextField from '@mui/material/TextField'
import ComposedComponent from './ComposedComponent'
import type { Localization } from './types'

type Props = {
  form: any,
  model: any,
  value: any,
  setDefault: any,
  error: any,
  onChangeValidate: any,
  localization: Localization
}

class Timestamp extends React.Component<Props> {
  constructor(props) {
    super(props)
    const { model, form, value, setDefault } = this.props
    const { key } = form
    const d = new Date()
    const currentTimestamp = d.toISOString().substring(0, 16)
    setDefault(key, model, form, value || currentTimestamp)
  }

  render() {
    const {
      form,
      error,
      value,
      onChangeValidate,
      localization: { getLocalizedString }
    } = this.props
    return (
      <TextField
        type='datetime-local'
        label={form.title && getLocalizedString(form.title)}
        placeholder={form.placeholder && getLocalizedString(form.placeholder)}
        helperText={
          (error || form.description) &&
          getLocalizedString(error || form.description)
        }
        error={!!error}
        onChange={onChangeValidate}
        value={value || ''}
        disabled={form.readonly}
        fullWidth
        required={form.required}
        style={form.style}
        {...form.otherProps}
      />
    )
  }
}

export default ComposedComponent(Timestamp)
