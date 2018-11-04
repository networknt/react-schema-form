import React from "react";
import utils from "./utils";

const defaultValue = props => {
    // check if there is a value in the model, if there is, display it. Otherwise, check if
    // there is a default value, display it.
    let value;
    if (props.form && props.form.key)
        value = utils.selectOrSet(props.form.key, props.model);

    // check if there is a default value
    if (value === null || value === undefined) {
        if (props.form.default) {
            value = props.form.default;
        } else if (props.form.schema && props.form.schema.default) {
            value = props.form.schema.default;
        }
    }
    return value;
};

export default (ComposedComponent, defaultProps = {}) =>
    class Composed extends React.Component {
        constructor(props) {
            super(props);
            const { errorText, form } = this.props;
            this.onChangeValidate = this.onChangeValidate.bind(this);
            const value = defaultValue(this.props);
            const validationResult = utils.validate(form, value);
            this.state = {
                value,
                valid: !!(validationResult.valid || !value),
                error:
                    (!validationResult.valid &&
                        (value ? validationResult.error.message : null)) ||
                    errorText
            };
        }

        static getDerivedStateFromProps(nextProps) {
            const value = defaultValue(nextProps);
            const validationResult = utils.validate(nextProps.form, value);
            return {
                value,
                valid: !!(validationResult.valid || !value),
                error:
                    !validationResult.valid && value
                        ? validationResult.error.message
                        : null
            };
        }

        /**
         * Called when <input> value changes.
         * @param e The input element, or something.
         */
        onChangeValidate(e, v) {
            const { form, onChange } = this.props;
            let value = null;
            switch (form.schema.type) {
                case "integer":
                case "number":
                    if (e.target.value.indexOf(".") === -1) {
                        value = parseInt(e.target.value, 10);
                    } else {
                        value = parseFloat(e.target.value);
                    }

                    if (Number.isNaN(value)) {
                        value = undefined;
                    }
                    break;
                case "boolean":
                    value = e.target.checked;
                    break;
                case "tBoolean":
                    if (e.target.value !== "yes" || e.target.value !== "no") {
                        value = v;
                    }
                    break;

                case "array":
                    value = e;
                    break;
                case "object":
                default:
                    ({ value } = e.target);
            }

            const validationResult = utils.validate(form, value);
            this.setState({
                value,
                valid: validationResult.valid,
                error: validationResult.valid
                    ? null
                    : validationResult.error.message
            });

            onChange(form.key, value);
        }

        render() {
            return (
                <ComposedComponent
                    {...defaultProps}
                    {...this.props}
                    {...this.state}
                    onChangeValidate={this.onChangeValidate}
                />
            );
        }
    };
