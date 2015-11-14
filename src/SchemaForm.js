/**
 * Created by steve on 11/09/15.
 */
import React from 'react';
var utils = require('./utils');
var FormField = require('./FormField');
import Number from './Number';
import Text from './Text';
import TextArea from './Textarea';
var Section = require('./Section');
var Help = require('./Help');
var Checkbox = require('./Checkbox');
var Submit = require('./Submit');
var Array = require('./Array');
var Select = require('./Select');
var Radios = require('./Radios');

class SchemaForm extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(key, val) {
        //console.log('SchemaForm onChange val', val);
        //console.log('SchemaForm onChange key', key);
        this.props.onModelChange(key, val);
    }

    renderSchema (form, model, index, onChange) {
        var result;
        //console.log('form = ', form);
        switch (form.type) {
            case 'number':
                result = <Number model={model} form={form} key={index} onChange={onChange} />;
                break;
            case 'text':
                result = <Text model={model} form={form} key={index} onChange={onChange} />;
                break;
            case 'textarea':
                result = <TextArea model={model} form={form} key={index} onChange={onChange} />;
                break;
            case 'help':
                result = <Help model={model} form={form} key={index} onChange={onChange} />;
                break;
            case 'checkbox':
                result = <Checkbox model={model} form={form} key={index} onChange={onChange} />;
                break;
            case 'submit':
                result = <Submit model={model} form={form} key={index} onChange={onChange} />;
                break;
            case 'section':
                result = <Section model={model} form={form} key={index} onChange={onChange} renderSchema={this.renderSchema} />;
                break;
            case 'array':
                result = <Array model={model} form={form} key={index} onChange={onChange} renderSchema={this.renderSchema} />;
                break;
            case 'select':
                result = <Select model={model} form={form} key={index} onChange={onChange} />;
                break;
            case 'radios':
                result = <Radios model={model} form={form} key={index} onChange={onChange} />;
                break;
        }
        //console.log('renderSchema', result);
        return result;
    }

    render() {
        let merged = utils.merge(this.props.schema, this.props.form, this.props.ignore, this.props.option);
        //console.log('SchemaForm merged = ', JSON.stringify(merged, undefined, 2));
        //console.log('SchemaForm render merged ', merged);
        let forms = merged.map(function(form, index) {
            return this.renderSchema(form, this.props.model, form.key[0], this.onChange);
        }.bind(this));

        return (
            <div>{forms}</div>
        );
    }
}

module.exports = SchemaForm;
