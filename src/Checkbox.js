/**
 * Created by steve on 20/09/15.
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class FormCheckbox extends React.Component {

    handleChange = e => {
        this.props.onChangeValidate(e);
    };

    render() {
        return (
            <FormControlLabel
                className={this.props.form.className}
                label={this.props.form.title}
                control={
                    <Checkbox
                    name={this.props.form.key.slice(-1)[0]}
                    value={this.props.form.key.slice(-1)[0]}
                    checked={this.props.value || false}
                    disabled={this.props.form.readonly}
                    onChange={this.handleChange}
                    />      
                }
            />
        );
    }
}

export default ComposedComponent(FormCheckbox);
