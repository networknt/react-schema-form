"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _ComposedComponent = _interopRequireDefault(require("./ComposedComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Text =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Text, _React$Component);

  function Text(props) {
    var _this;

    _classCallCheck(this, Text);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Text).call(this, props));
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
      var _this$props2 = this.props,
          form = _this$props2.form,
          error = _this$props2.error,
          value = _this$props2.value,
          onChangeValidate = _this$props2.onChangeValidate,
          getLocalizedString = _this$props2.localization.getLocalizedString,
          otherProps = _this$props2.otherProps;
      return _react["default"].createElement(_TextField["default"], _extends({
        type: form.type,
        label: form.title && getLocalizedString(form.title),
        placeholder: form.placeholder && getLocalizedString(form.placeholder),
        helperText: (error || form.description) && getLocalizedString(error || form.description),
        error: !!error,
        onChange: onChangeValidate,
        value: value || "",
        disabled: form.readonly,
        fullWidth: true,
        required: form.required,
        style: form.style
      }, otherProps, form.otherProps));
    }
  }]);

  return Text;
}(_react["default"].Component);

Text.defaultProps = {
  otherProps: undefined
};

var _default = (0, _ComposedComponent["default"])(Text);

exports["default"] = _default;