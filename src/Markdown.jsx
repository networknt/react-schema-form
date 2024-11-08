/**
 * Created by steve on 15/09/15.
 */
import React, { useState, useEffect } from 'react'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'
import MarkdownEditor from '@uiw/react-markdown-editor';

import ComposedComponent from './ComposedComponent'


const Markdown = (props) => {
  const { model, form, value, error, setDefault, onChangeValidate } = props
  const { key, title } = form
  setDefault(key, model, form, value)
  const [selectedTab, setSelectedTab] = useState('write')
  const [text, setText] = useState(value)
  useEffect(() => {
    onChangeValidate({ target: { value: text } })
  }, [text])
  return (
    <React.Fragment>
      <FormLabel required={form.required}>{title}</FormLabel>
      form.readonly ? <MarkdownEditor.Markdown source={markdownVal} /> : <MarkdownEditor value={value} onChange={(value) => setText(value)} />
      {error ? <FormHelperText error>{error}</FormHelperText> : null}
    </React.Fragment>
  )
}

export default ComposedComponent(Markdown)
