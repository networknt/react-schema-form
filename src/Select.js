/**
 * Created by steve on 01/11/15.
 */
var React = require('react');
var utils = require('./utils');
var classNames = require('classnames');

var Select = React.createClass({

    getInitialState: function () {
        let state = this.defaultValue();
        return {selected: state};
    },

    onChange: function(e) {
        console.log('name = ', e.target.name);
        console.log('value = ', e.target.value);
        let state = e.target.value;
        this.setState({selected: state});
        this.props.onChange(this.props.form.key, state);
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
        let formClasses = classNames('form-group', 'schema-form-select', this.props.form.htmlClass);
        let labelClasses = classNames('control-label', this.props.form.labelHtmlClass);
        let fieldClasses = classNames('form-control', this.props.form.fieldHtmlClass);
        console.log('id', this.props.form.key.slice(-1)[0]);
        console.log('formClasses', formClasses);
        console.log('labelClasses', labelClasses);
        console.log('fieldClasses', fieldClasses);

        return (
            <div className={formClasses}>
                <label className={labelClasses}>{this.props.form.title}</label>
                <select className={fieldClasses}
                        value={value}
                        onChange={this.onChange}
                        id={this.props.form.key.slice(-1)[0]}
                        name={this.props.form.key.slice(-1)[0]}>
                    {this.props.form.titleMap.map(function(item) {
                        return <option key={item.value} value={item.value}>{item.name}</option>
                    }.bind(this))}
                </select>
            </div>
        );
    }
});

module.exports = Select;
