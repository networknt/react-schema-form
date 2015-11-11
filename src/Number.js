/**
 * Created by steve on 15/09/15.
 */
var React = require('react');
var utils = require('./utils');
var classNames = require('classnames');

var Number = React.createClass({

    onChange: function(e) {
        //console.log('value =', e.target.value);
        //console.log('value type = ', typeof e.target.value);
        // convert e.target.value to number
        //console.log('this.props.form', this.props.form);
        let value = null;
        if(this.props.form.schema.type === 'integer' && e.target.value.indexOf(".") == -1) {
            value = parseInt(e.target.value);
        } else {
            value = parseFloat(e.target.value);
        }
        //console.log('value after conversion', typeof value);
        var result = utils.validate(this.props.form, value);
        this.valid = result.valid;
        if(this.valid === false) {
            this.error = result.error.message;
        }
        this.props.onChange(this.props.form.key, value);
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
        //this.props.onChange(this.props.form.key, value);
        return value;
    },

    render: function() {
        let value = this.defaultValue();
        let formClasses = classNames('form-group', { 'has-error': this.valid === false }, this.props.form.htmlClass);
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
                <input type={this.props.form.type}
                       onChange={this.onChange}
                       step={this.props.form.step}
                       className={fieldClasses}
                       defaultValue={value}
                       id={this.props.form.key.slice(-1)[0]}
                       name={this.props.form.key.slice(-1)[0]}/>
                {help}
            </div>
        );
    }
});

module.exports = Number;
