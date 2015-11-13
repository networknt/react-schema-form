/**
 * Created by steve on 01/11/15.
 */
'use strict';

var React = require('react');
var utils = require('./utils');
var classNames = require('classnames');

var Select = React.createClass({
    displayName: 'Select',

    getInitialState: function getInitialState() {
        var state = this.defaultValue();
        return { selected: state };
    },

    onChange: function onChange(e) {
        //console.log('name = ', e.target.name);
        //console.log('value = ', e.target.value);
        var state = e.target.value;
        this.setState({ selected: state });
        this.props.onChange(this.props.form.key, state);
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

        // The first value in the option will be the default.
        if (!value && this.props.form.titleMap && this.props.form.titleMap[0].value) {
            value = this.props.form.titleMap[0].value;
        }
        //this.props.onChange(this.props.form.key, value);
        return value;
    },

    render: function render() {

        var value = this.defaultValue();
        var formClasses = classNames('form-group', 'schema-form-select', this.props.form.htmlClass);
        var labelClasses = classNames('control-label', this.props.form.labelHtmlClass);
        var fieldClasses = classNames('form-control', this.props.form.fieldHtmlClass);
        //console.log('id', this.props.form.key.slice(-1)[0]);
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
            React.createElement(
                'select',
                { className: fieldClasses,
                    value: value,
                    onChange: this.onChange,
                    id: this.props.form.key.slice(-1)[0],
                    name: this.props.form.key.slice(-1)[0] },
                this.props.form.titleMap.map((function (item) {
                    return React.createElement(
                        'option',
                        { key: item.value, value: item.value },
                        item.name
                    );
                }).bind(this))
            )
        );
    }
});

module.exports = Select;