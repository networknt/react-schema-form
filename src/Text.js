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
    model: any,
    value: any,
    setDefault: any,
    error: any,
    onChangeValidate: any,
    localization: Localization,
    otherProps?: any
};

class Text extends React.Component<Props> {
    constructor(props) {
        super(props);
        const { model, form, value, setDefault } = this.props;
        const { key } = form;
        setDefault(key, model, form, value);
    }

    render() {
        const {
            form,
            error,
            value,
            onChangeValidate,
            localization: { getLocalizedString },
            otherProps
        } = this.props;
        return (
            <TextField
                type={form.type}
                label={form.title && getLocalizedString(form.title)}
                placeholder={
                    form.placeholder && getLocalizedString(form.placeholder)
                }
                helperText={
                    (error || form.description) &&
                    getLocalizedString(error || form.description)
                }
                error={!!error}
                onChange={onChangeValidate}
                value={value || ""}
                disabled={form.readonly}
                fullWidth
                required={form.required}
                style={form.style}
                {...otherProps}
                {...form.otherProps}
            />
        );
    }
}

Text.defaultProps = {
    otherProps: undefined
};

export default ComposedComponent(Text);
