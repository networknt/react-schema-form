/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import MenuItem from '@material-ui/core/MenuItem';
import MuiSelect from '@material-ui/core/Select';

class Select extends React.Component {

    state = {
        currentValue: this.getInitialValue(this.props.model, this.props.form)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.model && nextProps.form.key) {
            this.setState({
                currentValue: this.getInitialValue(nextProps.model, nextProps.form)
            });
        }
    }

    getInitialValue (model, form) {
        return this.getModelValue(model, form.key) || (form.titleMap != null ? form.titleMap[0].value : '')
    }

    getModelValue(model, key) {
        if (Array.isArray(key)) {
            return key.reduce((cur, nxt) => cur && cur[nxt], model);
        } else {
            return model[key];
        }
    }

    onSelected = (event) => {
        let currentValue = event.target.value
        this.setState({
            currentValue
        });
        this.props.onChangeValidate(event);
    }

    render() {
        const menuItems = this.props.form.titleMap.map((item, idx) => (
            <MenuItem key={idx} value={item.value}>{item.name}</MenuItem>
        ));
        return (
            <div className={this.props.form.htmlClass}>
                <MuiSelect
                    value={this.state.currentValue}
                    placeholder={this.props.form.title}
                    disabled={this.props.form.readonly}
                    onChange={this.onSelected}
                    fullWidth >
                    {menuItems}
                </MuiSelect>
            </div>
        );
    }
}

// Select.propTypes = {
//
// };

export default ComposedComponent(Select);
