/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ValidationMixin from './ValidationMixin';
const TextField = require('material-ui/lib/text-field');

class Text extends React.Component {
    render() {
        //console.log('Text props', this.props.form.readonly);
        return (
            <div>
                <TextField
                    type={this.props.form.type}
                    floatingLabelText={this.props.form.title}
                    hintText={this.props.form.placeholder}
                    errorText={this.props.error}
                    onChange={this.props.onChangeValidate}
                    defaultValue={this.props.value}
                    disabled={this.props.form.readonly}
                    style={{width: '100%'}} />
            </div>
        );
    }
}

export default ValidationMixin(Text);
