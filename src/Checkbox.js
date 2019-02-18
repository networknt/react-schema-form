// @flow
/**
 * Created by steve on 20/09/15.
 */
import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ComposedComponent from "./ComposedComponent";
import type { Localization } from "./types";

type Props = {
    onChangeValidate: any,
    form: any,
    value: any,
    localization: Localization
};

const FormCheckbox = ({
    form,
    value,
    localization: { getLocalizedString },
    onChangeValidate
}: Props) => (
    <FormGroup row>
        <FormControlLabel
            className={form.className}
            label={form.title && getLocalizedString(form.title)}
            control={
                <Checkbox
                    name={form.key.slice(-1)[0]}
                    value={form.key.slice(-1)[0]}
                    checked={value || false}
                    disabled={form.readonly}
                    onChange={onChangeValidate}
                />
            }
            {...form.otherProps}
        />
    </FormGroup>
);

export default ComposedComponent(FormCheckbox);
