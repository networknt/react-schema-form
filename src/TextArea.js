/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import {TextField} from '@material-ui/core';

class TextArea extends React.Component {

    render() {
        // FIXME: Obviously fix rowsMax eventually..
        //console.log('TextArea', this.props.form);
        return (
                <TextField
                    type={this.props.form.type}
                    label={this.props.form.title}
                    helperText={this.props.form.placeholder}
                    onChange={this.props.onChangeValidate}
                    error={this.props.error || this.props.errorText}
                    defaultValue={this.props.value}
                    disabled={this.props.form.readonly}
                    style={this.props.form.style || {width: '100%'}}
                />
        );
    }
}

export default ComposedComponent(TextArea);
