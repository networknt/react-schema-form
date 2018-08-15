/**
 * Created by steve on 22/12/15.
 */
import React from 'react';
var utils = require('./utils');
import ComposedComponent from './ComposedComponent';
import {IconButton, DatePicker, TextField} from '@material-ui/core';
import {selectOrSet} from './utils';
//import Clear from '@material-ui/core/SvgIcon';

/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */
class Date extends React.Component {

    constructor(props) {
        super(props);

        const {model, form, value} = this.props;
        const {key} = form;

        this.props.setDefault(key, model, form, value)

        this.onDatePicked = this.onDatePicked.bind(this);
    }


    onDatePicked(e) {
        console.log('DATE SELECT', e.target.value, this.props.form.type);
        this.props.onChangeValidate(e);
    }

    render() {
        let value = selectOrSet(this.props.form.key,this.props.model) ? selectOrSet(this.props.form.key,this.props.model) : '0';

        return (
                <TextField style={{width: '100%', display: 'block'}}
                    label={this.props.form.title}
                    type={this.props.form.type}
                    value={value}
                    onChange={this.onDatePicked}
                />
        );
    }
}

export default ComposedComponent(Date);
