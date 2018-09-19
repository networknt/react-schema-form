import React from 'react';
import ComposedComponent from './ComposedComponent';
import TextField from 'material-ui/TextField';

class Text extends React.Component {

    constructor(props) {
        super(props);
        const {model, form, value} = this.props;
        const {key} = form;

        this.props.setDefault(key, model, form, value)
    }

    render() {
        return (
            <div className={this.props.form.htmlClass}>
                <TextField
                    type={this.props.form.type}
                    floatingLabelText={this.props.form.title}
                    hintText={this.props.form.placeholder}
                    errorText={this.props.error || this.props.errorText}
                    onChange={this.props.onChangeValidate}
                    defaultValue={this.props.value}
                    disabled={this.props.form.readonly}
                    style={this.props.form.style || {width: '100%'}} />
            </div>
        );
    }
}

export default ComposedComponent(Text);
