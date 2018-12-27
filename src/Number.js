// @flow
/**
 * Created by steve on 15/09/15.
 */
import React from "react";
import ComposedComponent from "./ComposedComponent";
import type { Localization } from "./types";
import Text from "./Text";

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
const NumberComponent = (props: Props) => {
    const {
        form,
        value,
        localization: { getLocalizedNumber }
    } = props;
    let inputValue = value || value === 0 ? value : "";
    if (form.useLocalizer) inputValue = getLocalizedNumber(inputValue);

    return (
        <Text
            {...props}
            form={Object.assign({}, form, { type: "string" })}
            value={inputValue}
        />
    );
};

export default ComposedComponent(NumberComponent);
