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
        'fieldset': FieldSet
    };

    constructor(props) {
        super(props);
    }

    // Assign default values and save it to the model
    setDefault = (key, model, form, value) => {
        const currentValue = utils.selectOrSet(key, model);

        // If current value is not setted and exist a default, apply the default over the model
        if (_.isNil(currentValue) && !_.isNil(value))
            this.props.onModelChange(key, value, form.type, form);
    }

    builder(form, model, index, mapper) {
        const Field = this.mapper[form.type];
        if(!Field) {
            console.log('Invalid field: \"' + form.key[0] + '\"!');
            return null;
        }

        // Apply conditionals to review if this field must be rendered
        if(form.condition && utils.safeEval(form.condition, {model}) === false) {
            return null;
        }

        const key = form.key && form.key.join(".") || index;

        const {errors} = this.props;
        let error = (key in errors)? errors[key] : null;

        return <Field
                    model={model}
                    form={form}
                    key={key}
                    onChange={this.props.onModelChange}
                    setDefault={this.setDefault}
                    mapper={mapper}
                    builder={this.builder}
                    errorText={error}
                />
    }

    render() {
        let merged = utils.merge(this.props.schema, this.props.form, this.props.ignore, this.props.option);

        //console.log('SchemaForm merged = ', JSON.stringify(merged, undefined, 2));
        let mapper = this.mapper;
        if(this.props.mapper) {
            mapper = _.merge(this.mapper, this.props.mapper);
        }
        let forms = merged.map(function(form, index) {
            return this.builder(form, this.props.model, index, mapper);
        }.bind(this));

        return (
            <div style={{width: '100%'}} className={'SchemaForm ' + this.props.className}>{forms}</div>
        );
    }
}

module.exports = SchemaForm;
