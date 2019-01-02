"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
/*
Native date field. 
Contains common logic for final components Date and DateTime.
*/


var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Text = require("./Text");

var _Text2 = _interopRequireDefault(_Text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NativeDateField = function NativeDateField(props) {
    var value = props.value,
        getLocalizedDate = props.localization.getLocalizedDate,
        form = props.form,
        type = props.type;

    return _react2.default.createElement(_Text2.default, _extends({}, props, {
        form: Object.assign({}, form, { type: type }),
        value: getLocalizedDate(value),
        otherProps: { InputLabelProps: { shrink: true } }
    }));
};

exports.default = NativeDateField;