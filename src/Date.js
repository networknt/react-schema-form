/**
 * Created by steve on 22/12/15.
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import TextField from '@material-ui/core/TextField';

/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */
class DateField extends React.Component {
    constructor(props) {
        super(props);
        this.onDatePicked = this.onDatePicked.bind(this);
    }

    onDatePicked(e) {
        let date = new Date(e.target.value);
        this.props.onChangeValidate(date);
    }

    render() {
        let { form, value } = this.props
        // {shrink: true} fixes rendering of TextField without value
        // see https://github.com/mui-org/material-ui/issues/8131#issuecomment-328373902
        return (
            <TextField
                id="date"
                label={form.title}
                type="date"
                defaultValue={value}
                InputLabelProps={{ shrink: true }}
                onChange={this.onDatePicked}
                disabled={form.readonly}
            />

        );
    }
}

export default ComposedComponent(DateField);
