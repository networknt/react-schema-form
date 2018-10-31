/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import TextField from '@material-ui/core/TextField';

/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */
class Number extends React.Component {

    constructor(props) {
        super(props);
        this.preValidationCheck = this.preValidationCheck.bind(this);
        this.state = {
            lastSuccessfulValue: this.props.value
        };
        this.numberField = React.createRef();
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            lastSuccessfulValue: nextProps.value,
        };
    }

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    isEmpty(n) {
        return (!n || 0 === n.length);
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
        } else if (this.isEmpty(e.target.value)) {
            this.setState({
                lastSuccessfulValue: e.target.value
            });
            this.props.onChangeValidate(e);
        } else {
            this.numberField.current.value = this.state.lastSuccessfulValue;
        }
    }

    render() {
        let { form, error} = this.props
        return (
            <TextField
                type={form.type}
                label={form.title}
                placeholder={form.placeholder}
                helperText={error || form.description}
                error={!!error}
                onChange={this.preValidationCheck}
                value={this.state.lastSuccessfulValue}
                ref={this.numberField}
                disabled={form.readonly}
                fullWidth
            />
        );
    }
}

export default ComposedComponent(Number);
