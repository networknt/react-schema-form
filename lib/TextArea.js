"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ComposedComponent = _interopRequireDefault(require("./ComposedComponent"));

var _Text = _interopRequireDefault(require("./Text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var TextArea = function TextArea(props) {
  var form = props.form;
  return _react["default"].createElement(_Text["default"], _extends({}, props, {
    otherProps: {
      multiline: true,
      rows: form.rows,
      rowsMax: form.rowsMax
    }
  }));
};

var _default = (0, _ComposedComponent["default"])(TextArea);

exports["default"] = _default;