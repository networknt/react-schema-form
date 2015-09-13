/**
 * Created by steve on 11/09/15.
 */
'use strict';

var React = require('react');
var utils = require('./utils');
var FormField = require('./FormField');

var SchemaForm = React.createClass({
    displayName: 'SchemaForm',

    render: function render() {
        var merged = utils.merge(this.props.schema, this.props.form, this.props.ignore, this.props.option);
        console.log('SchemaForm merged = ', JSON.stringify(merged, undefined, 2));
        var fields = merged.map(function (field) {
            return React.createElement(FormField, { schema: field });
        });

        return React.createElement(
            'div',
            null,
            fields
        );
    }
});

module.exports = SchemaForm;