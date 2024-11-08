import React from 'react'
import Typography from '@mui/material/Typography'


const Help = ({
  form: { description, variant, align, color, noWrap, paragraph, otherProps }
}) => (
  <Typography
    variant={variant}
    align={align}
    color={color}
    noWrap={noWrap}
    paragraph={paragraph}
    {...otherProps}
  >
    {description}
  </Typography>
)

export default Help
