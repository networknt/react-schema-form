"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ComposedComponent = _interopRequireDefault(require("./ComposedComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var dataSourceConfig = {
  text: "name",
  value: "value"
};

var TextSuggest =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TextSuggest, _React$Component);

  function TextSuggest() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TextSuggest);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TextSuggest)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleUpdate", function (newValue, index) {
      var key = _this.props.form.key;
      var type = _this.props.form.schema.type;
      return _this.props.onChange(key, newValue[dataSourceConfig.value], type, _this.props.form);
    });

    _defineProperty(_assertThisInitialized(_this), "handleInit", function (init_value) {
      if (!_this.props.form.schema || !_this.props.form.schema["enum"]) return init_value.toString();
      var names = _this.props.form.schema.enumNames || _this.props.form.schema["enum"];
      var values = _this.props.form.schema["enum"];
      var init_value_name = names[values.indexOf(init_value)]; // this.handleUpdate({[dataSourceConfig['value']]: init_value, [dataSourceConfig['text']]: init_value_name})

      return init_value_name || init_value.toString();
    });

    return _this;
  }

  _createClass(TextSuggest, [{
    key: "render",
    value: function render() {
      // assign the filter, by default case insensitive
      var filter = function (filter) {
        switch (filter) {
          case "fuzzy":
            return AutoComplete.fuzzyFilter;

          default:
            return AutoComplete.caseInsensitiveFilter;
        }
      }(this.props.form.filter);

      var value = this.props.value && this.handleInit(this.props.value);
      return _react["default"].createElement("div", {
        className: this.props.form.htmlClass
      }, _react["default"].createElement(AutoComplete, {
        type: this.props.form.type,
        floatingLabelText: this.props.form.title,
        hintText: this.props.form.placeholder,
        errorText: this.props.error,
        onNewRequest: this.handleUpdate,
        disabled: this.props.form.readonly,
        style: this.props.form.style || {
          width: "100%"
        },
        openOnFocus: true,
        searchText: value,
        dataSource: this.props.form.titleMap || ["Loading..."],
        filter: filter,
        maxSearchResults: this.props.form.maxSearchResults || 5,
        dataSourceConfig: dataSourceConfig
      }));
    }
  }]);

  return TextSuggest;
}(_react["default"].Component);

var _default = (0, _ComposedComponent["default"])(TextSuggest);

exports["default"] = _default;