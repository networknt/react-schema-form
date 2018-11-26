// @flow
/**
 * Created by steve on 15/09/15.
 */
import React from "react";
import TextField from "@material-ui/core/TextField";
import ComposedComponent from "./ComposedComponent";

type Props = {
    form: any,
    model: any,
    value: any,
    setDefault: any,
    error: any,
    onChangeValidate: any
};

class Text extends React.Component<Props> {
    constructor(props) {
        super(props);
        const { model, form, value, setDefault } = this.props;
        const { key } = form;
        setDefault(key, model, form, value);
    }

    render() {
        const { form, error, value, onChangeValidate } = this.props;
        return (
            <TextField
                type={form.type}
                label={form.title}
                placeholder={form.placeholder}
                helperText={error || form.description}
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
