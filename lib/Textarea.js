/**
 * Created by steve on 15/09/15.
 */
'use strict';

var React = require('react');

var utils = require('./utils');

var Textarea = React.createClass({
    displayName: 'Textarea',

    onChange: function onChange(e) {
        console.log('name = ', e.target.name);
        console.log('value = ', e.target.value);
        this.props.onChange(this.props.form.key, e.target.value);
    },

    componentDidMount: function componentDidMount() {
        // update parent model
        var value = this.defaultValue();
        if (value) {
            this.props.onChange(this.props.form.key, this.defaultValue());
        }
    },

    defaultValue: function defaultValue() {
        // check if there is a value in the model, if there is, display it. Otherwise, check if
        // there is a default value, display it.
        var value = utils.selectOrSet(this.props.form.key, this.props.model);
        //console.log('value', value);

        // check if there is a default value
        if (!value && this.props.form['default']) {
            value = this.props.form['default'];
        }
        //console.log('value', value);

        if (!value && this.props.form.schema && this.props.form.schema['default']) {
            value = this.props.form.schema['default'];
        }
        return value;
    },

    render: function render() {
        var value = this.defaultValue();
        return React.createElement(
            'div',
            { className: 'form-group schema-form-textarea' },
            React.createElement(
                'label',
                null,
                this.props.form.title
            ),
            React.createElement('textarea', { className: 'form-control',
                id: this.props.form.key.slice(-1)[0],
                onChange: this.onChange,
                defaultValue: value,
                placeholder: this.props.form.placeholder,
                name: this.props.form.key.slice(-1)[0] })
        );
    }
});

module.exports = Textarea;