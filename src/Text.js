/**
 * Created by steve on 15/09/15.
 */
var React = require('react');
var utils = require('./utils');
var classNames = require('classnames');
var ValidationMixin = require('./ValidationMixin');

var Text = React.createClass({

    mixins: [ValidationMixin],

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
