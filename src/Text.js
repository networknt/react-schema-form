/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import TextField from '@material-ui/core/TextField';

class Text extends React.Component {
    render() {
        let { form, value, error, onChangeValidate } = this.props

        return (
            <TextField
                type={form.type}
                label={form.title}
                placeholder={form.placeholder}
                helperText={error || form.description }
                error={!!error}
                onChange={onChangeValidate}
                defaultValue={value}
                disabled={form.readonly}
            />
        );
    }
}

export default ComposedComponent(Text);
