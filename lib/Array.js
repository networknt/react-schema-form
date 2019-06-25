"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styles = require("@material-ui/core/styles");

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

var _Card = require("@material-ui/core/Card");

var _Card2 = _interopRequireDefault(_Card);

var _IconButton = require("@material-ui/core/IconButton");

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Close = require("@material-ui/icons/Close");

var _Close2 = _interopRequireDefault(_Close);

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _FormLabel = require("@material-ui/core/FormLabel");

var _FormLabel2 = _interopRequireDefault(_FormLabel);

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _ComposedComponent = require("./ComposedComponent");

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/**
 * Created by steve on 11/09/15.
 */


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

var ArrayComponent = function (_Component) {
    _inherits(ArrayComponent, _Component);

    _createClass(ArrayComponent, null, [{
        key: "assignItemId",
        value: function assignItemId(item) {
            var newItem = null;
            if (item && (typeof item === "undefined" ? "undefined" : _typeof(item)) === "object" && Array.isArray(item)) {
                newItem = [].concat(_toConsumableArray(item));
            } else if (item && (typeof item === "undefined" ? "undefined" : _typeof(item)) === "object" && !item[ArrayComponent.ITEM_ID]) {
                newItem = _extends({}, item);
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

    function ArrayComponent(props) {
        _classCallCheck(this, ArrayComponent);

        var _this = _possibleConstructorReturn(this, (ArrayComponent.__proto__ || Object.getPrototypeOf(ArrayComponent)).call(this, props));

        _initialiseProps.call(_this);

        var _this$props = _this.props,
            form = _this$props.form,
            model = _this$props.model;
        // we have the model here for the entire form, get the model for this array only
        // and add to the state. if is empty, add an entry by calling onAppend directly.

        _this.state = {
            model: _utils2.default.selectOrSet(form.key, model) || []
        };
        return _this;
    }

    _createClass(ArrayComponent, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _props = this.props,
                form = _props.form,
                model = _props.model;
            // Always start with one empty form unless configured otherwise.

            if (form.startEmpty !== true && model.length === 0) {
                this.onAppend();
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props2 = this.props,
                classes = _props2.classes,
                form = _props2.form,
                builder = _props2.builder,
                model = _props2.model,
                mapper = _props2.mapper,
                onChange = _props2.onChange,
                getLocalizedString = _props2.localization.getLocalizedString;
            var stateModel = this.state.model;

            var arrays = [];

            var _loop = function _loop(i) {
                var item = stateModel[i];
                var forms = form.items.map(function (eachForm, index) {
                    var copy = ArrayComponent.copyWithIndex(eachForm, i);
                    return builder(copy, model, index, mapper, onChange, builder);
                });
                arrays.push(_react2.default.createElement(
                    _Card2.default,
                    {
                        className: classes.arrayItem,
                        key: item && item[ArrayComponent.ITEM_ID] || i
                    },
                    _react2.default.createElement(
                        "div",
                        { className: classes.elementsContainer },
                        forms
                    ),
                    _react2.default.createElement(
                        _IconButton2.default,
                        {
                            onClick: _this2.onDelete(i),
                            className: classes.deleteItemButton
                        },
                        _react2.default.createElement(_Close2.default, { fontSize: "small" })
                    )
                ));
            };

            for (var i = 0; i < stateModel.length; i += 1) {
                _loop(i);
            }
            return _react2.default.createElement(
                "div",
                { className: classes.root },
                _react2.default.createElement(
                    "div",
                    { style: { display: "flex" } },
                    _react2.default.createElement(
                        _FormLabel2.default,
                        {
                            required: form.required,
                            className: classes.title
                        },
                        form.title && getLocalizedString(form.title)
                    ),
                    this.getAddButton()
                ),
                _react2.default.createElement(
                    "div",
                    null,
                    arrays
                )
            );
        }
    }], [{
        key: "getDerivedStateFromProps",
        value: function getDerivedStateFromProps(props, state) {
            var form = props.form;

            var propsKey = form.key;
            if (props.form && propsKey === state.formKey && props.model && props.model[propsKey] === state.model) {
                return null; // nothing changed
            }
            var model = _utils2.default.selectOrSet(propsKey, props.model) || [];
            return {
                formKey: propsKey,
                model: model.map(ArrayComponent.assignItemId)
            };
        }
    }]);

    return ArrayComponent;
}(_react.Component);

ArrayComponent.ITEM_ID = Symbol("_SCHEMAFORM_ITEM_ID");

ArrayComponent.setIndex = function (index) {
    return function (form) {
        if (form.key) {
            // todo fix mutable object
            // eslint-disable-next-line no-param-reassign
            form.key[form.key.indexOf("")] = index;
        }
    };
};

ArrayComponent.copyWithIndex = function (form, index) {
    var copy = (0, _cloneDeep2.default)(form);
    copy.arrayIndex = index;
    _utils2.default.traverseForm(copy, ArrayComponent.setIndex(index));
    return copy;
};

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.SEQUENCE = 1;

    this.onAppend = function () {
        var _props3 = _this3.props,
            form = _props3.form,
            options = _props3.options,
            onChangeValidate = _props3.onChangeValidate;
        var model = _this3.state.model;

        var empty = void 0;
        if (form && form.schema && form.schema.items) {
            var items = form.schema.items;

            if (items.type && items.type.indexOf("object") !== -1) {
                empty = {};

                // Check for possible defaults
                if (!options || options.setSchemaDefaults !== false) {
                    empty = typeof items.default !== "undefined" ? items.default : empty;

                    // Check for defaults further down in the schema.
                    // If the default instance sets the new array item to something falsy, i.e. null
                    // then there is no need to go further down.
                    if (empty) {
                        _utils2.default.traverseSchema(items, function (prop, path) {
                            if (typeof prop.default !== "undefined") {
                                _utils2.default.selectOrSet(path, empty, prop.default);
                            }
                        });
                    }
                }
            } else if (items.type && items.type.indexOf("array") !== -1) {
                empty = [];
                if (!options || options.setSchemaDefaults !== false) {
                    empty = items.default || empty;
                }
            } else if (!options || options.setSchemaDefaults !== false) {
                // No type? could still have defaults.
                empty = items.default || empty;
            }
        }
        var newModel = model;
        ArrayComponent.assignItemId(empty);
        newModel.push(empty);
        _this3.setState({
            model: newModel
        });
        onChangeValidate(model);
    };

    this.onDelete = function (index) {
        return function () {
            var model = _this3.state.model;
            var onChangeValidate = _this3.props.onChangeValidate;

            var newModel = model;
            newModel.splice(index, 1);
            _this3.setState({
                model: newModel
            });
            onChangeValidate(model);
        };
    };

    this.getAddButton = function () {
        var _props4 = _this3.props,
            form = _props4.form,
            classes = _props4.classes;


        var AddButton = form.AddButton || function (props) {
            return _react2.default.createElement(_Button2.default, _extends({
                className: classes.addButton,
                variant: "contained",
                color: "primary"
            }, props));
        };
        return _react2.default.createElement(
            AddButton,
            { onClick: _this3.onAppend },
            form.add || "Add"
        );
    };
};

exports.default = (0, _ComposedComponent2.default)((0, _styles.withStyles)(styles)(ArrayComponent));