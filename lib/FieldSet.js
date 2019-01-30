"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
/**
 * Created by steve on 11/09/15.
 */


var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _FormControl = require("@material-ui/core/FormControl");

var _FormControl2 = _interopRequireDefault(_FormControl);

var _FormLabel = require("@material-ui/core/FormLabel");

var _FormLabel2 = _interopRequireDefault(_FormLabel);

var _styles = require("@material-ui/core/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
    return {
        root: {
            marginTop: theme.spacing.unit
        },
        fields: {
            marginLeft: theme.spacing.unit
        }
    };
};

var FieldSet = function FieldSet(_ref) {
    var form = _ref.form,
        mapper = _ref.mapper,
        builder = _ref.builder,
        model = _ref.model,
        onChange = _ref.onChange,
        classes = _ref.classes,
        getLocalizedString = _ref.localization.getLocalizedString;

    var forms = form.items.map(function (f, index) {
        return builder(f, model, index, mapper, onChange, builder);
    });

    return _react2.default.createElement(
        _FormControl2.default,
        _extends({
            component: "fieldset",
            className: classes.root,
            style: form.style
        }, form.otherProps),
        _react2.default.createElement(
            _FormLabel2.default,
            { component: "legend", required: form.required },
            form.title && getLocalizedString(form.title)
        ),
        _react2.default.createElement(
            "div",
            { className: classes.fields },
            forms
        )
    );
};

exports.default = (0, _styles.withStyles)(styles)(FieldSet);