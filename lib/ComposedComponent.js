"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultValue = function defaultValue(props) {
    // check if there is a value in the model, if there is, display it. Otherwise, check if
    // there is a default value, display it.
    var value = void 0;
    if (props.form && props.form.key) value = _utils2.default.selectOrSet(props.form.key, props.model);

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

var getDisplayName = function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

exports.default = function (ComposedComponent) {
    var defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return function (_React$Component) {
        _inherits(Composed, _React$Component);

        function Composed(props) {
            _classCallCheck(this, Composed);

            var _this = _possibleConstructorReturn(this, (Composed.__proto__ || Object.getPrototypeOf(Composed)).call(this, props));

            _this.displayName = "ComposedComponent(" + getDisplayName(ComposedComponent) + ")";

            _this.onChangeValidate = _this.onChangeValidate.bind(_this);
            _this.state = _this.constructor.getDerivedStateFromProps(_this.props);
            return _this;
        }

        _createClass(Composed, [{
            key: "onChangeValidate",


            /**
             * Called when <input> value changes.
             * @param e The input element, or something.
             */
            value: function onChangeValidate(e, v) {
                var _props = this.props,
                    form = _props.form,
                    onChange = _props.onChange,
                    localization = _props.localization; // eslint-disable-line

                var getLocalizedString = localization && localization.getLocalizedString;
                var value = null;
                var type = form.schema ? form.schema.type : form.type;
                switch (type) {
                    case "integer":
                    case "number":
                        {
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
                        value = e.target.value;

                        break;
                    default:
                        value = e.target.value;

                }

                var validationResult = _utils2.default.validate(form, value, getLocalizedString);
                this.setState({
                    value: value,
                    valid: validationResult.valid,
                    error: validationResult.valid ? null : validationResult.error.message
                });

                onChange(form.key, value);
            }
        }, {
            key: "render",
            value: function render() {
                return _react2.default.createElement(ComposedComponent, _extends({}, defaultProps, this.props, this.state, {
                    onChangeValidate: this.onChangeValidate
                }));
            }
        }], [{
            key: "getDerivedStateFromProps",
            value: function getDerivedStateFromProps(nextProps) {
                var errorText = nextProps.errorText,
                    form = nextProps.form,
                    showErrors = nextProps.showErrors,
                    localization = nextProps.localization;

                var getLocalizedString = localization && localization.getLocalizedString;
                var value = defaultValue(nextProps);
                if (!showErrors) {
                    return {
                        value: value,
                        valid: true,
                        error: ""
                    };
                }

                var validationResult = _utils2.default.validate(form, value || undefined, getLocalizedString);

                var error = !validationResult.valid ? validationResult.error : undefined;

                return {
                    value: value,
                    valid: validationResult.valid,
                    error: (!validationResult.valid ? error.message : null) || errorText
                };
            }
        }]);

        return Composed;
    }(_react2.default.Component);
};