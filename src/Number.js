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
import type { Localization } from "./types";

type Props = {
    value: any,
    onChangeValidate: any,
    form: {
        key: string,
        required: boolean,
        placeholder: string,
        readonly: boolean,
        description: string,
        useLocalizer: boolean
    },
    error: any,
    localization: Localization
};

/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */
const NumberComponent = ({
    form,
    error,
    onChangeValidate,
    value,
    localization: { getLocalizedString, getLocalizedNumber }
}: Props) => {
    let inputValue = value || value === 0 ? value : "";
    if (form.useLocalizer) inputValue = getLocalizedNumber(inputValue);

    return (
        <FormControl fullWidth error={!!error}>
            <InputLabel
                htmlFor={`input-${form.key[0]}`}
                required={form.required}
            >
                {getLocalizedString(form.title)}
            </InputLabel>
            <Input
                id={`input-${form.key[0]}`}
                type="string"
                placeholder={getLocalizedString(form.placeholder)}
                onChange={onChangeValidate}
                value={inputValue}
                disabled={form.readonly}
            />
            {Boolean(error || form.description) && (
                <FormHelperText>
                    {getLocalizedString(error || form.description)}
                </FormHelperText>
            )}
        </FormControl>
    );
};

export default ComposedComponent(NumberComponent);
