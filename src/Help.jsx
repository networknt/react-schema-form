import React from 'react'
import Typography from '@mui/material/Typography'

const Help = (props) => {
  const {
    form: {
      description,
      variant,
      align,
      color,
      noWrap,
      paragraph,
      otherProps
    },
    localization: { getLocalizedString }
  } = props

  return (
    <Typography
      variant={variant}
      align={align}
      color={color}
      noWrap={noWrap}
      component={paragraph ? 'p' : 'div'}
      gutterBottom={!!paragraph}
      {...otherProps}
    >
      {getLocalizedString(description)}
    </Typography>
  )
}

export default Help
