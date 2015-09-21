/**
 * Created by steve on 20/09/15.
 */
var React = require('react');
var utils = require('./utils');
var classNames = require('classnames');

var Checkbox = React.createClass({

    render: function() {
        let checkboxClasses = classNames('checkbox', 'schema-form-checkbox', this.props.form.htmlClass);
        console.log('checkbox classes', checkboxClasses);
        return (
            <div className={checkboxClasses}>
                <label>
                    <input type="checkbox"
                           sf-changed="form"
                           className={this.props.form.fieldHtmlClass}
                           name={this.props.form.key.slice(-1)[0]}/>
                    <span>{this.props.form.title}</span>
                </label>
            </div>
        );
    }
});

module.exports = Checkbox;
