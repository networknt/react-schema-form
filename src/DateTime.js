import React from 'react';
var utils = require('./utils');
var classNames = require('classnames');
import ComposedComponent from './ComposedComponent';
import TextField from '@material-ui/core/TextField';

/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */
class DateTimeField extends React.Component {
    constructor(props) {
        super(props);
        this.onDatePicked = this.onDatePicked.bind(this);
    }

    onDatePicked(e) {
        console.log(Date);
        let d = new Date(e.target.value);
        console.log(d.toJSON());
        this.props.onChangeValidate(d);
    }

    render() {
        var value = null;
        if (this.props && this.props.value) {
            value = this.props.value;
        }

        return (
            <div
                style={{ width: '100%', display: 'block' }}
                className={this.props.form.htmlClass}
            >
                <TextField
                    type="datetime-local"
                    label={this.props.form.title}
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    onChange={this.onDatePicked}
                    disabled={this.props.form.readonly}
                />
            </div>
        );
    }
}

export default ComposedComponent(DateTimeField);
