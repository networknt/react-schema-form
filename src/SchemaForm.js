/**
 * Created by steve on 11/09/15.
 */
var React = require('react');
var utils = require('./utils');
var FormField = require('./FormField');

var SchemaForm = React.createClass({

    render: function() {
        var merged = utils.merge(this.props.schema, this.props.form, this.props.ignore, this.props.option);
        console.log('SchemaForm merged = ', JSON.stringify(merged, undefined, 2));
        var fields = merged.map(function(field, index) {
            return <FormField schema={field} key={index}/>
        });

        return (
            <div>{fields}</div>
        );
    }
});

module.exports = SchemaForm;
