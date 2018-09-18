/**
 * Created by steve on 20/09/15.
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class FormCheckbox extends React.Component {

    handleChange = e => {
        this.props.onChangeValidate(e);
    };

    render() {
        // let value = selectOrSet(this.props.form.key, this.props.model);
        return (
            <FormGroup row={true}>
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
            </FormGroup>
        );
    }
}

export default ComposedComponent(FormCheckbox);
