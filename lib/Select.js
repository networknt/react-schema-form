"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _Select = _interopRequireDefault(require("@material-ui/core/Select"));

var _InputLabel = _interopRequireDefault(require("@material-ui/core/InputLabel"));

var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));

var _FormHelperText = _interopRequireDefault(require("@material-ui/core/FormHelperText"));

var _ComposedComponent = _interopRequireDefault(require("./ComposedComponent"));

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Select = /*#__PURE__*/function (_Component) {
  _inherits(Select, _Component);

  var _super = _createSuper(Select);

  function Select(props) {
    var _this;

    _classCallCheck(this, Select);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "onSelected", function (event) {
      var _this$props = _this.props,
          onChangeValidate = _this$props.onChangeValidate,
          onChange = _this$props.onChange,
          _this$props$form = _this$props.form,
          key = _this$props$form.key,
          _this$props$form$sche = _this$props$form.schema,
          isObject = _this$props$form$sche.isObject,
          values = _this$props$form$sche["enum"],
          findFn = _this$props$form$sche.findFn;
      var currentValue = event.target.value;

      _this.setState({
        currentValue: currentValue
      });

      if (isObject) {
        var item = values.find(function (each) {
          return findFn ? findFn(each, currentValue) : each === currentValue;
        });
        onChange(key, item);
      } else {
        onChangeValidate(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getLabel", function (each) {
      var _this$props2 = _this.props,
          _this$props2$form$sch = _this$props2.form.schema,
          displayFn = _this$props2$form$sch.displayFn,
          noLocalization = _this$props2$form$sch.noLocalization,
          getLocalizedString = _this$props2.localization.getLocalizedString;

      if (displayFn) {
        return displayFn(each);
      }

      if (noLocalization) return each.name;
      return getLocalizedString(each.name);
    });

    var _this$props3 = _this.props,
        model = _this$props3.model,
        form = _this$props3.form,
        setDefault = _this$props3.setDefault,
        _key = _this$props3.form.key;
    var defaultValue = form && form.selectProps && form.selectProps.multiple ? [] : "";

    if (props.form["default"]) {
      defaultValue = props.form["default"];
    } else if (props.form.schema && props.form.schema["default"]) {
      defaultValue = props.form.schema["default"];
    }

    var _currentValue = _utils["default"].getValueFromModel(model, form.key) || defaultValue;

    _this.state = {
      currentValue: _currentValue
    };
    setDefault(_key, model, form, _currentValue);
    return _this;
  }

  _createClass(Select, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props4 = this.props,
          form = _this$props4.form,
          error = _this$props4.error,
          getLocalizedString = _this$props4.localization.getLocalizedString;
      var currentValue = this.state.currentValue;
      var menuItems = [];

      if (form.schema.isObject) {
        menuItems = form.schema["enum"].map(function (item, idx) {
          return (
            /*#__PURE__*/
            // eslint-disable-next-line react/no-array-index-key
            _react["default"].createElement(_MenuItem["default"], {
              key: idx,
              value: item
            }, _this2.getLabel(item))
          );
        });
      } else {
        menuItems = form.titleMap.map(function (item, idx) {
          return (
            /*#__PURE__*/
            // eslint-disable-next-line react/no-array-index-key
            _react["default"].createElement(_MenuItem["default"], {
              key: idx,
              value: item.value
            }, _this2.getLabel(item))
          );
        });
      }

      return /*#__PURE__*/_react["default"].createElement(_FormControl["default"], _extends({
        fullWidth: true,
        error: !!error
      }, form.otherProps), /*#__PURE__*/_react["default"].createElement(_InputLabel["default"], _extends({
        required: form.required
      }, form.labelProps), form.title && getLocalizedString(form.title)), /*#__PURE__*/_react["default"].createElement(_Select["default"], _extends({
        value: currentValue,
        placeholder: form.placeholder && getLocalizedString(form.placeholder),
        disabled: form.readonly,
        onChange: this.onSelected
      }, form.selectProps), menuItems), /*#__PURE__*/_react["default"].createElement(_FormHelperText["default"], form.helperTextProps, (error || form.description) && getLocalizedString(error || form.description)));
    }
  }]);

  return Select;
}(_react.Component);

var _default = (0, _ComposedComponent["default"])(Select);

exports["default"] = _default;