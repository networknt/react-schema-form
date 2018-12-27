// @flow
/**
 * Created by steve on 15/09/15.
 */
import React from "react";
import ComposedComponent from "./ComposedComponent";
import type { Localization } from "./types";
import Text from "./Text";

type Props = {
    form: any,
    value: any,
    error: any,
    onChangeValidate: any,
    localization: Localization
};

const TextArea = (props: Props) => {
    const { form } = props;
    return (
        <Text
            {...props}
            otherProps={{
                multiline: true,
                rows: form.rows,
                rowsMax: form.rowsMax
            }}
        />
    );
};

export default ComposedComponent(TextArea);
