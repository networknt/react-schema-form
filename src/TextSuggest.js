/**
 * Created by XaviTorello on 30/05/18
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import TextField from 'material-ui/TextField';

class TextSuggest extends React.Component {
    render() {
        console.log('TextSuggest', this.props.form);
        return (
            <div className={this.props.form.htmlClass}>
                <TextField
                    type={this.props.form.type}
                    floatingLabelText={this.props.form.title}
                    hintText={this.props.form.placeholder}
                    errorText={this.props.error}
                    onChange={this.props.onChangeValidate}
                    defaultValue={this.props.value}
                    disabled={this.props.form.readonly}
                    autoComplete={this.props.form.autoComplete}
                    style={this.props.form.style || {width: '100%'}}
                />
            </div>
        );
    }
}

export default ComposedComponent(TextSuggest);
