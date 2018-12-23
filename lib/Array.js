"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

var _ComposedComponent = require("./ComposedComponent");

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
            padding: theme.spacing.unit,
            marginBottom: theme.spacing.unit,
            display: "flex"
        },
        deleteItemButton: {
            margin: [[-theme.spacing.unit, -theme.spacing.unit, "auto", "auto"]]
        },
        addButton: {
            marginTop: theme.spacing.unit
        }
    };
};

var Array = function (_Component) {
    _inherits(Array, _Component);

    _createClass(Array, null, [{
        key: "assignItemId",
        value: function assignItemId(item) {
            if (item && (typeof item === "undefined" ? "undefined" : _typeof(item)) === "object" && !item[Array.ITEM_ID]) {
                var newItem = Object.assign({}, item);
                // define hidden property with internal id
                Object.defineProperty(newItem, Array.ITEM_ID, {
                    enumerable: false,
                    writable: true
                });
                Array.SEQUENCE += 1;
                newItem[Array.ITEM_ID] = Array.SEQUENCE;
                return newItem;
            }
            return item;
        }
    }]);

    function Array(props) {
        _classCallCheck(this, Array);

        var _this = _possibleConstructorReturn(this, (Array.__proto__ || Object.getPrototypeOf(Array)).call(this, props));

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

    _createClass(Array, [{
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
                    var copy = Array.copyWithIndex(eachForm, i);
                    return builder(copy, model, index, mapper, onChange, builder);
                });
                arrays.push(_react2.default.createElement(
                    _Card2.default,
                    {
                        className: classes.arrayItem,
                        key: item && item[Array.ITEM_ID] || i
                    },
                    _react2.default.createElement(
                        "div",
                        null,
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
                null,
                _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                        _Typography2.default,
                        { variant: "h6" },
                        getLocalizedString(form.title)
                    ),
                    _react2.default.createElement(
                        "div",
                        null,
                        arrays
                    )
                ),
                _react2.default.createElement(
                    _Button2.default,
                    {
                        className: classes.addButton,
                        variant: "contained",
                        color: "primary",
                        onClick: this.onAppend
                    },
                    form.add || "Add"
                )
            );
        }
    }], [{
        key: "getDerivedStateFromProps",
        value: function getDerivedStateFromProps(props, state) {
            var propsKey = props.form.key;
            if (props.form && propsKey === state.formKey && props.model && props.model[propsKey] === state.model) {
                return null; // nothing changed
            }
            var model = _utils2.default.selectOrSet(propsKey, props.model) || [];
            return {
                formKey: propsKey,
                model: model.map(Array.assignItemId)
            };
        }
    }]);

    return Array;
}(_react.Component);

Array.ITEM_ID = "_SCHEMAFORM_ITEM_ID";
Array.SEQUENCE = 1;

Array.setIndex = function (index) {
    return function (form) {
        if (form.key) {
            // todo fix mutable object
            // eslint-disable-next-line no-param-reassign
            form.key[form.key.indexOf("")] = index;
        }
    };
};

Array.copyWithIndex = function (form, index) {
    var copy = (0, _cloneDeep2.default)(form);
    copy.arrayIndex = index;
    _utils2.default.traverseForm(copy, Array.setIndex(index));
    return copy;
};

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

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
        Array.assignItemId(empty);
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
};

exports.default = (0, _ComposedComponent2.default)((0, _styles.withStyles)(styles)(Array));