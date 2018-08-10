/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import {TextField} from '@material-ui/core';
import {selectOrSet} from './utils';

class Text extends React.Component {

    constructor(props) {
        super(props);

        const {model, form, value} = this.props;
        const {key} = form;

        this.props.setDefault(key, model, form, value)
    }

    render() {
        let value = selectOrSet(this.props.form.key,this.props.model) ? selectOrSet(this.props.form.key,this.props.model) : '';
        return (
            <div>
                <TextField
                    type={this.props.form.type}
                    label={this.props.form.title}
                    helperText={this.props.errorText}
                    error={this.props.error}
                    onChange={this.props.onChangeValidate}
                    value={value}
                    
                    disabled={this.props.form.readonly}
                    style={this.props.form.style || {width: '100%'}}
                />
            </div>
        );
    }
}

export default ComposedComponent(Text);
