/**
 * Created by steve on 20/09/15.
 */
var React = require('react');
var classNames = require('classnames');

var Help = React.createClass({

    render: function() {
        let classes = classNames('helpvalue', 'schema-form-helpvalue', this.props.form.htmlClass);
        console.log('help classes', classes);
        return (
            <div className={classes} dangerouslySetInnerHTML={{__html: this.props.form.helpvalue}} ></div>
        )
    }
});

module.exports = Help;
