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

type Props = {
    errorText: any,
    form: any,
    showErrors: boolean,
    localization: any,
    onChange: any
};

const getDisplayName = WrappedComponent =>
    WrappedComponent.displayName || WrappedComponent.name || "Component";

export default (ComposedComponent, defaultProps = {}) =>
    class Composed extends React.Component<Props> {
        constructor(props) {
            super(props);
            this.displayName = `ComposedComponent(${getDisplayName(
                ComposedComponent
            )})`;
            this.onChangeValidate = this.onChangeValidate.bind(this);
            this.state = this.constructor.getDerivedStateFromProps(this.props);
        }

        static getDerivedStateFromProps(nextProps: Props) {
            const { errorText, form, showErrors, localization } = nextProps;
            const getLocalizedString =
                localization && localization.getLocalizedString;
            const value = defaultValue(nextProps);
            if (!showErrors) {
                return {
                    value,
                    valid: true,
                    error: ""
                };
            }

            const validationResult = utils.validate(
                form,
                value || undefined,
                getLocalizedString
            );

            const error = !validationResult.valid
                ? validationResult.error
                : undefined;

            return {
                value,
                valid: validationResult.valid,
                error:
                    (!validationResult.valid ? error.message : null) ||
                    errorText
            };
        }

        /**
         * Called when <input> value changes.
         * @param e The input element, or something.
         */
        onChangeValidate(e, v) {
            const { form, onChange, localization } = this.props; // eslint-disable-line
            const getLocalizedString =
                localization && localization.getLocalizedString;
            let value = null;
            const type = form.schema ? form.schema.type : form.type;
            switch (type) {
                case "integer":
                case "number": {
                    value = e;
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

            const validationResult = utils.validate(
                form,
                value,
                getLocalizedString
            );
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
