/**
 * Created by steve on 20/09/15.
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import {Checkbox, FormControlLabel} from '@material-ui/core';
import {selectOrSet} from './utils';

const styles = {
    error: {
        color: 'rgb(244, 67, 54)',
        fontSize: '12px',
        lineHeight: '12px',
    },
    checkbox: {
        marginTop: '14px',
        marginBottom: '0px',
        height: '72px',
    },
};

class Checkbox2 extends React.Component {

    constructor (props) {
        super(props);
        const {model, form} = this.props;
        const {key} = form;
        //If a boolean is stored, use it; if not, if a boolean is defined as schema's default, use it.
        const value = _.isBoolean(this.props.value)? this.props.value : (_.isBoolean(form.schema.default)? form.schema.default : undefined);
        this.props.setDefault(key, model, form, value);
    }

    render() {
        let value = selectOrSet(this.props.form.key, this.props.model);
        return (
                <FormControlLabel control={
                        <Checkbox 
                            onChange={(e) => {this.props.onChangeValidate(e, !this.props.value)}}
                            checked={value}
                            disabled={this.props.form.readonly}
                        />}
                        label={this.props.form.title}
                />
        );
    }
}

export default ComposedComponent(Checkbox2);
