// @flow
/*
Native date field. 
Contains common logic for final components Date and DateTime.
*/
import React from "react";
import TextField from "@material-ui/core/TextField";

type Props = {
    onChangeValidate: any,
    form: any,
    value: any,
    type: any
};

const NativeDateField = ({ form, value, type, onChangeValidate }: Props) => (
    <TextField
        label={form.title}
        type={type}
        value={
            (value &&
                typeof value === "object" &&
                value.toISOString().slice(0, 10)) ||
            ""
        }
        InputLabelProps={{ shrink: true }}
        onChange={onChangeValidate}
        disabled={form.readonly}
    />
);

export default NativeDateField;
