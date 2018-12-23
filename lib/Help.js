"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by steve on 20/09/15.
 */
var Help = function Help(_ref) {
    var _ref$form = _ref.form,
        description = _ref$form.description,
        variant = _ref$form.variant,
        align = _ref$form.align,
        color = _ref$form.color,
        noWrap = _ref$form.noWrap,
        paragraph = _ref$form.paragraph;
    return _react2.default.createElement(
        _Typography2.default,
        {
            variant: variant,
            align: align,
            color: color,
            noWrap: noWrap,
            paragraph: paragraph
        },
        description
    );
};

exports.default = Help;