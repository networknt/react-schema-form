// @flow
/*
Native date field. 
Contains common logic for final components Date and DateTime.
*/
import React from "react";
import type { Localization } from "./types";
import Text from "./Text";

type Props = {
    onChangeValidate: any,
    form: any,
    value: any,
    type: any,
    localization: Localization
};

const NativeDateField = (props: Props) => {
    const {
        value,
        localization: { getLocalizedDate },
        form,
        type
    } = props;
    return (
        <Text
            {...props}
            form={{ ...form, type }}
            value={getLocalizedDate(value)}
            otherProps={{ InputLabelProps: { shrink: true } }}
            {...form.otherProps}
        />
    );
};

export default NativeDateField;
