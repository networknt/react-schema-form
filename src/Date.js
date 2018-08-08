/**
 * Created by steve on 22/12/15.
 */
import React from 'react';
var utils = require('./utils');
import ComposedComponent from './ComposedComponent';
import {IconButton, DatePicker, TextField} from '@material-ui/core';
//import Clear from '@material-ui/core/SvgIcon';

/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */
class Date extends React.Component {

    constructor(props) {
        super(props);
        this.onDatePicked = this.onDatePicked.bind(this);
    }


    onDatePicked(e) {
        this.props.onChangeValidate(e.target.value);
    }

    render() {
        var value = null;
        if (this.props && this.props.value) {
            value = this.props.value;
        }

        return (
            <div style={{width: '100%', display: 'block'}}>
                <TextField
                    id="date"
                    label="Birthday"
                    type="date"
                    defaultValue="2017-05-24"
                    onChange={this.onDatePicked}
                />
            </div>
        );
    }
}

export default ComposedComponent(Date);
