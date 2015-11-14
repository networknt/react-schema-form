/**
 * Created by steve on 20/09/15.
 */
var React = require('react');
var utils = require('./utils');
var classNames = require('classnames');

var Checkbox = React.createClass({

    getInitialState: function () {
        let state = this.defaultValue();
        return {checked: state};
    },

    onChange: function() {
        let state = !this.state.checked;
        this.setState({checked: state});
        this.props.onChange(this.props.form.key, state);
    },

    componentDidMount() {
        // update parent model
        let value = this.defaultValue();
        if(value) {
            this.props.onChange(this.props.form.key, value);
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
        let formClasses = classNames('checkbox', 'schema-form-checkbox', this.props.form.htmlClass);
        let labelClasses = classNames('control-label', this.props.form.labelHtmlClass);
        let fieldClasses = classNames(this.props.form.fieldHtmlClass);
        return (
            <div className={formClasses}>
                <label className={labelClasses}>
                    <input type="checkbox"
                           className={fieldClasses}
                           checked={value}
                           onChange={this.onChange}
                           name={this.props.form.key.slice(-1)[0]}/>
                    <span>{this.props.form.title}</span>
                </label>

            </div>
        );
    }
});

module.exports = Checkbox;
