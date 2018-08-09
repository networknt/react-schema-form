/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import TextField from '@material-ui/core/TextField';

class TextArea extends React.Component {

    render() {
        let { form, value, error, onChangeValidate } = this.props
        // FIXME: Obviously fix rowsMax eventually..
        return (
            <TextField
                type={form.type}
                label={form.title}
                helperText={error || form.placeholder}
                onChange={onChangeValidate}
                error={!!error}
                defaultValue={value}
                multiline
                rows={form.rows }
                rowsMax={form.rowsMax }
                disabled={form.readonly}
            />
        );
    }
}

export default ComposedComponent(TextArea);
