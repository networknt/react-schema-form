import React, { Component } from 'react';
import { styled } from '@mui/system';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import ComposedComponent from './ComposedComponent';

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

class Radios extends Component {
  renderItems = (form) => {
    const {
      localization: { getLocalizedString },
    } = this.props;
    return form.titleMap.map((item, index) => (
      <FormControlLabel
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        control={<Radio />}
        label={item.name && getLocalizedString(item.name)}
        value={item.value}
        disabled={form.readonly}
      />
    ));
  };

  render() {
    const {
      form,
      value,
      onChangeValidate,
      localization: { getLocalizedString },
    } = this.props;
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
          {this.renderItems(form)}
        </RadioGroup>
      </StyledFormControl>
    );
  }
}

export default ComposedComponent(Radios);
