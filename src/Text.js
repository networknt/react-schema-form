/**
 * Created by steve on 15/09/15.
 */
var React = require('react');
var utils = require('./utils');
var classNames = require('classnames');

var Text = React.createClass({
    onChange: function(e) {
        //console.log('name = ', e.target.name);
        //console.log('value = ', e.target.value);
        var result = utils.validate(this.props.form, e.target.value);
        this.valid = result.valid;
        if(this.valid === false) {
            this.error = result.error.message;
        }
        //console.log('valid = ', this.valid);
        this.props.onChange(this.props.form.key, e.target.value);
    },

    componentDidMount() {
        //console.log('Text ', this.props.form);
        // update parent model
        let value = this.defaultValue();
        if(value) {
            console.log('default value is set here.ta')
            this.props.onChange(this.props.form.key, this.defaultValue());
        }
    },

    defaultValue: function() {
        // check if there is a value in the model, if there is, display it. Otherwise, check if
        // there is a default value, display it.
        let value = utils.selectOrSet(this.props.form.key, this.props.model);
        console.log('Text defaultValue value = ', value);

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
        console.log('render value = ', value);
        let formClasses = classNames('form-group', { 'has-error': this.valid === false }, this.props.form.htmlClass);
        let labelClasses = classNames('control-label', this.props.form.labelHtmlClass);
        let fieldClasses = classNames('form-control', this.props.form.fieldHtmlClass);
        //console.log('value', value);
        //console.log('id', this.props.form.key.slice(-1)[0]);
        //console.log('formClasses', formClasses);
        //console.log('labelClasses', labelClasses);
        //console.log('fieldClasses', fieldClasses);
        //console.log('this.props.form.description', this.props.form.description);
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
                    placeholder={this.props.form.placeholder}
                    className={fieldClasses}
                    defaultValue={value}
                    id={this.props.form.key.slice(-1)[0]}
                    name={this.props.form.key.slice(-1)[0]}/>
                {help}
            </div>
        );
    }
});

module.exports = Text;
