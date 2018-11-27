"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _TextField = require("@material-ui/core/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

var _ComposedComponent = require("./ComposedComponent");

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextArea = function TextArea(_ref) {
    var form = _ref.form,
        value = _ref.value,
        error = _ref.error,
        onChangeValidate = _ref.onChangeValidate;
    return _react2.default.createElement(_TextField2.default, {
        type: form.type,
        label: form.title,
        placeholder: form.placeholder,
        helperText: error || form.description,
        onChange: onChangeValidate,
        error: !!error,
        value: value,
        multiline: true,
        rows: form.rows,
        rowsMax: form.rowsMax,
        disabled: form.readonly,
        fullWidth: true
    });
};
/**
 * Created by steve on 15/09/15.
 */
exports.default = (0, _ComposedComponent2.default)(TextArea);