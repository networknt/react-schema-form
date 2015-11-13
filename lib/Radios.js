'use strict';

var React = require('react');
var utils = require('./utils');
var classNames = require('classnames');

var Radios = React.createClass({
    displayName: 'Radios',

    getInitialState: function getInitialState() {
        var value = this.defaultValue();
        var validationResult = utils.validate(this.props.form, value);
        return {
            value: value,
            valid: !!(validationResult.valid || !value),
            error: !validationResult.valid && value ? validationResult.error.message : null
        };
    },

    onChange: function onChange(e) {
        var validationResult = utils.validate(this.props.form, e.target.value);
        this.setState({
            value: e.target.value,
            valid: validationResult.valid,
            error: validationResult.valid ? null : validationResult.error.message
        });
        this.props.onChange(this.props.form.key, e.target.value);
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

        // The first value in the option will be the default.
        if (!value && this.props.form.titleMap && this.props.form.titleMap[0].value) {
            value = this.props.form.titleMap[0].value;
        }
        //this.props.onChange(this.props.form.key, value);
        return value;
    },

    render: function render() {

        var formClasses = classNames('form-group', { 'has-error': this.state.valid === false }, 'schema-form-radios', this.props.form.htmlClass);
        var labelClasses = classNames('control-label', this.props.form.labelHtmlClass);
        var fieldClasses = classNames(this.props.form.fieldHtmlClass);
        var help = this.props.form.description || '';
        if (!this.state.valid || this.props.form.description) {
            help = React.createElement(
                'div',
                { className: 'help-block' },
                this.state.error || this.props.form.description
            );
        }
        var items = this.props.form.titleMap.map((function (item) {
            return React.createElement(
                'div',
                { key: item.name },
                React.createElement(
                    'label',
                    null,
                    React.createElement('input', { type: 'radio',
                        name: item.name,
                        value: item.value,
                        className: fieldClasses,
                        onChange: this.onChange,
                        checked: this.state.value === item.value,
                        id: item.name
                    }),
                    React.createElement(
                        'span',
                        null,
                        item.name
                    )
                )
            );
        }).bind(this));

        //console.log('items =', items);
        //console.log('formClasses', formClasses);
        //console.log('labelClasses', labelClasses);
        //console.log('fieldClasses', fieldClasses);

        return React.createElement(
            'div',
            { className: formClasses },
            React.createElement(
                'label',
                { className: labelClasses },
                this.props.form.title
            ),
            items,
            help
        );
    }
});

module.exports = Radios;