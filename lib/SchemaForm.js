"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _merge = _interopRequireDefault(require("lodash/merge"));

var _isNil = _interopRequireDefault(require("lodash/isNil"));

var _utils = _interopRequireDefault(require("./utils"));

var _Number = _interopRequireDefault(require("./Number"));

var _Text = _interopRequireDefault(require("./Text"));

var _TextArea = _interopRequireDefault(require("./TextArea"));

var _TextSuggest = _interopRequireDefault(require("./TextSuggest"));

var _Select = _interopRequireDefault(require("./Select"));

var _MultiSelect = _interopRequireDefault(require("./MultiSelect"));

var _Radios = _interopRequireDefault(require("./Radios"));

var _Date = _interopRequireDefault(require("./Date"));

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var _Help = _interopRequireDefault(require("./Help"));

var _Array = _interopRequireDefault(require("./Array"));

var _FieldSet = _interopRequireDefault(require("./FieldSet"));

var _TripleBoolean = _interopRequireDefault(require("./TripleBoolean"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var formatDate = function formatDate(date) {
  var value = date && _typeof(date) === "object" && date.toISOString().slice(0, 10) || date;
  if (!value) value = "";
  if (value.length > 0) value = new Date(value).toISOString().slice(0, 10);
  return value;
};

var SchemaForm =
/*#__PURE__*/
function (_Component) {
  _inherits(SchemaForm, _Component);

  function SchemaForm(props) {
    var _this;

    _classCallCheck(this, SchemaForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SchemaForm).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "mapper", {
      number: _Number["default"],
      text: _Text["default"],
      password: _Text["default"],
      textarea: _TextArea["default"],
      textsuggest: _TextSuggest["default"],
      select: _Select["default"],
      radios: _Radios["default"],
      date: _Date["default"],
      checkbox: _Checkbox["default"],
      help: _Help["default"],
      array: _Array["default"],
      tBoolean: _TripleBoolean["default"],
      fieldset: _FieldSet["default"],
      tuple: _FieldSet["default"],
      multiselect: _MultiSelect["default"]
    });

    _defineProperty(_assertThisInitialized(_this), "setDefault", function (key, model, form, value) {
      var onModelChange = _this.props.onModelChange;

      var currentValue = _utils["default"].selectOrSet(key, model); // If current value is not setted and exist a default, apply the default over the model


      if ((0, _isNil["default"])(currentValue) && !(0, _isNil["default"])(value)) onModelChange(key, value, form.type, form);
    });

    _defineProperty(_assertThisInitialized(_this), "getLocalization", function () {
      var localization = _this.props.localization;
      return {
        getLocalizedString: localization && localization.getLocalizedString ? localization.getLocalizedString : function (value) {
          return value;
        },
        getLocalizedNumber: localization && localization.getLocalizedNumber ? localization.getLocalizedNumber : function (value) {
          return value;
        },
        getLocalizedDate: localization && localization.getLocalizedDate ? localization.getLocalizedDate : formatDate
      };
    });

    _this.builder = _this.builder.bind(_assertThisInitialized(_this));
    return _this;
  } // Assign default values and save it to the model


  _createClass(SchemaForm, [{
    key: "builder",
    value: function builder(form, model, index, mapper, onChange, _builder, evalContext) {
      var _this$props = this.props,
          errors = _this$props.errors,
          showErrors = _this$props.showErrors;
      var Field = this.mapper[form.type];

      if (!Field) {
        return null;
      } // Apply conditionals to review if this field must be rendered


      if (form.condition && _utils["default"].safeEval(form.condition, _objectSpread({
        model: model,
        form: form
      }, evalContext)) === false) {
        return null;
      }

      var key = form.key && form.key.join(".") || index;
      var error = errors && key in errors ? errors[key] : null;
      return _react["default"].createElement(Field, {
        model: model,
        form: form,
        key: key,
        onChange: onChange,
        setDefault: this.setDefault,
        mapper: mapper,
        builder: _builder,
        errorText: error,
        localization: this.getLocalization(),
        showErrors: showErrors
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          schema = _this$props2.schema,
          form = _this$props2.form,
          ignore = _this$props2.ignore,
          option = _this$props2.option,
          model = _this$props2.model,
          className = _this$props2.className,
          onModelChange = _this$props2.onModelChange,
          mapper = _this$props2.mapper;

      var merged = _utils["default"].merge(schema, form, ignore, option);

      var mergedMapper = this.mapper;

      if (mapper) {
        mergedMapper = (0, _merge["default"])(this.mapper, mapper);
      }

      var forms = merged.map(function (formPart, index) {
        return _this2.builder(formPart, model, index, mergedMapper, onModelChange, _this2.builder);
      });
      return _react["default"].createElement("div", {
        className: className
      }, forms);
    }
  }]);

  return SchemaForm;
}(_react.Component);

SchemaForm.defaultProps = {
  localization: undefined,
  showErrors: false
};
var _default = SchemaForm;
exports["default"] = _default;