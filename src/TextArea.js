/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import {TextField} from '@material-ui/core';
import {selectOrSet} from './utils';

class TextArea extends React.Component {

    render() {
        // FIXME: Obviously fix rowsMax eventually..
        let value = selectOrSet(this.props.form.key,this.props.model) ? selectOrSet(this.props.form.key,this.props.model) : '';
        return (
                <TextField
                    type={this.props.form.type}
                    label={this.props.form.title}
                    helperText={this.props.form.placeholder}
                    onChange={this.props.onChangeValidate}
                    error={this.props.error}
                    value={value}
                    
                    disabled={this.props.form.readonly}
                    style={this.props.form.style || {width: '100%'}}
                />
        );
    }
}

export default ComposedComponent(TextArea);
