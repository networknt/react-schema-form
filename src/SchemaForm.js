/**
 * Created by steve on 11/09/15.
 */
var React = require('react');
var utils = require('./utils');
var FormField = require('./FormField');
var Number = require('./Number');
var Text = require('./Text');
var Textarea = require('./Textarea');
var Section = require('./Section');
var Help = require('./Help');
var Checkbox = require('./Checkbox');
var Submit = require('./Submit');
var Array = require('./Array');
var Select = require('./Select');

/*
var SchemaForm = React.createClass({

    getInitialState: function() {
        return {
            model: this.props.model || {}
        };
    },

    onChange : function(key, val) {
        console.log('onChange val', val);
        console.log('onChange key', key);
        this.setState({model: utils.selectOrSet(key, this.state.model, val)});
        console.log('model = ', this.state.model);
        this.props.onModelChange(this.state.model);
    },

    renderSchema: function(form, model, index, onChange) {
        var result;
        switch (form.type) {
            case 'number':
                result = <Number model={model} form={form} key={index} onChange={onChange} />
                break;
            case 'text':
                result = <Text model={model} form={form} key={index} onChange={onChange} />
                break;
            case 'textarea':
                result = <Textarea model={model} form={form} key={index} onChange={onChange} />
                break;
            case 'array':
                result = <Array model={model} form={form} key={index} onChange={onChange} />
                break;
        }
        return result;
    },

    render: function() {
        var merged = utils.merge(this.props.schema, this.props.form, this.props.ignore, this.props.option);
        console.log('SchemaForm merged = ', JSON.stringify(merged, undefined, 2));
        var forms = merged.map(function(form, index) {
            return this.renderSchema(form, this.state.model, index, this.onChange);
        }.bind(this))

        return (
            <div>{forms}</div>
        );
    }
});
*/

class SchemaForm extends React.Component {

    constructor(props) {
        super();

        this.state = {model: {}};
        this.onChange = this.onChange.bind(this);
    }

    onChange(key, val) {
        //console.log('onChange val', val);
        //console.log('onChange key', key);
        this.setState({model: utils.selectOrSet(key, this.state.model, val)});
        this.props.onModelChange(this.state.model);
    }

    renderSchema (form, model, index, onChange) {
        var result;
        switch (form.type) {
            case 'number':
                result = <Number model={model} form={form} key={index} onChange={onChange} />
                break;
            case 'text':
                result = <Text model={model} form={form} key={index} onChange={onChange} />
                break;
            case 'textarea':
                result = <Textarea model={model} form={form} key={index} onChange={onChange} />
                break;
            case 'help':
                result = <Help model={model} form={form} key={index} onChange={onChange} />
                break;
            case 'checkbox':
                result = <Checkbox model={model} form={form} key={index} onChange={onChange} />
                break;
            case 'submit':
                result = <Submit model={model} form={form} key={index} onChange={onChange} />
                break;
            case 'section':
                result = <Section model={model} form={form} key={index} onChange={onChange} renderSchema={this.renderSchema} />
                break;
            case 'array':
                result = <Array model={model} form={form} key={index} onChange={onChange} renderSchema={this.renderSchema} />
                break;
            case 'select':
                result = <Select model={model} form={form} key={index} onChange={onChange} />
                break;
        }
        //console.log('renderSchema', result);
        return result;
    }

    render() {
        var merged = utils.merge(this.props.schema, this.props.form, this.props.ignore, this.props.option);
        //console.log('SchemaForm merged = ', JSON.stringify(merged, undefined, 2));
        //console.log('SchemaForm render merged ', merged);
        var forms = merged.map(function(form, index) {
            return this.renderSchema(form, this.state.model, index, this.onChange);
        }.bind(this));

        return (
            <div>{forms}</div>
        );
    }
}

module.exports = SchemaForm;
