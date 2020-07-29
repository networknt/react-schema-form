// @flow
/**
 * Created by steve on 20/09/15.
 */
import React from "react";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ComposedComponent from "./ComposedComponent";

function FormCheckbox(props) {
    const {
        model,
        form,
        value,
        setDefault,
        localization: { getLocalizedString },
        onChangeValidate
    } = props;
    const { key } = form;
    setDefault(key, model, form, value);
    return (
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
}

FormCheckbox.propTypes = {
    model: PropTypes.objectOf(PropTypes.object).isRequired,
    form: PropTypes.objectOf(PropTypes.object).isRequired,
    setDefault: PropTypes.func.isRequired,
    value: PropTypes.bool.isRequired,
    localization: PropTypes.objectOf(PropTypes.object).isRequired,
    getLocalizedString: PropTypes.func.isRequired,
    onChangeValidate: PropTypes.func.isRequired
};

export default ComposedComponent(FormCheckbox);
