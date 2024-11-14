import React from 'react';
import { styled } from '@mui/system';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import classNames from 'classnames';

const PREFIX = 'FieldSet';

const classes = {
  root: `${PREFIX}-root`,
  fields: `${PREFIX}-fields`,
};

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  [`&.${classes.root}`]: {
    marginTop: theme.spacing(1),
  },
  [`& .${classes.fields}`]: {
    marginLeft: theme.spacing(1),
  },
}));

const FieldSet = ({
  form,
  mapper,
  builder,
  model,
  onChange,
  classes,
  localization: { getLocalizedString },
}) => {
  const forms = form.items.map((f, index) =>
    builder(f, model, index, mapper, onChange, builder)
  );
  const className = classNames(classes.root, form.htmlClass);

  return (
    <StyledFormControl component="fieldset" className={className} style={form.style} {...form.otherProps}>
      <FormLabel component='legend' required={form.required}>
        {form.title && getLocalizedString(form.title)}
      </FormLabel>
      <div className={classes.fields}>{forms}</div>
    </StyledFormControl>

  )
}

export default FieldSet
