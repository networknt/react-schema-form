import React from 'react';
import { styled } from '@mui/system';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import classNames from 'classnames';

const PREFIX = 'FieldSet';

const fieldSetClasses = {
  root: `${PREFIX}-root`,
  fields: `${PREFIX}-fields`,
};

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  [`&.${fieldSetClasses.root}`]: {
    marginTop: theme.spacing(1),
  },
  [`& .${fieldSetClasses.fields}`]: {
    marginLeft: theme.spacing(1),
  },
}));

const FieldSet = ({
  form,
  mapper,
  builder,
  model,
  onChange,
  localization: { getLocalizedString },
}) => {
  const forms = form.items.map((f, index) =>
    builder(f, model, index, mapper, onChange, builder)
  );
  const className = classNames(fieldSetClasses.root, form.htmlClass);

  return (
    <StyledFormControl component="fieldset" className={className} style={form.style} {...form.otherProps}>
      <FormLabel component='legend' required={form.required}>
        {form.title && getLocalizedString(form.title)}
      </FormLabel>
      <div className={fieldSetClasses.fields}>{forms}</div>
    </StyledFormControl>

  )
}

export default FieldSet
