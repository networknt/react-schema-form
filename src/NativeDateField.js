// @flow
/*
Native date field. 
Contains common logic for final components Date and DateTime.
*/
import React from "react";
import TextField from "@material-ui/core/TextField";
import type { Localization } from "./types";

type Props = {
    onChangeValidate: any,
    form: any,
    value: any,
    type: any,
    localization: Localization
};

const NativeDateField = ({
    form,
    value,
    type,
    onChangeValidate,
    localization: { getLocalizedString, getLocalizedDate }
}: Props) => (
    <TextField
        label={getLocalizedString(form.title)}
        type={type}
        value={getLocalizedDate(value)}
        InputLabelProps={{ shrink: true }}
        onChange={onChangeValidate}
        disabled={form.readonly}
    />
);
export default NativeDateField;
