/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
const TextField = require('material-ui/lib/text-field');

class TextArea extends React.Component {

    render() {
        // FIXME: Obviously fix rowsMax eventually..
        //console.log('TextArea', this.props.form);
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
                    rows={this.props.form.rows}
                    rowsMax={this.props.form.rowsMax}
                    disabled={this.props.form.readonly}
                    style={this.props.form.style || {width: '100%'}}
                />
            </div>
        );
    }
}

export default ComposedComponent(TextArea);
