"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _TextField = require("@material-ui/core/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
Native date field. 
Contains common logic for final components Date and DateTime.
*/
var NativeDateField = function NativeDateField(_ref) {
    var form = _ref.form,
        value = _ref.value,
        type = _ref.type,
        onChangeValidate = _ref.onChangeValidate,
        _ref$localization = _ref.localization,
        getLocalizedString = _ref$localization.getLocalizedString,
        getLocalizedDate = _ref$localization.getLocalizedDate;
    return _react2.default.createElement(_TextField2.default, {
        label: getLocalizedString(form.title),
        type: type,
        value: getLocalizedDate(value),
        InputLabelProps: { shrink: true },
        onChange: onChangeValidate,
        disabled: form.readonly
    });
};
exports.default = NativeDateField;