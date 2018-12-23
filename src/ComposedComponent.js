// @flow
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
            const { errorText, form, showError } = this.props;
            this.onChangeValidate = this.onChangeValidate.bind(this);
            const value = defaultValue(this.props);
            const validationResult = utils.validate(form, value);
            if (!showError) {
                this.state = {
                    value,
                    valid: true,
                    error: ""
                };
            } else {
                this.state = {
                    value,
                    valid: !!(validationResult.valid || !value),
                    error:
                        (!validationResult.valid &&
                            (value ? validationResult.error.message : null)) ||
                        errorText
                };
            }
        }

        static getDerivedStateFromProps(nextProps) {
            const value = defaultValue(nextProps);
            const { showError } = nextProps;
            const validationResult = utils.validate(nextProps.form, value);
            if (!showError) {
                return {
                    value,
                    valid: true,
                    error: ""
                };
            }
            return {
                value,
                valid: validationResult.valid,
                error: !validationResult.valid
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
                    value = parseInt(e.target.value, 10);
                    break;
                case "number": {
                    const values = e.target.value.split(".");
                    if (values.length < 2) {
                        value = parseInt(e.target.value, 10);
                    } else if (values.length > 1) {
                        if (values[1].length > 0)
                            value = parseFloat(e.target.value);
                        else value = `${parseInt(values[0], 10)}.`;
                    }
                    break;
                }
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
                    if (form.type === "date") {
                        if (e.target.value.length > 0) {
                            value = new Date(e.target.value);
                        } else {
                            value = "";
                        }
                        break;
                    }
                    ({ value } = e.target);
                    break;
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
