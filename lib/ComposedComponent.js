"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var defaultValue = function defaultValue(props) {
  // check if there is a value in the model, if there is, display it. Otherwise, check if
  // there is a default value, display it.
  var value;
  if (props.form && props.form.key) value = _utils["default"].selectOrSet(props.form.key, props.model); // check if there is a default value

  if (value === null || value === undefined) {
    if (props.form["default"]) {
      value = props.form["default"];
    } else if (props.form.schema && props.form.schema["default"]) {
      value = props.form.schema["default"];
    }
  }

  return value;
};

var getDisplayName = function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

var _default = function _default(ComposedComponent) {
  var defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (
    /*#__PURE__*/
    function (_React$Component) {
      _inherits(Composed, _React$Component);

      function Composed(props) {
        var _this;

        _classCallCheck(this, Composed);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(Composed).call(this, props));
        _this.displayName = "ComposedComponent(".concat(getDisplayName(ComposedComponent), ")");
        _this.onChangeValidate = _this.onChangeValidate.bind(_assertThisInitialized(_this));
        _this.state = _this.constructor.getDerivedStateFromProps(_this.props);
        return _this;
      }

      _createClass(Composed, [{
        key: "onChangeValidate",

        /**
         * Called when <input> value changes.
         * @param e The input element, or something.
         */
        value: function onChangeValidate(e, v) {
          var _this$props = this.props,
              form = _this$props.form,
              onChange = _this$props.onChange,
              localization = _this$props.localization; // eslint-disable-line

          var getLocalizedString = localization && localization.getLocalizedString;
          var value = null;
          var type = form.schema ? form.schema.type : form.type;

          switch (type) {
            case "integer":
            case "number":
              {
                value = e;
                break;
              }

            case "boolean":
              value = e.target.checked;
              break;

            case "tBoolean":
              if (e.target.value !== "yes" || e.target.value !== "no") {
                value = v;
              }

              break;

            case "array":
              value = e;
              break;

            case "object":
              if (form.type === "date") {
                if (e.target.value.length > 0) {
                  value = new Date(e.target.value);
                } else {
                  value = "";
                }

                break;
              }

              value = e.target.value;
              break;

            default:
              value = e.target.value;
          }

          var validationResult = _utils["default"].validate(form, value, getLocalizedString);

          this.setState({
            value: value,
            valid: validationResult.valid,
            error: validationResult.valid ? null : validationResult.error.message
          });
          onChange(form.key, value);
        }
      }, {
        key: "render",
        value: function render() {
          return _react["default"].createElement(ComposedComponent, _extends({}, defaultProps, this.props, this.state, {
            onChangeValidate: this.onChangeValidate
          }));
        }
      }], [{
        key: "getDerivedStateFromProps",
        value: function getDerivedStateFromProps(nextProps) {
          var errorText = nextProps.errorText,
              form = nextProps.form,
              showErrors = nextProps.showErrors,
              localization = nextProps.localization;
          var getLocalizedString = localization && localization.getLocalizedString;
          var value = defaultValue(nextProps);

          if (!showErrors) {
            return {
              value: value,
              valid: true,
              error: ""
            };
          }

          var validationResult = _utils["default"].validate(form, value || undefined, getLocalizedString);

          var error = !validationResult.valid ? validationResult.error : undefined;
          return {
            value: value,
            valid: validationResult.valid,
            error: (!validationResult.valid ? error.message : null) || errorText
          };
        }
      }]);

      return Composed;
    }(_react["default"].Component)
  );
};

exports["default"] = _default;