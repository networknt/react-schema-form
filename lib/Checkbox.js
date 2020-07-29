"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Checkbox = _interopRequireDefault(require("@material-ui/core/Checkbox"));

var _FormGroup = _interopRequireDefault(require("@material-ui/core/FormGroup"));

var _FormControlLabel = _interopRequireDefault(require("@material-ui/core/FormControlLabel"));

var _ComposedComponent = _interopRequireDefault(require("./ComposedComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function FormCheckbox(props) {
  var model = props.model,
      form = props.form,
      value = props.value,
      setDefault = props.setDefault,
      getLocalizedString = props.localization.getLocalizedString,
      onChangeValidate = props.onChangeValidate;
  var key = form.key;
  setDefault(key, model, form, value);
  return /*#__PURE__*/_react["default"].createElement(_FormGroup["default"], {
    row: true
  }, /*#__PURE__*/_react["default"].createElement(_FormControlLabel["default"], _extends({
    className: form.className,
    label: form.title && getLocalizedString(form.title),
    control: /*#__PURE__*/_react["default"].createElement(_Checkbox["default"], {
      name: form.key.slice(-1)[0],
      value: form.key.slice(-1)[0],
      checked: value || false,
      disabled: form.readonly,
      onChange: onChangeValidate
    })
  }, form.otherProps)));
}

FormCheckbox.propTypes = {
  model: _propTypes["default"].objectOf(_propTypes["default"].object).isRequired,
  form: _propTypes["default"].objectOf(_propTypes["default"].object).isRequired,
  setDefault: _propTypes["default"].func.isRequired,
  value: _propTypes["default"].bool.isRequired,
  localization: _propTypes["default"].objectOf(_propTypes["default"].object).isRequired,
  getLocalizedString: _propTypes["default"].func.isRequired,
  onChangeValidate: _propTypes["default"].func.isRequired
};

var _default = (0, _ComposedComponent["default"])(FormCheckbox);

exports["default"] = _default;