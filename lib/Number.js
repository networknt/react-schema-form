"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
/**
 * Created by steve on 15/09/15.
 */


var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ComposedComponent = require("./ComposedComponent");

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

var _Text = require("./Text");

var _Text2 = _interopRequireDefault(_Text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */
var NumberComponent = function NumberComponent(props) {
    var form = props.form,
        value = props.value,
        getLocalizedNumber = props.localization.getLocalizedNumber;

    var inputValue = value || value === 0 ? value : "";
    if (form.useLocalizer) inputValue = getLocalizedNumber(inputValue);

    return _react2.default.createElement(_Text2.default, _extends({}, props, {
        form: Object.assign({}, form, { type: "string" }),
        value: inputValue
    }));
};

exports.default = (0, _ComposedComponent2.default)(NumberComponent);