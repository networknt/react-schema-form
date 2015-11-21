/**
 * Created by steve on 20/09/15.
 */
'use strict';

var React = require('react');
var utils = require('./utils');
var classNames = require('classnames');

var Checkbox = React.createClass({
    displayName: 'Checkbox',

    getInitialState: function getInitialState() {
        var state = this.defaultValue();
        return { checked: state };
    },

    onChange: function onChange() {
        var state = !this.state.checked;
        this.setState({ checked: state });
        this.props.onChange(this.props.form.key, state);
    },

    componentDidMount: function componentDidMount() {
        // update parent model
        var value = this.defaultValue();
        if (value) {
            this.props.onChange(this.props.form.key, value);
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
        //this.props.onChange(this.props.form.key, value);
        return value;
    },

    render: function render() {
        var value = this.defaultValue();
        var formClasses = classNames('checkbox', 'schema-form-checkbox', this.props.form.htmlClass);
        var labelClasses = classNames('control-label', this.props.form.labelHtmlClass);
        var fieldClasses = classNames(this.props.form.fieldHtmlClass);
        return React.createElement(
            'div',
            { className: formClasses },
            React.createElement(
                'label',
                { className: labelClasses },
                React.createElement('input', { type: 'checkbox',
                    className: fieldClasses,
                    checked: value,
                    onChange: this.onChange,
                    name: this.props.form.key.slice(-1)[0] }),
                React.createElement(
                    'span',
                    null,
                    this.props.form.title
                )
            )
        );
    }
});

module.exports = Checkbox;