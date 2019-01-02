"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Checkbox = require("@material-ui/core/Checkbox");

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _FormGroup = require("@material-ui/core/FormGroup");

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _FormControlLabel = require("@material-ui/core/FormControlLabel");

var _FormControlLabel2 = _interopRequireDefault(_FormControlLabel);

var _ComposedComponent = require("./ComposedComponent");

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormCheckbox = function FormCheckbox(_ref) {
    var form = _ref.form,
        value = _ref.value,
        getLocalizedString = _ref.localization.getLocalizedString,
        onChangeValidate = _ref.onChangeValidate;
    return _react2.default.createElement(
        _FormGroup2.default,
        { row: true },
        _react2.default.createElement(_FormControlLabel2.default, {
            className: form.className,
            label: form.title && getLocalizedString(form.title),
            control: _react2.default.createElement(_Checkbox2.default, {
                name: form.key.slice(-1)[0],
                value: form.key.slice(-1)[0],
                checked: value || false,
                disabled: form.readonly,
                onChange: onChangeValidate
            })
        })
    );
};
/**
 * Created by steve on 20/09/15.
 */
exports.default = (0, _ComposedComponent2.default)(FormCheckbox);