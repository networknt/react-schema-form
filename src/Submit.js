/**
 * Created by steve on 20/09/15.
 */
var React = require('react');
var utils = require('./utils');
var classNames = require('classnames');

var Submit = React.createClass({

    render: function() {
        let formClasses = classNames('form-group', 'schema-form-submit', this.props.form.htmlClass);
        let fieldClasses = classNames('btn', 'btn-primary', this.props.form.fieldHtmlClass);
        console.log('Submit formclasses', formClasses);
        return (
            <div className={formClasses}>
                <input type="submit"
                       className={fieldClasses}
                       value={this.props.form.title}/>
            </div>
        );
    }
});

module.exports = Submit;
