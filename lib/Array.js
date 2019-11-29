"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Card = _interopRequireDefault(require("@material-ui/core/Card"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var _FormLabel = _interopRequireDefault(require("@material-ui/core/FormLabel"));

var _utils = _interopRequireDefault(require("./utils"));

var _ComposedComponent = _interopRequireDefault(require("./ComposedComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

var styles = function styles(theme) {
  return {
    arrayItem: {
      position: "relative",
      padding: theme.spacing(),
      marginTop: theme.spacing(),
      display: "flex"
    },
    deleteItemButton: {
      margin: [[theme.spacing(-1), theme.spacing(-1), "auto", "auto"]]
    },
    addButton: {
      marginLeft: theme.spacing()
    },
    elementsContainer: {
      display: "flex",
      flexWrap: "wrap"
    },
    title: {
      margin: "auto 0"
    }
  };
};

var ArrayComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(ArrayComponent, _Component);

  _createClass(ArrayComponent, null, [{
    key: "assignItemId",
    value: function assignItemId(item) {
      var newItem = null;

      if (item && _typeof(item) === "object" && Array.isArray(item)) {
        newItem = _toConsumableArray(item);
      } else if (item && _typeof(item) === "object" && !item[ArrayComponent.ITEM_ID]) {
        newItem = _objectSpread({}, item);
      }

      if (newItem) {
        // define hidden property with internal id
        Object.defineProperty(newItem, ArrayComponent.ITEM_ID, {
          enumerable: false,
          writable: true
        });
        ArrayComponent.SEQUENCE += 1;
        newItem[ArrayComponent.ITEM_ID] = ArrayComponent.SEQUENCE;
        return newItem;
      }

      return item;
    }
  }]);

  function ArrayComponent(_props) {
    var _this;

    _classCallCheck(this, ArrayComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ArrayComponent).call(this, _props));

    _defineProperty(_assertThisInitialized(_this), "SEQUENCE", 1);

    _defineProperty(_assertThisInitialized(_this), "onAppend", function () {
      var _this$props = _this.props,
          form = _this$props.form,
          options = _this$props.options,
          onChangeValidate = _this$props.onChangeValidate;
      var model = _this.state.model;
      var empty;

      if (form && form.schema && form.schema.items) {
        var items = form.schema.items;

        if (items.type && items.type.indexOf("object") !== -1) {
          empty = {}; // Check for possible defaults

          if (!options || options.setSchemaDefaults !== false) {
            empty = typeof items["default"] !== "undefined" ? items["default"] : empty; // Check for defaults further down in the schema.
            // If the default instance sets the new array item to something falsy, i.e. null
            // then there is no need to go further down.

            if (empty) {
              _utils["default"].traverseSchema(items, function (prop, path) {
                if (typeof prop["default"] !== "undefined") {
                  _utils["default"].selectOrSet(path, empty, prop["default"]);
                }
              });
            }
          }
        } else if (items.type && items.type.indexOf("array") !== -1) {
          empty = [];

          if (!options || options.setSchemaDefaults !== false) {
            empty = items["default"] || empty;
          }
        } else if (!options || options.setSchemaDefaults !== false) {
          // No type? could still have defaults.
          empty = items["default"] || empty;
        }
      }

      var newModel = model;
      ArrayComponent.assignItemId(empty);
      newModel.push(empty);

      _this.setState({
        model: newModel
      });

      onChangeValidate(model);
    });

    _defineProperty(_assertThisInitialized(_this), "onDelete", function (index) {
      return function () {
        var model = _this.state.model;
        var onChangeValidate = _this.props.onChangeValidate;
        var newModel = model;
        newModel.splice(index, 1);

        _this.setState({
          model: newModel
        });

        onChangeValidate(model);
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getAddButton", function () {
      var _this$props2 = _this.props,
          form = _this$props2.form,
          classes = _this$props2.classes;

      var AddButton = form.AddButton || function (props) {
        return _react["default"].createElement(_Button["default"], _extends({
          className: classes.addButton,
          variant: "contained",
          color: "primary"
        }, props));
      };

      return _react["default"].createElement(AddButton, {
        onClick: _this.onAppend
      }, form.add || "Add");
    });

    var _this$props3 = _this.props,
        _form = _this$props3.form,
        _model = _this$props3.model; // we have the model here for the entire form, get the model for this array only
    // and add to the state. if is empty, add an entry by calling onAppend directly.

    _this.state = {
      model: _utils["default"].selectOrSet(_form.key, _model) || []
    };
    return _this;
  }

  _createClass(ArrayComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props4 = this.props,
          form = _this$props4.form,
          model = _this$props4.model; // Always start with one empty form unless configured otherwise.

      if (form.startEmpty !== true && model.length === 0) {
        this.onAppend();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props5 = this.props,
          classes = _this$props5.classes,
          form = _this$props5.form,
          builder = _this$props5.builder,
          model = _this$props5.model,
          mapper = _this$props5.mapper,
          onChange = _this$props5.onChange,
          getLocalizedString = _this$props5.localization.getLocalizedString;
      var stateModel = this.state.model;
      var arrays = [];

      var _loop = function _loop(i) {
        var item = stateModel[i];
        var forms = form.items.map(function (eachForm, index) {
          var copy = ArrayComponent.copyWithIndex(eachForm, i);
          return builder(copy, model, index, mapper, onChange, builder, {
            arrayIndex: i
          });
        });
        arrays.push(_react["default"].createElement(_Card["default"], {
          className: classes.arrayItem,
          key: item && item[ArrayComponent.ITEM_ID] || i
        }, _react["default"].createElement("div", {
          className: classes.elementsContainer
        }, forms), _react["default"].createElement(_IconButton["default"], {
          onClick: _this2.onDelete(i),
          className: classes.deleteItemButton
        }, _react["default"].createElement(_Close["default"], {
          fontSize: "small"
        }))));
      };

      for (var i = 0; i < stateModel.length; i += 1) {
        _loop(i);
      }

      return _react["default"].createElement("div", {
        className: classes.root
      }, _react["default"].createElement("div", {
        style: {
          display: "flex"
        }
      }, _react["default"].createElement(_FormLabel["default"], {
        required: form.required,
        className: classes.title
      }, form.title && getLocalizedString(form.title)), this.getAddButton()), _react["default"].createElement("div", null, arrays));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var form = props.form;
      var propsKey = form.key;

      if (props.form && propsKey === state.formKey && props.model && props.model[propsKey] === state.model) {
        return null; // nothing changed
      }

      var model = _utils["default"].selectOrSet(propsKey, props.model) || [];
      return {
        formKey: propsKey,
        model: model.map(ArrayComponent.assignItemId)
      };
    }
  }]);

  return ArrayComponent;
}(_react.Component);

_defineProperty(ArrayComponent, "setIndex", function (index) {
  return function (form) {
    if (form.key) {
      // todo fix mutable object
      // eslint-disable-next-line no-param-reassign
      form.key[form.key.indexOf("")] = index;
    }
  };
});

_defineProperty(ArrayComponent, "copyWithIndex", function (form, index) {
  var copy = (0, _cloneDeep["default"])(form);
  copy.arrayIndex = index;

  _utils["default"].traverseForm(copy, ArrayComponent.setIndex(index));

  return copy;
});

_defineProperty(ArrayComponent, "ITEM_ID", Symbol("_SCHEMAFORM_ITEM_ID"));

var _default = (0, _ComposedComponent["default"])((0, _styles.withStyles)(styles)(ArrayComponent));

exports["default"] = _default;