// @flow
/**
 * Created by steve on 15/09/15.
 */
import React from "react";
import TextField from "@material-ui/core/TextField";
import ComposedComponent from "./ComposedComponent";
import type { Localization } from "./types";

type Props = {
    form: any,
    value: any,
    error: any,
    onChangeValidate: any,
    localization: Localization
};

const TextArea = ({
    form,
    value,
    error,
    onChangeValidate,
    localization: { getLocalizedString }
}: Props) => (
    <TextField
        type={form.type}
        label={getLocalizedString(form.title)}
        placeholder={getLocalizedString(form.placeholder)}
        helperText={getLocalizedString(error || form.description)}
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
