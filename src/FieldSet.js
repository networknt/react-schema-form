/**
 * Created by steve on 11/09/15.
 */
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class FieldSet extends React.Component {

    render() {
        //console.log('FieldSet.render', this.props);
        let {form, mapper, builder, model, onChange} = this.props
        // now render all the items in the fieldset
        let forms = form.items.map(
            (f, index) => builder(f, model, index, onChange, mapper, builder)
        );

        return (
            <FormControl component="fieldset">
                <FormLabel component="legend">{form.title}</FormLabel>
                <div>
                    {forms}
                </div>
            </FormControl>
        )
    }
}

export default FieldSet;
