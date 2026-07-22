import React from 'react'
import Box from '@mui/material/Box'

function prepareGeneratedForm(form) {
  const prepared = {
    ...form,
    type: form.type === 'checkboxes' ? 'multiselect' : form.type,
  }
  if (prepared.type === 'array') prepared.startEmpty = true
  if (Array.isArray(form.items)) {
    prepared.items = form.items.map(prepareGeneratedForm)
  }
  return prepared
}

function build(form, index, props) {
  const { builder, mapper, model, onChange } = props
  return builder(form, model, index, mapper, onChange, builder)
}

function StructuredFormView(props) {
  const { form } = props
  const schema = form.schema

  if (schema.items?.enum) {
    return build(prepareGeneratedForm({
      ...form,
      tabs: undefined,
      type: 'multiselect',
    }), 0, props)
  }

  if (schema.type === 'array' || schema.type?.includes?.('array')) {
    if (Array.isArray(schema.items)) {
      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {form.items.map((item, index) => build(prepareGeneratedForm(item), index, props))}
        </Box>
      )
    }
    return build(prepareGeneratedForm({
      ...form,
      startEmpty: true,
      tabs: undefined,
      type: 'array',
    }), 0, props)
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {form.items.map((item, index) => build(prepareGeneratedForm(item), index, props))}
    </Box>
  )
}

export default StructuredFormView
