import React from 'react'
import Text from './Text'

const TextArea = (props) => {
  const { form } = props
  return (
    <Text
      {...props}
      otherProps={{
        multiline: true,
        rows: form.rows,
        maxRows: form.maxRows
      }}
    />
  )
}

export default TextArea
