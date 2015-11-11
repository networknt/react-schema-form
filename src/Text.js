/**
 * Created by steve on 15/09/15.
 */
var React = require('react');
var utils = require('./utils');
var classNames = require('classnames');

var Text = React.createClass({
    getInitialState: function() {
        var value = this.defaultValue();
        let validationResult = utils.validate(this.props.form, value);
        return {
            value: value,
            valid: !!(validationResult.valid || !value),
            error: !validationResult.valid && value ? validationResult.error.message : null
        };
    },

    /**
     * Called when <input> value changes.
     * @param e
     */
    onChange: function(e) {
        let validationResult = utils.validate(this.props.form, e.target.value);
        this.setState({
            value: e.target.value,
            valid: validationResult.valid,
            error: validationResult.valid ? null : validationResult.error.message
        });
        this.props.onChange(this.props.form.key, e.target.value);
    },

    defaultValue: function() {
        // check if there is a value in the model, if there is, display it. Otherwise, check if
        // there is a default value, display it.
        //console.log('Text.defaultValue key', this.props.form.key);
        //console.log('Text.defaultValue model', this.props.model);
        let value = utils.selectOrSet(this.props.form.key, this.props.model);
        //console.log('Text defaultValue value = ', value);

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
        let formClasses = classNames('form-group', { 'has-error' : this.state.valid === false }, this.props.form.htmlClass, { 'has-success' : this.state.valid === true && this.state.value != null});
        let labelClasses = classNames('control-label', this.props.form.labelHtmlClass);
        let fieldClasses = classNames('form-control', this.props.form.fieldHtmlClass);

        let help = this.props.form.description || '';
        if(!this.state.valid || this.props.form.description) {
            help = (
                <div className="help-block">
                    {this.state.error || this.props.form.description}
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
                    defaultValue={this.state.value}
                    id={this.props.form.key.slice(-1)[0]}
                    name={this.props.form.key.slice(-1)[0]}/>
                {help}
            </div>
        );
    }
});

module.exports = Text;
