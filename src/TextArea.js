/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ValidationMixin from './ValidationMixin';
const TextField = require('material-ui/lib/text-field');

class TextArea extends React.Component {

    render() {
        // FIXME: Obviously fix rowsMax eventually..
        return (
            <div>
                <TextField
                    type={this.props.form.type}
                    floatingLabelText={this.props.form.title}
                    hintText={this.props.form.placeholder}
                    onChange={this.props.onChangeValidate}
                    errorText={this.props.error}
                    defaultValue={this.props.value}
                    multiLine={true}
                    rowsMax={5}
                    style={{width: '100%'}}>
                </TextField>
            </div>
        );
    }
}

export default ValidationMixin(TextArea);
