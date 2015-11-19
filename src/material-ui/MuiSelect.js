/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ValidationMixin from '../ValidationMixin';
const DropDownMenu = require('material-ui/lib/drop-down-menu');
const SelectField = require('material-ui/lib/select-field');

class MuiSelect extends React.Component {

    constructor(props) {
        super(props);
        this.onSelected = this.onSelected.bind(this);
        console.log("this.props.form.titleMap", this.props.form.titleMap);
        this.state = {
            currentValue: this.props.form.titleMap != null ? this.props.form.titleMap[0].value : ""
        }
    }

    onSelected(event, selectedIndex, menuItem) {
        this.setState({
            currentValue: menuItem.value
        });
        event.target.value = event.target.textContent;
        this.props.onChangeValidate(event);
    }

    render() {
        return (
                <SelectField
                    menuItems={this.props.form.titleMap}
                    value={this.state.currentValue}
                    displayMember="name"
                    valueMember="value"
                    floatingLabelText={this.props.form.title}
                    onChange={this.onSelected}
                    fullWidth={true} />
        );
    }
}

export default ValidationMixin(MuiSelect);
