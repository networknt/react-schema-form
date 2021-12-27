// @flow
/**
 * Created by steve on 11/09/15.
 */
import React from 'react'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import withStyles from '@mui/styles/withStyles';
import classNames from 'classnames'
import type { Localization } from './types'

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(1)
  },
  fields: {
    marginLeft: theme.spacing(1)
  }
})

type Props = {
  form: any,
  mapper: any,
  builder: any,
  model: any,
  onChange: any,
  classes: any,
  localization: Localization
}

const FieldSet = ({
  form,
  mapper,
  builder,
  model,
  onChange,
  classes,
  localization: { getLocalizedString }
}: Props) => {
  const forms = form.items.map((f, index) =>
    builder(f, model, index, mapper, onChange, builder)
  )
  const className = classNames(classes.root, form.htmlClass)

  return (
    <FormControl
      component='fieldset'
      className={className}
      style={form.style}
      {...form.otherProps}
    >
      <FormLabel component='legend' required={form.required}>
        {form.title && getLocalizedString(form.title)}
      </FormLabel>
      <div className={classes.fields}>{forms}</div>
    </FormControl>
  )
}

export default withStyles(styles)(FieldSet)
