/*
Native date field. 
Contains common logic for final components Date and DateTime.
*/
import React from 'react';
import TextField from '@material-ui/core/TextField';

class NativeDateField extends React.Component {

    constructor(props) {
        super(props);
        this.onDatePicked = this.onDatePicked.bind(this);
    }

    onDatePicked(e) {
        let date = new Date(e.target.value);
        this.props.onChangeValidate(date);
    }

    render() {
        let { form, value, type } = this.props
        // {shrink: true} fixes rendering of TextField without value
        // see https://github.com/mui-org/material-ui/issues/8131#issuecomment-328373902
        return (
            <TextField
                label={form.title}
                type={type}
                defaultValue={value}
                InputLabelProps={{ shrink: true }}
                onChange={this.onDatePicked}
                disabled={form.readonly}
            />

        );
    }
}

export default NativeDateField
