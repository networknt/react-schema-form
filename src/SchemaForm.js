// @flow
/**
 * Created by steve on 11/09/15.
 */
import React, { Component } from "react";
import merge from "lodash/merge";
import isNil from "lodash/isNil";
import utils from "./utils";
import Number from "./Number";
import Text from "./Text";
import TextArea from "./TextArea";
import TextSuggest from "./TextSuggest";
import Select from "./Select";
import MultiSelect from "./MultiSelect";
import Radios from "./Radios";
import Date from "./Date";
import Checkbox from "./Checkbox";
import Help from "./Help";
import Array from "./Array";
import FieldSet from "./FieldSet";
import TripleBoolean from "./TripleBoolean";

type Props = {
    onModelChange: any,
    errors: any,
    schema: any,
    form: any,
    ignore: any,
    option: any,
    model: any,
    className: any,
    mapper: any
};

class SchemaForm extends Component<Props> {
    mapper = {
        number: Number,
        text: Text,
        password: Text,
        textarea: TextArea,
        textsuggest: TextSuggest,
        select: Select,
        radios: Radios,
        date: Date,
        checkbox: Checkbox,
        help: Help,
        array: Array,
        tBoolean: TripleBoolean,
        fieldset: FieldSet,
        multiselect: MultiSelect
    };

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.builder = this.builder.bind(this);
    }

    onChange(key, val) {
        const { onModelChange } = this.props;
        onModelChange(key, val);
    }

    // Assign default values and save it to the model
    setDefault = (key, model, form, value) => {
        const { onModelChange } = this.props;
        const currentValue = utils.selectOrSet(key, model);

        // If current value is not setted and exist a default, apply the default over the model
        if (isNil(currentValue) && !isNil(value))
            onModelChange(key, value, form.type, form);
    };

    builder(form, model, index, mapper, onChange, builder) {
        const { errors } = this.props;
        const Field = this.mapper[form.type];
        if (!Field) {
            return null;
        }

        // Apply conditionals to review if this field must be rendered
        if (
            form.condition &&
            utils.safeEval(form.condition, { model }) === false
        ) {
            return null;
        }

        const key = (form.key && form.key.join(".")) || index;

        const error = key in errors ? errors[key] : null;

        return (
            <Field
                model={model}
                form={form}
                key={key}
                onChange={onChange}
                setDefault={this.setDefault}
                mapper={mapper}
                builder={builder}
                errorText={error}
            />
        );
    }

    render() {
        const {
            schema,
            form,
            ignore,
            option,
            model,
            className,
            mapper
        } = this.props;
        const merged = utils.merge(schema, form, ignore, option);

        let mergedMapper = this.mapper;
        if (mapper) {
            mergedMapper = merge(this.mapper, mapper);
        }
        const forms = merged.map((formPart, index) =>
            this.builder(
                formPart,
                model,
                index,
                mergedMapper,
                this.onChange,
                this.builder
            )
        );

        return <div className={className}>{forms}</div>;
    }
}

export default SchemaForm;
