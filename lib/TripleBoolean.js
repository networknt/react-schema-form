"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _FormLabel = _interopRequireDefault(require("@material-ui/core/FormLabel"));

var _ComposedComponent = _interopRequireDefault(require("./ComposedComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */
var TripleBoolean =
/*#__PURE__*/
function (_Component) {
  _inherits(TripleBoolean, _Component);

  _createClass(TripleBoolean, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      return {
        yesChecked: nextProps.value === "yes",
        noChecked: nextProps.value === "no"
      };
    }
  }]);

  function TripleBoolean(props) {
    var _this;

    _classCallCheck(this, TripleBoolean);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TripleBoolean).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "divStyle", {
      padding: "20px"
    });

    _this.state = {
      yesChecked: false,
      noChecked: false
    };
    var _this$props = _this.props,
        model = _this$props.model,
        form = _this$props.form,
        value = _this$props.value,
        setDefault = _this$props.setDefault;
    var key = form.key;
    setDefault(key, model, form, value);
    return _this;
  }

  _createClass(TripleBoolean, [{
    key: "displaySwitch",
    value: function displaySwitch() {
      var _this$props2 = this.props,
          _this$props2$form = _this$props2.form,
          title = _this$props2$form.title,
          yesLabel = _this$props2$form.yesLabel,
          noLabel = _this$props2$form.noLabel,
          clearButtonLabel = _this$props2$form.clearButtonLabel,
          required = _this$props2$form.required,
          onChangeValidate = _this$props2.onChangeValidate,
          value = _this$props2.value,
          getLocalizedString = _this$props2.localization.getLocalizedString;
      var _this$state = this.state,
          yesChecked = _this$state.yesChecked,
          noChecked = _this$state.noChecked;
      return _react["default"].createElement("div", {
        style: this.divStyle
      }, _react["default"].createElement(_FormLabel["default"], {
        required: required
      }, title && getLocalizedString(title)), _react["default"].createElement("br", null), _react["default"].createElement(_core.FormGroup, null, _react["default"].createElement(_core.FormControlLabel, {
        control: _react["default"].createElement(_core.Checkbox, {
          onClick: function onClick(e) {
            onChangeValidate(e, "yes");
          },
          checked: yesChecked
        }),
        label: yesLabel ? getLocalizedString(yesLabel) : "Yes"
      }), _react["default"].createElement(_core.FormControlLabel, {
        control: _react["default"].createElement(_core.Checkbox, {
          onClick: function onClick(e) {
            onChangeValidate(e, "no");
          },
          checked: noChecked
        }),
        label: noLabel ? getLocalizedString(noLabel) : "No"
      })), value === "yes" || value === "no" ? _react["default"].createElement(_core.Button, {
        id: "temp",
        variant: "text",
        color: "primary",
        onClick: function onClick(e) {
          return onChangeValidate(e, "unanswered");
        }
      }, clearButtonLabel ? getLocalizedString(clearButtonLabel) : "clear response") : "");
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement(_core.Card, null, this.displaySwitch());
    }
  }]);

  return TripleBoolean;
}(_react.Component);

var _default = (0, _ComposedComponent["default"])(TripleBoolean);

exports["default"] = _default;