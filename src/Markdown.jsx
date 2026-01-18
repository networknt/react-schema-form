import React, { useEffect } from 'react'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'
import MarkdownEditor from '@uiw/react-markdown-editor';
import useSchemaField from './useSchemaField'

const Markdown = (props) => {
  const {
    model,
    form,
    setDefault,
    localization: { getLocalizedString }
  } = props
  const { value, valid, error, onChangeValidate } = useSchemaField(props)
  const { key, title } = form

  useEffect(() => {
    setDefault(key, model, form, value)
  }, [])

  return (
    <React.Fragment>
      <FormLabel required={form.required}>
        {title && getLocalizedString(title)}
      </FormLabel>
      <MarkdownEditor
        value={value || ''}
        height={form.height}
        onChange={(v) => onChangeValidate(null, v)}
      />
      {!valid ? <FormHelperText error>{error}</FormHelperText> : null}
    </React.Fragment>
  )
}

export default Markdown
