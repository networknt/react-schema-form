/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import TextField from 'material-ui/TextField';

class Text extends React.Component {
    render() {
        //console.log('Text props', this.props.form.readonly);
        return (
            <div className={this.props.form.htmlClass}>
                <TextField
                    type={this.props.form.type}
                    floatingLabelText={this.props.form.title}
                    hintText={this.props.form.placeholder}
                    errorText={this.props.error}
                    onChange={this.props.onChangeValidate}
                    value={this.props.value}
                    disabled={this.props.form.readonly}
                    style={this.props.form.style || {width: '100%'}} />
            </div>
        );
    }
}

export default ComposedComponent(Text);
