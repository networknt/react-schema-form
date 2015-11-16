/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ValidationMixin from '../ValidationMixin';
const DropDownMenu = require('material-ui/lib/drop-down-menu');

class MuiSelect extends React.Component {

    constructor(props) {
        super(props);
        this.onSelected = this.onSelected.bind(this);
    }

    onSelected(event, selectedIndex, menuItem) {
        event.target.value = event.target.textContent;
        this.props.onChangeValidate(event);
    }

    render() {
        return (
            <DropDownMenu
                menuItems={this.props.form.titleMap}
                displayMember="name"
                valueMember="value"
                floatingLabelText={this.props.form.title}
                onChange={this.onSelected}>
            </DropDownMenu>
        );
    }
}

export default ValidationMixin(MuiSelect);
