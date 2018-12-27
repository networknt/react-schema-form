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

var TextArea = function TextArea(props) {
    var form = props.form;

    return _react2.default.createElement(_Text2.default, _extends({}, props, {
        otherProps: {
            multiline: true,
            rows: form.rows,
            rowsMax: form.rowsMax
        }
    }));
};

exports.default = (0, _ComposedComponent2.default)(TextArea);