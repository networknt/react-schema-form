/**
 * Created by steve on 11/09/15.
 */
import React from 'react';
import utils from './../utils';
import MuiNumber from './MuiNumber';
import MuiText from './MuiText';
import MuiTextArea from './MuiTextArea';
import MuiSelect from './MuiSelect';
import MuiRadios from './MuiRadios';
import MuiDate from './MuiDate';

import styles from './MuiStyle.css';

class MuiSchemaForm extends React.Component {

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
                result = <MuiNumber model={model} form={form} key={index} onChange={onChange} />;
                break;
            case 'text':
                result = <MuiText model={model} form={form} key={index} onChange={onChange} className={styles.muiSchemaForm}/>;
                break;
            case 'textarea':
                result = <MuiTextArea model={model} form={form} key={index} onChange={onChange} />;
                break;
            case 'select':
                result = <MuiSelect model={model} form={form} key={index} onChange={onChange} />;
                break;
            case 'radios':
                result = <MuiRadios model={model} form={form} key={index} onChange={onChange} />;
                break;
            case 'date':
                result = <MuiDate model={model} form={form} key={index} onChange={onChange} />;
                break;
        }
        return result;
    }

    render() {
        let merged = utils.merge(this.props.schema, this.props.form, this.props.ignore, this.props.option);
        //console.log('SchemaForm merged = ', JSON.stringify(merged, undefined, 2));
        //console.log('SchemaForm render merged ', merged);
        let forms = merged.map(function(form, index) {
            return MuiSchemaForm.renderSchema(form, this.props.model, form.key[0], this.onChange);
        }.bind(this));

        return (
            <div style={{width: '100%'}} className={styles.muiSchemaForm}>{forms}</div>
        );
    }
}

module.exports = MuiSchemaForm;
