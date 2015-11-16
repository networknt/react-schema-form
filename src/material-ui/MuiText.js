/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ValidationMixin from '../ValidationMixin';
const TextField = require('material-ui/lib/text-field');

class MuiText extends React.Component {
    render() {
        return (
            <TextField
                type={this.props.form.type}
                floatingLabelText={this.props.form.title}
                hintText={this.props.form.placeholder}
                errorText={this.props.error}
                onChange={this.props.onChangeValidate}
                defaultValue={this.props.value} />
        );
    }
}

export default ValidationMixin(MuiText);
