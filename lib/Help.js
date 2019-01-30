"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
/**
 * Created by steve on 20/09/15.
 */


var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Help = function Help(_ref) {
    var _ref$form = _ref.form,
        description = _ref$form.description,
        variant = _ref$form.variant,
        align = _ref$form.align,
        color = _ref$form.color,
        noWrap = _ref$form.noWrap,
        paragraph = _ref$form.paragraph,
        otherProps = _ref$form.otherProps;
    return _react2.default.createElement(
        _Typography2.default,
        _extends({
            variant: variant,
            align: align,
            color: color,
            noWrap: noWrap,
            paragraph: paragraph
        }, otherProps),
        description
    );
};

exports.default = Help;