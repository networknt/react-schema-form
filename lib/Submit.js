/**
 * Created by steve on 20/09/15.
 */
'use strict';

var React = require('react');
var utils = require('./utils');
var classNames = require('classnames');

var Submit = React.createClass({
    displayName: 'Submit',

    render: function render() {
        var formClasses = classNames('form-group', 'schema-form-submit', this.props.form.htmlClass);
        var fieldClasses = classNames('btn', 'btn-primary', this.props.form.fieldHtmlClass);
        //console.log('Submit formclasses', formClasses);
        return React.createElement(
            'div',
            { className: formClasses },
            React.createElement('input', { type: 'submit',
                className: fieldClasses,
                value: this.props.form.title })
        );
    }
});

module.exports = Submit;