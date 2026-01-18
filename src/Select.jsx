import React, { useEffect } from 'react'
import MenuItem from '@mui/material/MenuItem'
import MuiSelect from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import useSchemaField from './useSchemaField'

function Select(props) {
  const {
    model,
    form,
    setDefault,
    localization: { getLocalizedString },
    form: {
      key,
      schema: { isObject, enum: values, findFn, displayFn, noLocalization }
    }
  } = props
  const { value, valid, error, onChangeValidate } = useSchemaField(props)

  useEffect(() => {
    setDefault(key, model, form, value)
  }, [])

  const onSelected = (event) => {
    if (isObject) {
      const selectedValue = event.target.value
      const item = values.find((each) =>
        findFn ? findFn(each, selectedValue) : each === selectedValue
      )
      // We need to bypass the hook's onChangeValidate because it expects an event or raw value
      // and we want to pass the whole object.
      // Actually, if we pass the object to onChangeValidate, it might work if the type is 'object'
      onChangeValidate(item)
    } else {
      onChangeValidate(event)
    }
  }

  const getLabel = (each) => {
    if (displayFn) {
      return displayFn(each)
    }
    if (noLocalization) return each.name
    return getLocalizedString(each.name)
  }

  let menuItems = []
  if (isObject) {
    menuItems = form.schema.enum.map((item, idx) => (
      // eslint-disable-next-line react/no-array-index-key
      <MenuItem key={idx} value={item}>
        {getLabel(item)}
      </MenuItem>
    ))
  } else {
    menuItems = form.titleMap.map((item, idx) => (
      // eslint-disable-next-line react/no-array-index-key
      <MenuItem key={idx} value={item.value}>
        {getLabel(item)}
      </MenuItem>
    ))
  }

  return (
    <FormControl fullWidth error={!valid} {...form.otherProps}>
      <InputLabel required={form.required} {...form.labelProps}>
        {form.title && getLocalizedString(form.title)}
      </InputLabel>
      <MuiSelect
        value={value || (form && form.selectProps && form.selectProps.multiple ? [] : '')}
        placeholder={form.placeholder && getLocalizedString(form.placeholder)}
        disabled={form.readonly}
        onChange={onSelected}
        {...form.selectProps}
      >
        {menuItems}
      </MuiSelect>
      <FormHelperText {...form.helperTextProps}>
        {(error || form.description) &&
          getLocalizedString(error || form.description)}
      </FormHelperText>
    </FormControl>
  )
}

export default Select
