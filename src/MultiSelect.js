import React, { Component } from 'react'
import ComposedComponent from './ComposedComponent'
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem'
import MuiSelect from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Chip from '@material-ui/core/Chip';
import { getValueFromModel, getTitleByValue } from './utils'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
    menuItem: {
        fontWeight: theme.typography.fontWeightRegular
    },
    selectedMenuItem: {
        fontWeight: theme.typography.fontWeightMedium
    }
})

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

class MultiSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentValue: getValueFromModel(this.props.model, this.props.form.key) || []
        }
    }

    static getDerivedStateFromProps(props) {
        if (props.model && props.form.key) {
            return {
                currentValue: getValueFromModel(props.model, props.form.key) || []
            }
        }
    }

    onSelected = (event) => {
        let currentValue = event.target.value
        this.setState({ currentValue })
        this.props.onChangeValidate(currentValue)
    }

    render() {
        const { form, classes } = this.props
        const { currentValue } = this.state
        const getTitle = getTitleByValue.bind(this, form.titleMap)
        const menuItems = form.titleMap.map(item => (
            <MenuItem
                key={item.value}
                value={item.value}
                className={currentValue.indexOf(name) === -1 ? classes.menuItem : classes.selectedMenuItem}
            >
                {item.name}
            </MenuItem>
        ))
        return (
            <FormControl fullWidth>
                <InputLabel>{form.title}</InputLabel>
                <MuiSelect
                    multiple
                    value={this.state.currentValue || ''}
                    placeholder={form.title}
                    disabled={form.readonly}
                    onChange={this.onSelected}
                    MenuProps={MenuProps}
                    renderValue={selected => (
                        <div className={classes.chips}>
                            {selected.map(value => (
                                <Chip key={value} label={getTitle(value)} className={classes.chip} />
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

export default ComposedComponent(withStyles(styles)(MultiSelect));
