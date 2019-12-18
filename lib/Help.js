"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Help = function Help(_ref) {
  var _ref$form = _ref.form,
      description = _ref$form.description,
      variant = _ref$form.variant,
      align = _ref$form.align,
      color = _ref$form.color,
      noWrap = _ref$form.noWrap,
      paragraph = _ref$form.paragraph,
      otherProps = _ref$form.otherProps;
  return _react["default"].createElement(_Typography["default"], _extends({
    variant: variant,
    align: align,
    color: color,
    noWrap: noWrap,
    paragraph: paragraph
  }, otherProps), description);
};

var _default = Help;
exports["default"] = _default;