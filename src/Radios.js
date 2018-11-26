// @flow
import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import { withStyles } from "@material-ui/core/styles";
import ComposedComponent from "./ComposedComponent";

const styles = theme => ({
    formControl: {
        marginTop: theme.spacing.unit
    },
    group: {
        margin: `${theme.spacing.unit}px 0`
    }
});

type Props = {
    classes: any,
    form: any,
    value: any,
    onChangeValidate: any
};

class Radios extends Component<Props> {
    renderItems = form =>
        form.titleMap.map((item, index) => (
            <FormControlLabel
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                control={<Radio />}
                label={item.name}
                value={item.value}
                disabled={form.readonly}
            />
        ));

    render() {
        const { classes, form, value, onChangeValidate } = this.props;
        return (
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">{form.title}</FormLabel>
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
