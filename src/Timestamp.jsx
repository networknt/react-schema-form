import React, { useEffect } from 'react'
import Text from './Text'
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

  // Format value for datetime-local input: YYYY-MM-DDTHH:mm
  const formatForInput = (val) => {
    if (!val) return ''
    try {
      const d = new Date(val)
      if (isNaN(d.getTime())) return val || ''
      // toISOString returns YYYY-MM-DDTHH:mm:ss.sssZ
      // datetime-local expects YYYY-MM-DDTHH:mm
      return d.toISOString().slice(0, 16)
    } catch (e) {
      return val || ''
    }
  }

  const handleChange = (e) => {
    const val = e.target.value
    // If we want to store as ISO string in model
    if (val) {
      try {
        const iso = new Date(val).toISOString()
        onChangeValidate(null, iso)
      } catch (err) {
        onChangeValidate(e)
      }
    } else {
      onChangeValidate(e)
    }
  }

  return (
    <Text
      {...props}
      value={formatForInput(value)}
      valid={valid}
      error={error}
      onChangeValidate={handleChange}
      form={{
        ...form,
        title: form.title && getLocalizedString(form.title),
        placeholder: form.placeholder && getLocalizedString(form.placeholder),
        description: form.description && getLocalizedString(form.description),
        type: 'datetime-local'
      }}
      otherProps={{
        InputLabelProps: { shrink: true },
        ...form.otherProps
      }}
    />
  )
}

export default Timestamp