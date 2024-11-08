// @flow
/**
 * Created by steve on 15/09/15.
 */
import React from 'react'
import ComposedComponent from './ComposedComponent'
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

export default ComposedComponent(TextArea)
