/**
 * Created by steve on 17/09/15.
 */
var React = require('react');
var classNames = require('classnames');

var Section = React.createClass({

    render: function() {
        let classes = classNames('schema-form-section', this.props.form.htmlClass);
        //console.log('section classes', classes);
        return (
            React.DOM.div( {className:{classes}},
                this.props.form.items.map(function(item, index) {
                    return MuiSchemaForm.renderSchema(item, this.props.model, index, this.props.onChange);
                }.bind(this))
            )
        )
    }
});

module.exports = Section;
