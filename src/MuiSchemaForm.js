/**
 * Created by steve on 11/09/15.
 */
import React from 'react';
import utils from './utils';
import Number from './material-ui/MuiNumber';
import Text from './material-ui/MuiText';
import TextArea from './material-ui/MuiTextArea';

class MuiSchemaForm extends React.Component {

    constructor(props) {
        console.log("MuiSchemaForm - constructor - props", props);
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(key, val) {
        this.props.onModelChange(key, val);
    }

    renderSchema (form, model, index, onChange) {
        var result;
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
        }
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

module.exports = MuiSchemaForm;
