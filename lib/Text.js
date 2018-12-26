"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _TextField = require("@material-ui/core/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

var _ComposedComponent = require("./ComposedComponent");

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/**
 * Created by steve on 15/09/15.
 */


var Text = function (_React$Component) {
    _inherits(Text, _React$Component);

    function Text(props) {
        _classCallCheck(this, Text);

        var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, props));

        var _this$props = _this.props,
            model = _this$props.model,
            form = _this$props.form,
            value = _this$props.value,
            setDefault = _this$props.setDefault;
        var key = form.key;

        setDefault(key, model, form, value);
        return _this;
    }

    _createClass(Text, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                form = _props.form,
                error = _props.error,
                value = _props.value,
                onChangeValidate = _props.onChangeValidate,
                getLocalizedString = _props.localization.getLocalizedString,
                otherProps = _props.otherProps;

            return _react2.default.createElement(_TextField2.default, _extends({
                type: form.type,
                label: form.title && getLocalizedString(form.title),
                placeholder: form.placeholder && getLocalizedString(form.placeholder),
                helperText: (error || form.description) && getLocalizedString(error || form.description),
                error: !!error,
                onChange: onChangeValidate,
                value: value || "",
                disabled: form.readonly,
                fullWidth: true,
                required: form.required
            }, otherProps));
        }
    }]);

    return Text;
}(_react2.default.Component);

Text.defaultProps = {
    otherProps: undefined
};
exports.default = (0, _ComposedComponent2.default)(Text);