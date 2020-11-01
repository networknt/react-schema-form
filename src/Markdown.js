/**
 * Created by steve on 15/09/15.
 */
import React, { useState, useEffect } from 'react'
import FormLabel from '@material-ui/core/FormLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

import ComposedComponent from './ComposedComponent'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
})

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
      <ReactMde
        value={value}
        onChange={setText}
        readOnly={form.readonly}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
      {error ? <FormHelperText error>{error}</FormHelperText> : null}
    </React.Fragment>
  )
}

export default ComposedComponent(Markdown)
