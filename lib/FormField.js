/**
 * Created by steve on 12/09/15.
 */
'use strict';

var React = require('react');
var utils = require('./utils');

var FormField = React.createClass({
    displayName: 'FormField',

    render: function render() {
        return React.createElement(
            'div',
            null,
            this.props.schema.type
        );
    }
});

module.exports = FormField;