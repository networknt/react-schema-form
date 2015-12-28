/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ValidationMixin from './ValidationMixin';
import MenuItem from 'material-ui/lib/menus/menu-item';
const SelectField = require('material-ui/lib/select-field');

class Select extends React.Component {

    constructor(props) {
        super(props);
        this.onSelected = this.onSelected.bind(this);
        this.state = {
            currentValue: this.props.form.titleMap != null ? this.props.form.titleMap[0].value : ""
        };
    }

    onSelected(event, selectedIndex, menuItem) {

        this.setState({
            currentValue: menuItem
        });
        event.target.value = event.target.textContent;
        this.props.onChangeValidate(event);
    }

    render() {
        const menuItems = this.props.form.titleMap.map((item, idx) => (
            <MenuItem key={idx}
                      primaryText={item.name}
                      value={item.value} />
        ));

        return (
            <SelectField
                value={this.state.currentValue}
                floatingLabelText={this.props.form.title}
                onChange={this.onSelected}
                fullWidth={true} >
                {menuItems}
            </SelectField>
        );
    }
}

export default ValidationMixin(Select);
