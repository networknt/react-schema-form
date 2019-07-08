"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));

var _FormLabel = _interopRequireDefault(require("@material-ui/core/FormLabel"));

var _styles = require("@material-ui/core/styles");

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var styles = function styles(theme) {
  return {
    root: {
      marginTop: theme.spacing(1)
    },
    fields: {
      marginLeft: theme.spacing(1)
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
  var className = (0, _classnames["default"])(classes.root, form.htmlClass);
  return _react["default"].createElement(_FormControl["default"], _extends({
    component: "fieldset",
    className: className,
    style: form.style
  }, form.otherProps), _react["default"].createElement(_FormLabel["default"], {
    component: "legend",
    required: form.required
  }, form.title && getLocalizedString(form.title)), _react["default"].createElement("div", {
    className: classes.fields
  }, forms));
};

var _default = (0, _styles.withStyles)(styles)(FieldSet);

exports["default"] = _default;