//var React = require('react');
import React from 'react';
var utils = require('./utils');

export var ValidationMixin = ComposedComponent => class extends React.Component {

    constructor(props) {
        super(props);
        this.onChangeValidate = this.onChangeValidate.bind(this);
        let value = this.defaultValue();
        let validationResult = utils.validate(this.props.form, value);
        this.state = {
            value: value,
            valid: !!(validationResult.valid || !value),
            error: !validationResult.valid && value ? validationResult.error.message : null
        };
    }

    componentDidMount() {
        if (this.state.value != undefined) {
            this.props.onChange(this.props.form.key, this.state.value);
        }
    }

    /**
     * Called when <input> value changes.
     * @param e The input element, or something.
     */
    onChangeValidate(e) {
        let value = null;
        if (this.props.form.schema.type === 'integer' || this.props.form.schema.type === 'number') {
            if (e.target.value.indexOf('.') == -1) {
                value = parseInt(e.target.value);
            } else {
                value = parseFloat(e.target.value);
            }
        } else { // string
            value = e.target.value;
        }
        let validationResult = utils.validate(this.props.form, value);
        this.setState({
            value: value,
            valid: validationResult.valid,
            error: validationResult.valid ? null : validationResult.error.message
        });
        this.props.onChange(this.props.form.key, value);
    }

    defaultValue() {
        // check if there is a value in the model, if there is, display it. Otherwise, check if
        // there is a default value, display it.
        //console.log('Text.defaultValue key', this.props.form.key);
        //console.log('Text.defaultValue model', this.props.model);
        let value = utils.selectOrSet(this.props.form.key, this.props.model);
        //console.log('Text defaultValue value = ', value);

        // check if there is a default value
        if(!value && this.props.form['default']) {
            value = this.props.form['default'];
        }
        //console.log('value', value);

        if(!value && this.props.form.schema && this.props.form.schema['default']) {
            value = this.props.form.schema['default'];
        }
        return value;
    }

    render() {
        return <ComposedComponent {...this.props} {...this.state} onChangeValidate={this.onChangeValidate}/>;
    }
};
