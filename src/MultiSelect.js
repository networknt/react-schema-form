// @flow
import React, { Component } from 'react'
import withStyles from '@mui/styles/withStyles';
import MenuItem from '@mui/material/MenuItem'
import MuiSelect from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Chip from '@mui/material/Chip'
import ComposedComponent from './ComposedComponent'
import utils from './utils'
import type { Localization } from './types'

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing(0.25)
  },
  menuItem: {
    fontWeight: theme.typography.fontWeightRegular
  },
  selectedMenuItem: {
    fontWeight: theme.typography.fontWeightMedium
  }
})

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

type Props = {
  model: any,
  form: any,
  onChangeValidate: any,
  classes: any,
  localization: Localization
}

type State = {
  currentValue: any
}

class MultiSelect extends Component<Props, State> {
  constructor(props) {
    super(props)
    const { model, form } = this.props
    this.state = {
      currentValue: utils.getValueFromModel(model, form.key) || []
    }
  }

  static getDerivedStateFromProps(props: Props) {
    const { model, form } = props
    if (model && form.key) {
      return {
        currentValue: utils.getValueFromModel(model, form.key) || []
      }
    }
    return null
  }

  onSelected = (event) => {
    const { onChangeValidate } = this.props
    const currentValue = event.target.value
    this.setState({ currentValue })
    onChangeValidate(currentValue)
  }

  render() {
    const {
      form,
      classes,
      localization: { getLocalizedString }
    } = this.props
    const { currentValue } = this.state
    const getTitle = utils.getTitleByValue.bind(this, form.titleMap)
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
    ))
    return (
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
    )
  }
}

export default ComposedComponent(withStyles(styles)(MultiSelect))
