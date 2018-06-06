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
import Array from './Array';
import Binary from './Binary';
import FieldSet from './FieldSet';
import _ from 'lodash';

class SchemaForm extends React.Component {

    mapper = {
        'number': Number,
        'text': Text,
        'password': Text,
        'textarea': TextArea,
        'select': Select,
        'radios': Radios,
        'date': Date,
        'checkbox': Checkbox,
        'help': Help,
        'array': Array,
        'binary': Binary,
        'fieldset': FieldSet
    };

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(key, val, type) {
        //console.log('SchemaForm.onChange', key, val);
        this.props.onModelChange(key, val, type);
    }

    builder(form, model, index, onChange, mapper) {
        var type = form.type;
        let Field = this.mapper[type];
        if(!Field) {
          console.log('Invalid field: \"' + form.key[0] + '\"!');
          return null;
        }

        if(form.condition && utils.safeEval(form.condition, {model}) === false) {
          return null;
        }

        const key = form.key && form.key.join(".") || index;
        return <Field model={model} form={form} key={key} onChange={onChange} mapper={mapper} builder={this.builder}/>
    }

    render() {
        let merged = utils.merge(this.props.schema, this.props.form, this.props.ignore, this.props.option);
        //console.log('SchemaForm merged = ', JSON.stringify(merged, undefined, 2));
        let mapper = this.mapper;
        if(this.props.mapper) {
            mapper = _.merge(this.mapper, this.props.mapper);
        }
        let forms = merged.map(function(form, index) {
            return this.builder(form, this.props.model, index, this.onChange, mapper);
        }.bind(this));

        return (
            <div style={{width: '100%'}} className={'SchemaForm ' + this.props.className}>{forms}</div>
        );
    }
}

module.exports = SchemaForm;
