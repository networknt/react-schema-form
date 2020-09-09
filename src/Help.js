// @flow
/**
 * Created by steve on 20/09/15.
 */
import React from 'react'
import Typography from '@material-ui/core/Typography'

type Props = {
  form: any
}

const Help = ({
  form: { description, variant, align, color, noWrap, paragraph, otherProps }
}: Props) => (
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
