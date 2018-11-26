// @flow
/**
 * Created by steve on 11/09/15.
 */
import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit
    },
    fields: {
        marginLeft: theme.spacing.unit
    }
});

type Props = {
    form: any,
    mapper: any,
    builder: any,
    model: any,
    onChange: any,
    classes: any
};

const FieldSet = ({
    form,
    mapper,
    builder,
    model,
    onChange,
    classes
}: Props) => {
    const forms = form.items.map((f, index) =>
        builder(f, model, index, mapper, onChange, builder)
    );

    return (
        <FormControl component="fieldset" className={classes.root}>
            <FormLabel component="legend">{form.title}</FormLabel>
            <div className={classes.fields}>{forms}</div>
        </FormControl>
    );
};

export default withStyles(styles)(FieldSet);
