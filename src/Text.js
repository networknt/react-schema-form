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
    localization: Localization
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
            localization: { getLocalizedString }
        } = this.props;
        return (
            <TextField
                type={form.type}
                label={getLocalizedString(form.title)}
                placeholder={getLocalizedString(form.placeholder)}
                helperText={getLocalizedString(error || form.description)}
                error={!!error}
                onChange={onChangeValidate}
                value={value || ""}
                disabled={form.readonly}
                fullWidth
            />
        );
    }
}

export default ComposedComponent(Text);
