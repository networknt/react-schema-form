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
    var description = _ref.form.description;
    return _react2.default.createElement(
        _Typography2.default,
        { variant: "body2" },
        description
    );
};

exports.default = Help;