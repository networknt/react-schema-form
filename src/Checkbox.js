// @flow
/**
 * Created by steve on 20/09/15.
 */
import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ComposedComponent from "./ComposedComponent";

type Props = {
    onChangeValidate: any,
    form: any,
    value: any
};

class FormCheckbox extends Component<Props> {
    handleChange = e => {
        const { onChangeValidate } = this.props;
        onChangeValidate(e);
    };

    render() {
        const { form, value } = this.props;
        return (
            <FormGroup row>
                <FormControlLabel
                    className={form.className}
                    label={form.title}
                    control={
                        <Checkbox
                            name={form.key.slice(-1)[0]}
                            value={form.key.slice(-1)[0]}
                            checked={value || false}
                            disabled={form.readonly}
                            onChange={e => this.handleChange(e)}
                        />
                    }
                />
            </FormGroup>
        );
    }
}

export default ComposedComponent(FormCheckbox);
