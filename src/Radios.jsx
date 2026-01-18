import React from 'react';
import { styled } from '@mui/system';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import useSchemaField from './useSchemaField';

const PREFIX = 'Radios';

const classes = {
  formControl: `${PREFIX}-formControl`,
  group: `${PREFIX}-group`,
};

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  [`&.${classes.formControl}`]: {
    marginTop: theme.spacing(1),
  },
  [`& .${classes.group}`]: {
    margin: theme.spacing(1, 0),
  },
}));

const Radios = (props) => {
  const {
    form,
    localization: { getLocalizedString },
  } = props;
  const { value, onChangeValidate } = useSchemaField(props);

  const renderItems = (currentForm) => currentForm.titleMap.map((item, index) => (
    <FormControlLabel
      // eslint-disable-next-line react/no-array-index-key
      key={index}
      control={<Radio />}
      label={item.name && getLocalizedString(item.name)}
      value={item.value}
      disabled={currentForm.readonly}
    />
  ));

  return (
    <StyledFormControl
      component="fieldset"
      className={classes.formControl}
      {...form.otherProps}
    >
      <FormLabel component="legend" required={form.required}>
        {form.title && getLocalizedString(form.title)}
      </FormLabel>
      <RadioGroup
        value={value}
        name={form.title}
        onChange={onChangeValidate}
        className={classes.group}
      >
        {renderItems(form)}
      </RadioGroup>
    </StyledFormControl>
  );
};

export default Radios;
