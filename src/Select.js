/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

class Select extends React.Component {

    constructor(props) {
        super(props);
        this.onSelected = this.onSelected.bind(this);
        this.state = {
            currentValue: this.props.model[this.props.form.key]
            || (this.props.form.titleMap != null ? this.props.form.titleMap[0].value : '')
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.model) {
            this.setState({
                currentValue: nextProps.model[nextProps.form.key]
                || (nextProps.form.titleMap != null ? nextProps.form.titleMap[0].value : '')
            });
        }
    }

    onSelected(event, selectedIndex, menuItem) {

        this.setState({
            currentValue: menuItem
        });
        event.target.value = menuItem;
        this.props.onChangeValidate(event);
    }

    render() {
        const menuItems = this.props.form.titleMap.map((item, idx) => (
            <MenuItem key={idx}
                      primaryText={item.name}
                      value={item.value} />
        ));

        return (
            <div className={this.props.form.htmlClass}>
                <SelectField
                    value={this.state.currentValue}
                    floatingLabelText={this.props.form.title}
                    disabled={this.props.form.readonly}
                    onChange={this.onSelected}
                    fullWidth={true} >

                    {menuItems}
                </SelectField>
            </div>
        );
    }
}

// Select.propTypes = {
//
// };

export default ComposedComponent(Select);
