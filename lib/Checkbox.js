"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Checkbox = _interopRequireDefault(require("@material-ui/core/Checkbox"));

var _FormGroup = _interopRequireDefault(require("@material-ui/core/FormGroup"));

var _FormControlLabel = _interopRequireDefault(require("@material-ui/core/FormControlLabel"));

var _ComposedComponent = _interopRequireDefault(require("./ComposedComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var FormCheckbox = function FormCheckbox(_ref) {
  var form = _ref.form,
      value = _ref.value,
      getLocalizedString = _ref.localization.getLocalizedString,
      onChangeValidate = _ref.onChangeValidate;
  return _react["default"].createElement(_FormGroup["default"], {
    row: true
  }, _react["default"].createElement(_FormControlLabel["default"], _extends({
    className: form.className,
    label: form.title && getLocalizedString(form.title),
    control: _react["default"].createElement(_Checkbox["default"], {
      name: form.key.slice(-1)[0],
      value: form.key.slice(-1)[0],
      checked: value || false,
      disabled: form.readonly,
      onChange: onChangeValidate
    })
  }, form.otherProps)));
};

var _default = (0, _ComposedComponent["default"])(FormCheckbox);

exports["default"] = _default;