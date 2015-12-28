/**
 * Created by steve on 11/09/15.
 */
import React from 'react';
import utils from './utils';
import Number from './Number';
import Text from './Text';
import TextArea from './TextArea';
import Select from './Select';
import Radios from './Radios';
import Date from './Date';
import Checkbox from './Checkbox';
import Help from './Help';

class SchemaForm extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(key, val) {
        this.props.onModelChange(key, val);
    }

    static renderSchema (form, model, index, onChange) {
        var result;
        switch (form.type) {
            case 'number':
                result = <Number model={model} form={form} key={index} onChange={onChange} />;
                break;
            case 'text':
                result = <Text model={model} form={form} key={index} onChange={onChange} className='muiSchemaForm'/>;
                break;
            case 'textarea':
                result = <TextArea model={model} form={form} key={index} onChange={onChange} />;
                break;
            case 'select':
                result = <Select model={model} form={form} key={index} onChange={onChange} />;
                break;
            case 'radios':
                result = <Radios model={model} form={form} key={index} onChange={onChange} />;
                break;
            case 'date':
                result = <Date model={model} form={form} key={index} onChange={onChange} />;
                break;
            case 'checkbox':
                result = <Checkbox model={model} form={form} key={index} onChange={onChange} />;
                break;
            case 'help':
                result = <Help model={model} form={form} key={index} onChange={onChange} />;
                break;
        }
        return result;
    }

    render() {
        let merged = utils.merge(this.props.schema, this.props.form, this.props.ignore, this.props.option);
        //console.log('SchemaForm merged = ', JSON.stringify(merged, undefined, 2));
        //console.log('SchemaForm render merged ', merged);
        let forms = merged.map(function(form, index) {
            return SchemaForm.renderSchema(form, this.props.model, form.key[0], this.onChange);
        }.bind(this));

        return (
            <div style={{width: '100%'}} className='SchemaForm'>{forms}</div>
        );
    }
}

module.exports = SchemaForm;
