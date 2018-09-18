'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('@material-ui/core/styles');

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Delete = require('@material-ui/icons/Delete');

var _Delete2 = _interopRequireDefault(_Delete);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _ComposedComponent = require('./ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by steve on 11/09/15.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var styles = function styles(theme) {
    return {
        arrayItem: {
            position: 'relative',
            border: '1px dotted #aaa',
            padding: theme.spacing.unit,
            marginBottom: theme.spacing.unit
        },
        deleteItemButton: {
            position: 'absolute',
            top: -theme.spacing.unit,
            right: -theme.spacing.unit
        },
        addButton: {
            marginTop: theme.spacing.unit
        }
    };
};

var Array = function (_React$Component) {
    _inherits(Array, _React$Component);

    _createClass(Array, null, [{
        key: 'assignItemId',
        value: function assignItemId(item) {
            if (item && !item[Array.ITEM_ID]) {
                // define hidden property with internal id
                Object.defineProperty(item, Array.ITEM_ID, {
                    enumerable: false,
                    writable: true
                });
                item[Array.ITEM_ID] = Array._SEQUENCE++;
            }
            return item;
        }
    }]);

    function Array(props) {
        _classCallCheck(this, Array);

        var _this = _possibleConstructorReturn(this, (Array.__proto__ || Object.getPrototypeOf(Array)).call(this, props));

        _this.onAppend = _this.onAppend.bind(_this);
        _this.onDelete = _this.onDelete.bind(_this);
        // we have the model here for the entire form, get the model for this array only
        // and add to the state. if is empty, add an entry by calling onAppend directly.
        _this.state = {
            model: _utils2.default.selectOrSet(_this.props.form.key, _this.props.model) || []
        };
        //console.log('constructor', this.props.form.key, this.props.model, this.state.model);
        return _this;
    }

    _createClass(Array, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            // Always start with one empty form unless configured otherwise.
            if (this.props.form.startEmpty !== true && this.state.model.length === 0) {
                this.onAppend();
            }
        }
    }, {
        key: 'onAppend',
        value: function onAppend() {
            //console.log('onAppend is called this.state.model', this.state.model);
            var empty;
            if (this.props.form && this.props.form.schema && this.props.form.schema.items) {
                var items = this.props.form.schema.items;
                if (items.type && items.type.indexOf('object') !== -1) {
                    empty = {};

                    // Check for possible defaults
                    if (!this.props.options || this.props.options.setSchemaDefaults !== false) {
                        empty = typeof items['default'] !== 'undefined' ? items['default'] : empty;

                        // Check for defaults further down in the schema.
                        // If the default instance sets the new array item to something falsy, i.e. null
                        // then there is no need to go further down.
                        if (empty) {
                            _utils2.default.traverseSchema(items, function (prop, path) {
                                if (typeof prop['default'] !== 'undefined') {
                                    _utils2.default.selectOrSet(path, empty, prop['default']);
                                }
                            });
                        }
                    }
                } else if (items.type && items.type.indexOf('array') !== -1) {
                    empty = [];
                    if (!this.props.options || this.props.options.setSchemaDefaults !== false) {
                        empty = items['default'] || empty;
                    }
                } else {
                    // No type? could still have defaults.
                    if (!this.props.options || this.props.options.setSchemaDefaults !== false) {
                        empty = items['default'] || empty;
                    }
                }
            }
            var newModel = this.state.model;
            Array.assignItemId(empty);
            newModel.push(empty);
            this.setState({
                model: newModel
            });
            this.props.onChangeValidate(this.state.model);
            //console.log('After append this.state.model', newModel);
        }
    }, {
        key: 'onDelete',
        value: function onDelete(index) {
            // console.log('onDelete is called', index);
            var newModel = this.state.model;
            newModel.splice(index, 1);
            this.setState({
                model: newModel
            });
            this.props.onChangeValidate(this.state.model);
        }
    }, {
        key: 'setIndex',
        value: function setIndex(index) {
            return function (form) {
                if (form.key) {
                    form.key[form.key.indexOf('')] = index;
                }
            };
        }
    }, {
        key: 'copyWithIndex',
        value: function copyWithIndex(form, index) {
            var copy = _lodash2.default.cloneDeep(form);
            copy.arrayIndex = index;
            _utils2.default.traverseForm(copy, this.setIndex(index));
            return copy;
        }
    }, {
        key: 'render',
        value: function render() {
            //console.log('Array.render', this.props.form.items, this.props.model, this.state.model);
            var _props = this.props,
                classes = _props.classes,
                form = _props.form;

            var arrays = [];
            var model = this.state.model;
            // console.log('Array.render', model);
            for (var i = 0; i < model.length; i++) {
                var item = model[i];
                var onItemDelete = this.onDelete.bind(this, i);
                var forms = form.items.map(function (form, index) {
                    var copy = this.copyWithIndex(form, i);
                    return this.props.builder(copy, this.props.model, index, this.props.onChange, this.props.mapper, this.props.builder);
                }.bind(this));
                //console.log('forms', i, forms);
                arrays.push(_react2.default.createElement(
                    'div',
                    { className: classes.arrayItem, key: item && item[Array.ITEM_ID] || i },
                    _react2.default.createElement(
                        _IconButton2.default,
                        { onClick: onItemDelete, className: classes.deleteItemButton },
                        _react2.default.createElement(_Delete2.default, { fontSize: 'small' })
                    ),
                    forms
                ));
            }
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        this.props.form.title
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        arrays
                    )
                ),
                _react2.default.createElement(
                    _Button2.default,
                    { className: classes.addButton, variant: 'contained', color: 'primary', onClick: this.onAppend },
                    this.props.form.add || 'Add'
                )
            );
        }
    }], [{
        key: 'getDerivedStateFromProps',
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
}(_react2.default.Component);

Array.ITEM_ID = '_SCHEMAFORM_ITEM_ID';
Array._SEQUENCE = 1;
exports.default = (0, _ComposedComponent2.default)((0, _styles.withStyles)(styles)(Array));