import React from 'react';
import { styled } from '@mui/system';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import useSchemaField from './useSchemaField';
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

const MultiSelect = (props) => {
  const {
    form,
    localization: { getLocalizedString },
  } = props;
  const { value, onChangeValidate } = useSchemaField(props);
  const currentValue = value || [];

  const onSelected = (event) => {
    onChangeValidate(event.target.value);
  };

  const getTitle = utils.getTitleByValue.bind(null, form.titleMap);

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
          value={currentValue}
          placeholder={form.placeholder && getLocalizedString(form.placeholder)}
          disabled={form.readonly}
          onChange={onSelected}
          MenuProps={MenuProps}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((val) => (
                <Chip
                  key={val}
                  label={getTitle(val) && getLocalizedString(getTitle(val))}
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
};

export default MultiSelect;
