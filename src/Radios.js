// @flow
import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import { withStyles } from "@material-ui/core/styles";
import ComposedComponent from "./ComposedComponent";
import type { Localization } from "./types";

const styles = theme => ({
    formControl: {
        marginTop: theme.spacing(1)
    },
    group: {
        margin: theme.spacing(1, 0)
    }
});

type Props = {
    classes: any,
    form: any,
    value: any,
    onChangeValidate: any,
    localization: Localization
};

class Radios extends Component<Props> {
    renderItems = form => {
        const {
            localization: { getLocalizedString }
        } = this.props;
        return form.titleMap.map((item, index) => (
            <FormControlLabel
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                control={<Radio />}
                label={item.name && getLocalizedString(item.name)}
                value={item.value}
                disabled={form.readonly}
            />
        ));
    };

    render() {
        const {
            classes,
            form,
            value,
            onChangeValidate,
            localization: { getLocalizedString }
        } = this.props;
        return (
            <FormControl
                component="fieldset"
                className={classes.formControl}
                {...form.otherProps}
            >
                <FormLabel component="legend" required={form.required}>
                    {form.title && getLocalizedString(form.title)}
                </FormLabel>
                <RadioGroup
                    value={value}
                    name={form.title}
                    onChange={onChangeValidate}
                    className={classes.group}
                >
                    {this.renderItems(form)}
                </RadioGroup>
            </FormControl>
        );
    }
}

export default ComposedComponent(withStyles(styles)(Radios));
