"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _FormControl = require("@material-ui/core/FormControl");

var _FormControl2 = _interopRequireDefault(_FormControl);

var _FormLabel = require("@material-ui/core/FormLabel");

var _FormLabel2 = _interopRequireDefault(_FormLabel);

var _styles = require("@material-ui/core/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by steve on 11/09/15.
 */
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
        { component: "fieldset", className: classes.root },
        _react2.default.createElement(
            _FormLabel2.default,
            { component: "legend" },
            getLocalizedString(form.title)
        ),
        _react2.default.createElement(
            "div",
            { className: classes.fields },
            forms
        )
    );
};

exports.default = (0, _styles.withStyles)(styles)(FieldSet);