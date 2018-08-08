/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import {TextField} from '@material-ui/core';

class Text extends React.Component {

    constructor(props) {
        super(props);

        const {model, form, value} = this.props;
        const {key} = form;

        this.props.setDefault(key, model, form, value)
    }

    render() {
        //console.log('Text props', this.props);
        return (
            <div>
                <TextField
                    type={this.props.form.type}
                    label={this.props.form.title}
                    helperText={this.props.error || this.props.errorText}
                    error={this.props.error || this.props.errorText}
                    onChange={this.props.onChangeValidate}
                    defaultValue={this.props.value}
                    disabled={this.props.form.readonly}
                    style={this.props.form.style || {width: '100%'}}
                />
            </div>
        );
    }
}

export default ComposedComponent(Text);
