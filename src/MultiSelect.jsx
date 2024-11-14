import React, { Component } from 'react';
import { styled } from '@mui/system';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import ComposedComponent from './ComposedComponent';
import utils from './utils';

const PREFIX = 'MultiSelect';

const classes = {
  root: `${PREFIX}-root`,
  chips: `${PREFIX}-chips`,
  chip: `${PREFIX}-chip`,
  menuItem: `${PREFIX}-menuItem`,
  selectedMenuItem: `${PREFIX}-selectedMenuItem`,
};

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  [`& .${classes.chips}`]: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  [`& .${classes.chip}`]: {
    margin: theme.spacing(0.25),
  },
  [`& .${classes.menuItem}`]: {
    fontWeight: theme.typography.fontWeightRegular,
  },
  [`& .${classes.selectedMenuItem}`]: {
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


class MultiSelect extends Component {
  constructor(props) {
    super(props);
    const { model, form } = this.props;
    this.state = {
      currentValue: utils.getValueFromModel(model, form.key) || [],
    };
  }

  static getDerivedStateFromProps(props) {
    const { model, form } = props;
    if (model && form.key) {
      return {
        currentValue: utils.getValueFromModel(model, form.key) || [],
      };
    }
    return null;
  }

  onSelected = (event) => {
    const { onChangeValidate } = this.props;
    const currentValue = event.target.value;
    this.setState({ currentValue });
    onChangeValidate(currentValue);
  };

  render() {
    const {
      form,
      localization: { getLocalizedString },
    } = this.props;
    const { currentValue } = this.state;
    const getTitle = utils.getTitleByValue.bind(this, form.titleMap);
    const menuItems = form.titleMap.map((item) => (
      <MenuItem
        key={item.value}
        value={item.value}
        className={
          currentValue.indexOf(item.value) === -1
            ? classes.menuItem
            : classes.selectedMenuItem
        }
      >
        {item.name && getLocalizedString(item.name)}
      </MenuItem>
    ));
    return (
      <Root className={classes.root}>
        <FormControl fullWidth {...form.otherProps}>
          <InputLabel required={form.required}>
            {form.title && getLocalizedString(form.title)}
          </InputLabel>
          <MuiSelect
            multiple
            value={currentValue || ''}
            placeholder={form.placeholder && getLocalizedString(form.placeholder)}
            disabled={form.readonly}
            onChange={this.onSelected}
            MenuProps={MenuProps}
            renderValue={(selected) => (
              <div className={classes.chips}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={getTitle(value) && getLocalizedString(getTitle(value))}
                    className={classes.chip}
                  />
                ))}
              </div>
            )}
          >
            {menuItems}
          </MuiSelect>
        </FormControl>
      </Root>
    );
  }
}

export default ComposedComponent(MultiSelect);
