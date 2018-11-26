"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
/*
Native date field. 
Contains common logic for final components Date and DateTime.
*/


var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _TextField = require("@material-ui/core/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NativeDateField = function NativeDateField(_ref) {
    var form = _ref.form,
        value = _ref.value,
        type = _ref.type,
        onChangeValidate = _ref.onChangeValidate;

    var fieldValue = value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && value.toISOString().slice(0, 10) || value;
    if (!fieldValue) fieldValue = "";
    if (fieldValue.length > 0) fieldValue = new Date(fieldValue).toISOString().slice(0, 10);
    return _react2.default.createElement(_TextField2.default, {
        label: form.title,
        type: type,
        value: fieldValue,
        InputLabelProps: { shrink: true },
        onChange: onChangeValidate,
        disabled: form.readonly
    });
};

exports.default = NativeDateField;