"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _Select = _interopRequireDefault(require("@material-ui/core/Select"));

var _InputLabel = _interopRequireDefault(require("@material-ui/core/InputLabel"));

var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));

var _Chip = _interopRequireDefault(require("@material-ui/core/Chip"));

var _ComposedComponent = _interopRequireDefault(require("./ComposedComponent"));

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = function styles(theme) {
  return {
    root: {
      display: "flex",
      flexWrap: "wrap"
    },
    chips: {
      display: "flex",
      flexWrap: "wrap"
    },
    chip: {
      margin: theme.spacing(0.25)
    },
    menuItem: {
      fontWeight: theme.typography.fontWeightRegular
    },
    selectedMenuItem: {
      fontWeight: theme.typography.fontWeightMedium
    }
  };
};

var ITEM_HEIGHT = 48;
var ITEM_PADDING_TOP = 8;
var MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

var MultiSelect =
/*#__PURE__*/
function (_Component) {
  _inherits(MultiSelect, _Component);

  function MultiSelect(props) {
    var _this;

    _classCallCheck(this, MultiSelect);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MultiSelect).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onSelected", function (event) {
      var onChangeValidate = _this.props.onChangeValidate;
      var currentValue = event.target.value;

      _this.setState({
        currentValue: currentValue
      });

      onChangeValidate(currentValue);
    });

    var _this$props = _this.props,
        model = _this$props.model,
        form = _this$props.form;
    _this.state = {
      currentValue: _utils["default"].getValueFromModel(model, form.key) || []
    };
    return _this;
  }

  _createClass(MultiSelect, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          form = _this$props2.form,
          classes = _this$props2.classes,
          getLocalizedString = _this$props2.localization.getLocalizedString;
      var currentValue = this.state.currentValue;

      var getTitle = _utils["default"].getTitleByValue.bind(this, form.titleMap);

      var menuItems = form.titleMap.map(function (item) {
        return _react["default"].createElement(_MenuItem["default"], {
          key: item.value,
          value: item.value,
          className: currentValue.indexOf(item.value) === -1 ? classes.menuItem : classes.selectedMenuItem
        }, item.name && getLocalizedString(item.name));
      });
      return _react["default"].createElement(_FormControl["default"], _extends({
        fullWidth: true
      }, form.otherProps), _react["default"].createElement(_InputLabel["default"], {
        required: form.required
      }, form.title && getLocalizedString(form.title)), _react["default"].createElement(_Select["default"], {
        multiple: true,
        value: currentValue || "",
        placeholder: form.placeholder && getLocalizedString(form.placeholder),
        disabled: form.readonly,
        onChange: this.onSelected,
        MenuProps: MenuProps,
        renderValue: function renderValue(selected) {
          return _react["default"].createElement("div", {
            className: classes.chips
          }, selected.map(function (value) {
            return _react["default"].createElement(_Chip["default"], {
              key: value,
              label: getTitle(value) && getLocalizedString(getTitle(value)),
              className: classes.chip
            });
          }));
        }
      }, menuItems));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props) {
      var model = props.model,
          form = props.form;

      if (model && form.key) {
        return {
          currentValue: _utils["default"].getValueFromModel(model, form.key) || []
        };
      }

      return null;
    }
  }]);

  return MultiSelect;
}(_react.Component);

var _default = (0, _ComposedComponent["default"])((0, _styles.withStyles)(styles)(MultiSelect));

exports["default"] = _default;