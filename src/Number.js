// @flow
/**
 * Created by steve on 15/09/15.
 */
import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import ComposedComponent from "./ComposedComponent";

type Props = {
    value: any,
    onChangeValidate: any,
    form: any,
    error: any
};

/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */
const NumberComponent = ({ form, error, onChangeValidate, value }: Props) => (
    <FormControl fullWidth error={!!error}>
        <InputLabel htmlFor={`input-${form.key[0]}`} required={form.required}>
            {form.title}
        </InputLabel>
        <Input
            id={`input-${form.key[0]}`}
            type="string"
            placeholder={form.placeholder}
            onChange={onChangeValidate}
            value={value || value === 0 ? value : ""}
            disabled={form.readonly}
        />
        {Boolean(error || form.description) && (
            <FormHelperText>{error || form.description}</FormHelperText>
        )}
    </FormControl>
);

export default ComposedComponent(NumberComponent);
