"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _MenuItem = require("@material-ui/core/MenuItem");

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Select = require("@material-ui/core/Select");

var _Select2 = _interopRequireDefault(_Select);

var _InputLabel = require("@material-ui/core/InputLabel");

var _InputLabel2 = _interopRequireDefault(_InputLabel);

var _FormControl = require("@material-ui/core/FormControl");

var _FormControl2 = _interopRequireDefault(_FormControl);

var _FormHelperText = require("@material-ui/core/FormHelperText");

var _FormHelperText2 = _interopRequireDefault(_FormHelperText);

var _ComposedComponent = require("./ComposedComponent");

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Select = function (_Component) {
    _inherits(Select, _Component);

    function Select(props) {
        _classCallCheck(this, Select);

        var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

        _this.onSelected = function (event) {
            var _this$props = _this.props,
                onChangeValidate = _this$props.onChangeValidate,
                onChange = _this$props.onChange,
                _this$props$form = _this$props.form,
                key = _this$props$form.key,
                _this$props$form$sche = _this$props$form.schema,
                isObject = _this$props$form$sche.isObject,
                values = _this$props$form$sche.enum,
                findFn = _this$props$form$sche.findFn;

            var currentValue = event.target.value;
            _this.setState({ currentValue: currentValue });
            if (isObject) {
                var item = values.find(function (each) {
                    return findFn ? findFn(each, currentValue) : each === currentValue;
                });
                onChange(key, item);
            } else {
                onChangeValidate(event);
            }
        };

        _this.getLabel = function (each) {
            var _this$props2 = _this.props,
                _this$props2$form$sch = _this$props2.form.schema,
                displayFn = _this$props2$form$sch.displayFn,
                noLocalization = _this$props2$form$sch.noLocalization,
                getLocalizedString = _this$props2.localization.getLocalizedString;

            if (displayFn) {
                return displayFn(each);
            }
            if (noLocalization) return each.name;
            return getLocalizedString(each.name);
        };

        var _this$props3 = _this.props,
            model = _this$props3.model,
            form = _this$props3.form;

        _this.state = {
            currentValue: _utils2.default.getValueFromModel(model, form.key) || ""
        };
        return _this;
    }

    _createClass(Select, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                form = _props.form,
                error = _props.error,
                getLocalizedString = _props.localization.getLocalizedString;
            var currentValue = this.state.currentValue;

            var menuItems = [];
            if (form.schema.isObject) {
                menuItems = form.schema.enum.map(function (item, idx) {
                    return (
                        // eslint-disable-next-line react/no-array-index-key
                        _react2.default.createElement(
                            _MenuItem2.default,
                            { key: idx, value: item },
                            _this2.getLabel(item)
                        )
                    );
                });
            } else {
                menuItems = form.titleMap.map(function (item, idx) {
                    return (
                        // eslint-disable-next-line react/no-array-index-key
                        _react2.default.createElement(
                            _MenuItem2.default,
                            { key: idx, value: item.value },
                            _this2.getLabel(item)
                        )
                    );
                });
            }

            return _react2.default.createElement(
                _FormControl2.default,
                _extends({ fullWidth: true, error: !!error }, form.otherProps),
                _react2.default.createElement(
                    _InputLabel2.default,
                    { required: form.required },
                    form.title && getLocalizedString(form.title)
                ),
                _react2.default.createElement(
                    _Select2.default,
                    {
                        value: currentValue || "",
                        placeholder: form.placeholder && getLocalizedString(form.placeholder),
                        disabled: form.readonly,
                        onChange: this.onSelected
                    },
                    menuItems
                ),
                _react2.default.createElement(
                    _FormHelperText2.default,
                    null,
                    (error || form.description) && getLocalizedString(error || form.description)
                )
            );
        }
    }], [{
        key: "getDerivedStateFromProps",
        value: function getDerivedStateFromProps(props) {
            var form = props.form,
                model = props.model;

            if (model && form.key) {
                return {
                    currentValue: _utils2.default.getValueFromModel(model, form.key)
                };
            }
            return null;
        }
    }]);

    return Select;
}(_react.Component);

exports.default = (0, _ComposedComponent2.default)(Select);