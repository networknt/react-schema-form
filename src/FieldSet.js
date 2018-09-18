/**
 * Created by steve on 11/09/15.
 */
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      marginTop: theme.spacing.unit
    },
    fields: {
        marginLeft: theme.spacing.unit
    }
  });

class FieldSet extends React.Component {

    render() {
        //console.log('FieldSet.render', this.props);
        let {form, mapper, builder, model, onChange, classes} = this.props
        // now render all the items in the fieldset
        let forms = form.items.map(
            (f, index) => builder(f, model, index, mapper, onChange, builder)
        );

        return (
            <FormControl component="fieldset" className={classes.root}>
                <FormLabel component="legend">{form.title}</FormLabel>
                <div className={classes.fields}>
                    {forms}
                </div>
            </FormControl>
        )
    }
}

export default withStyles(styles)(FieldSet);
