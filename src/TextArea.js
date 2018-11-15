// @flow
/**
 * Created by steve on 15/09/15.
 */
import React from "react";
import TextField from "@material-ui/core/TextField";
import ComposedComponent from "./ComposedComponent";

type Props = {
    form: any,
    value: any,
    error: any,
    onChangeValidate: any
};

const TextArea = ({ form, value, error, onChangeValidate }: Props) => (
    <TextField
        type={form.type}
        label={form.title}
        placeholder={form.placeholder}
        helperText={error || form.description}
        onChange={onChangeValidate}
        error={!!error}
        value={value}
        multiline
        rows={form.rows}
        rowsMax={form.rowsMax}
        disabled={form.readonly}
        fullWidth
    />
);

export default ComposedComponent(TextArea);
