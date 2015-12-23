/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ValidationMixin from './ValidationMixin';
const SelectField = require('material-ui/lib/select-field');

class Select extends React.Component {

    constructor(props) {
        super(props);
        this.onSelected = this.onSelected.bind(this);
        console.log("this.props.form.titleMap", this.props.form.titleMap);
        this.state = {
            currentValue: this.props.form.titleMap != null ? this.props.form.titleMap[0].value : ""
        };
        console.log('constructor currentValue', this.state.currentValue);
    }

    onSelected(event, selectedIndex, menuItem) {
        this.setState({
            currentValue: menuItem.value
        });
        event.target.value = event.target.textContent;
        this.props.onChangeValidate(event);
        console.log('onSelected currentValue', this.state.currentValue);
    }

    render() {
        console.log('render currentValue', this.state.currentValue);
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

export default ValidationMixin(Select);
