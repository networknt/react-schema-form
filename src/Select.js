import React, { useState, useEffect } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import MuiSelect from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import ComposedComponent from './ComposedComponent'
import utils from './utils'

function Select(props) {
  const {
    model,
    form,
    error,
    setDefault,
    onChange,
    onChangeValidate,
    localization: { getLocalizedString },
    form: {
      key,
      schema: { isObject, enum: values, findFn, displayFn, noLocalization }
    }
  } = props

  let defaultValue =
    form && form.selectProps && form.selectProps.multiple ? [] : ''
  if (props.form.default) {
    defaultValue = props.form.default
  } else if (props.form.schema && props.form.schema.default) {
    defaultValue = props.form.schema.default
  }
  const [currentValue, setCurrentValue] = useState(
    utils.getValueFromModel(model, form.key) || defaultValue
  )

  useEffect(() => {
    setDefault(key, model, form, currentValue)
  }, [])

  const onSelected = (event) => {
    const selectedValue = event.target.value
    setCurrentValue(selectedValue)
    if (isObject) {
      const item = values.find((each) =>
        findFn ? findFn(each, selectedValue) : each === selectedValue
      )
      onChange(key, item)
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
    <FormControl fullWidth error={!!error} {...form.otherProps}>
      <InputLabel required={form.required} {...form.labelProps}>
        {form.title && getLocalizedString(form.title)}
      </InputLabel>
      <MuiSelect
        value={currentValue}
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

export default ComposedComponent(Select)
