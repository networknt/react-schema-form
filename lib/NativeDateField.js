"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Text = _interopRequireDefault(require("./Text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var NativeDateField = function NativeDateField(props) {
  var value = props.value,
      getLocalizedDate = props.localization.getLocalizedDate,
      form = props.form,
      type = props.type;
  return _react["default"].createElement(_Text["default"], _extends({}, props, {
    form: Object.assign({}, form, {
      type: type
    }),
    value: getLocalizedDate(value),
    otherProps: {
      InputLabelProps: {
        shrink: true
      }
    }
  }, form.otherProps));
};

var _default = NativeDateField;
exports["default"] = _default;