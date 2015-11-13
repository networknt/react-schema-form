/**
 * Created by steve on 12/09/15.
 */
'use strict';

var React = require('react');
var utils = require('./utils');

var FormField = React.createClass({
    displayName: 'FormField',

    render: function render() {

        var field;
        if (this.props.schema.type === 'text' || this.props.schema.type === 'number') {
            field = React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement(
                    'label',
                    { className: 'control-label' },
                    this.props.schema.title
                ),
                React.createElement('input', { type: '{{form.type}}',
                    step: 'any',
                    'sf-changed': 'form',
                    placeholder: this.props.schema.placeholder,
                    className: 'form-control',
                    id: this.props.schema.key.slice(-1)[0],
                    name: this.props.schema.key.slice(-1)[0] })
            );
        } else if (this.props.schema.type === 'textarea') {
            field = React.createElement(
                'div',
                { className: 'form-group schema-form-textarea' },
                React.createElement(
                    'label',
                    null,
                    this.props.schema.title
                ),
                React.createElement('textarea', { className: 'form-control',
                    id: this.props.schema.key.slice(-1)[0],
                    'sf-changed': 'form',
                    placeholder: this.props.schema.placeholder,
                    name: this.props.schema.key.slice(-1)[0] })
            );
        } else if (this.props.schema.type === 'checkbox') {
            field = React.createElement(
                'div',
                { className: 'checkbox schema-form-checkbox' },
                React.createElement(
                    'label',
                    null,
                    React.createElement('input', { type: 'checkbox',
                        'sf-changed': 'form',
                        name: this.props.schema.key.slice(-1)[0] }),
                    React.createElement(
                        'span',
                        null,
                        this.props.schema.title
                    )
                )
            );
        } else if (this.props.schema.type === 'help') {
            field = React.createElement('div', { className: 'helpvalue schema-form-helpvalue', dangerouslySetInnerHTML: { __html: this.props.schema.helpvalue } });
        } else if (this.props.schema.type === 'section') {
            field = React.DOM.div({ className: "schema-form-section" }, this.props.schema.items.map((function (item) {
                return React.createElement(FormField, { key: item.key, schema: item });
            }).bind(this)));
        } else if (this.props.schema.type === 'array') {
            field = React.createElement("div", { className: "schema-form-array" }, React.createElement("h3", null, this.props.schema.title), React.createElement("ol", { className: "list-group" }, React.createElement("li", { className: "list-group-item" }, this.props.schema.items.map(function (item) {
                React.createElement("button", { type: "button", className: "close pull-right" }, React.createElement("span", { "aria-hidden": "true" }, "×"), React.createElement("span", { 'class': "sr-only" }, "Close"));
            }))), React.createElement("div", { className: "clearfix" }, React.createElement("button", { type: "button",
                className: "btn btn-default pull-right" }, React.createElement("i", { 'class': "glyphicon glyphicon-plus" }), "Add")));
        } else if (this.props.schema.type === 'submit') {
            field = React.createElement(
                'div',
                { className: 'form-group schema-form-submit' },
                React.createElement('input', { type: 'submit',
                    className: 'btn btn-primary',
                    value: this.props.schema.title })
            );
        } else {
            //console.log('the type is not implemented yet', this.props.schema.type);
            field = React.createElement(
                'div',
                { className: 'form-group' },
                'Not implemented yet'
            );
        }

        return React.createElement(
            'div',
            null,
            field
        );
    }
});

module.exports = FormField;