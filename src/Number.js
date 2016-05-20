/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import TextField from 'material-ui/TextField';

/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */
class Number extends React.Component {

    constructor(props) {
        super(props);
        this.preValidationCheck = this.preValidationCheck.bind(this);
        this.state = {
            lastSuccessfulValue : this.props.value
        }
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        lastSuccessfulValue: nextProps.value
      });
    }

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    /**
     * Prevent the field from accepting non-numeric characters.
     * @param e
     */
    preValidationCheck(e) {
        if (this.isNumeric(e.target.value)) {
            this.setState({
                lastSuccessfulValue: e.target.value
            });
            this.props.onChangeValidate(e);
        } else {
                this.refs.numberField.value = this.state.lastSuccessfulValue;
        }
    }

    render() {
        return (
            <div className={this.props.form.htmlClass}>
                <TextField
                    type={this.props.form.type}
                    floatingLabelText={this.props.form.title}
                    hintText={this.props.form.placeholder}
                    errorText={this.props.error}
                    onChange={this.preValidationCheck}
                    value={this.state.lastSuccessfulValue}
                    ref="numberField"
                    disabled={this.props.form.readonly}
                    style={this.props.form.style || {width: '100%'}}/>
            </div>
        );
    }
}

export default ComposedComponent(Number);
