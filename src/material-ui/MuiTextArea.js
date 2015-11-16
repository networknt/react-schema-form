/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ValidationMixin from '../ValidationMixin';
const TextField = require('material-ui/lib/text-field');

class MuiTextArea extends React.Component {

    render() {
        // FIXME: Obviously fix rowsMax eventually..
        return (
            <TextField
                type={this.props.form.type}
                floatingLabelText={this.props.form.title}
                hintText={this.props.form.placeholder}
                onChange={this.props.onChangeValidate}
                errorText={this.props.error}
                defaultValue={this.props.value}
                multiLine={true}
                rowsMax={5}>
            </TextField>
        );
    }
}

export default ValidationMixin(MuiTextArea);
