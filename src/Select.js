/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import {Select, InputLabel, MenuItem, FormControl} from '@material-ui/core';
import _ from 'lodash';

class Select2 extends React.Component {

    constructor(props) {
        super(props);
        this.onSelected = this.onSelected.bind(this);

        const {model, form} = this.props;
        const {key} = form;

        const storedValue = model && this.getModelKey(model, key) || false;
        const defaultValue = form.schema.default || false;
        const value = !(_.isEmpty(storedValue)) && storedValue || defaultValue;

        this.props.setDefault(key, model, form, value)
        this.state = {
            currentValue: value,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.model && nextProps.form.key) {
            this.setState({
                currentValue: this.getModelKey(nextProps.model, nextProps.form.key)
                || (nextProps.form.titleMap != null ? nextProps.form.titleMap[0].value : '')
            });
        }
    }

    getModelKey(model, key) {
        if (Array.isArray(key)) {
            return key.reduce((cur, nxt) => (cur[nxt] || {}), model);
        } else {
            return model[key];
        }
    }

    onSelected(event) {

        this.setState({
            currentValue: event.target.value
        });

        this.props.onChangeValidate(event);
    }

    render() {

        console.log('Select is tried to render', this.state.currentValue);
        const menuItems = this.props.form.titleMap.map((item, idx) => (
            <MenuItem key={idx} value={item.value}>{item.name}</MenuItem>
        ));

        return (
            <FormControl>
                <InputLabel htmlFor="age-simple">{this.props.form.title}</InputLabel>

                    <Select
                        disabled={this.props.form.readonly}
                        value={'this.state.currentValue'}
                        onChange={this.onSelected}
                    >
                        {menuItems}
                    </Select>
            </FormControl>
        );
    }
}


export default ComposedComponent(Select2);
