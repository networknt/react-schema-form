/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import TextField from '@material-ui/core/TextField';

class Text extends React.Component {

    constructor(props) {
        super(props);
        const {model, form, value} = this.props;
        const {key} = form;
        this.props.setDefault(key, model, form, value)
    }

    render() {
        let { form, error, value, onChangeValidate } = this.props
        return (
            <TextField
                type={form.type}
                label={form.title}
                placeholder={form.placeholder}
                helperText={error || form.description }
                error={!!error}
                onChange={onChangeValidate}
                value={value}
                disabled={form.readonly}
                fullWidth
            />
        );
    }
}

export default ComposedComponent(Text);
