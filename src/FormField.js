/**
 * Created by steve on 12/09/15.
 */
var React = require('react');
var utils = require('./utils');

var FormField = React.createClass({

    render: function() {
        return (
            <div>{this.props.schema.type}</div>
        );
    }
});

module.exports = FormField;
