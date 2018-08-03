/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import TextField from '@material-ui/core/TextField';

class Text extends React.Component {
    render() {
        //console.log('Text props', this.props.form.readonly);
        return (
            <div className={this.props.form.htmlClass}>
                <TextField
                    type={this.props.form.type}
                    label={this.props.form.title}
                    helperText={this.props.form.placeholder}
                    onChange={this.props.onChangeValidate}
                    defaultValue={this.props.value}
                    disabled={this.props.form.readonly}
                 />
            </div>
        );
    }
}

export default ComposedComponent(Text);
