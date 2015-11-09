/**
 * Created by steve on 15/09/15.
 */
var React = require('react');
var utils = require('./utils');
var classNames = require('classnames');

var Textarea = React.createClass({

    onChange: function(e) {
        //console.log('name = ', e.target.name);
        //console.log('value = ', e.target.value);
        var result = utils.validate(this.props.form, e.target.value);
        this.valid = result.valid;
        if(this.valid === false) {
            this.error = result.error.message;
        }
        this.props.onChange(this.props.form.key, e.target.value);
    },

    componentDidMount() {
        // update parent model
        let value = this.defaultValue();
        if(value) {
            this.props.onChange(this.props.form.key, this.defaultValue());
        }
    },

    defaultValue: function() {
        // check if there is a value in the model, if there is, display it. Otherwise, check if
        // there is a default value, display it.
        let value = utils.selectOrSet(this.props.form.key, this.props.model);
        //console.log('value', value);

        // check if there is a default value
        if(!value && this.props.form['default']) {
            value = this.props.form['default'];
        }
        //console.log('value', value);

        if(!value && this.props.form.schema && this.props.form.schema['default']) {
            value = this.props.form.schema['default'];
        }
        return value;
    },

    render: function() {
        let value = this.defaultValue();

        let formClasses = classNames('form-group', 'schema-form-textarea', { 'has-error': this.valid === false }, this.props.form.htmlClass);
        let labelClasses = classNames('control-label', this.props.form.labelHtmlClass);
        let fieldClasses = classNames('form-control', this.props.form.fieldHtmlClass);
        let help = this.props.form.description || '';
        if(!this.valid || this.props.form.description) {
            help = (
                <div className="help-block">
                    {this.error || this.props.form.description}
                </div>
            )
        }

        return (
            <div className={formClasses}>
                <label className={labelClasses}>{this.props.form.title}</label>
                <textarea className={fieldClasses}
                    id={this.props.form.key.slice(-1)[0]}
                    onChange={this.onChange}
                    defaultValue={value}
                    placeholder={this.props.form.placeholder}
                    name={this.props.form.key.slice(-1)[0]}>
                </textarea>
                {help}
            </div>
        );
    }
});

module.exports = Textarea;
