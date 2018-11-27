"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _FormControl = require("@material-ui/core/FormControl");

var _FormControl2 = _interopRequireDefault(_FormControl);

var _FormHelperText = require("@material-ui/core/FormHelperText");

var _FormHelperText2 = _interopRequireDefault(_FormHelperText);

var _Input = require("@material-ui/core/Input");

var _Input2 = _interopRequireDefault(_Input);

var _InputLabel = require("@material-ui/core/InputLabel");

var _InputLabel2 = _interopRequireDefault(_InputLabel);

var _ComposedComponent = require("./ComposedComponent");

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */

/**
 * Created by steve on 15/09/15.
 */
var NumberComponent = function NumberComponent(_ref) {
    var form = _ref.form,
        error = _ref.error,
        onChangeValidate = _ref.onChangeValidate,
        value = _ref.value;
    return _react2.default.createElement(
        _FormControl2.default,
        { fullWidth: true, error: !!error },
        _react2.default.createElement(
            _InputLabel2.default,
            { htmlFor: "input-" + form.key[0], required: form.required },
            form.title
        ),
        _react2.default.createElement(_Input2.default, {
            id: "input-" + form.key[0],
            type: "string",
            placeholder: form.placeholder,
            onChange: onChangeValidate,
            value: value || value === 0 ? value : "",
            disabled: form.readonly
        }),
        Boolean(error || form.description) && _react2.default.createElement(
            _FormHelperText2.default,
            null,
            error || form.description
        )
    );
};

exports.default = (0, _ComposedComponent2.default)(NumberComponent);