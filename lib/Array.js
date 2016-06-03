/**
 * Created by steve on 11/09/15.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _Number = require('./Number');

var _Number2 = _interopRequireDefault(_Number);

var _Text = require('./Text');

var _Text2 = _interopRequireDefault(_Text);

var _TextArea = require('./TextArea');

var _TextArea2 = _interopRequireDefault(_TextArea);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _Radios = require('./Radios');

var _Radios2 = _interopRequireDefault(_Radios);

var _Date = require('./Date');

var _Date2 = _interopRequireDefault(_Date);

var _Checkbox = require('./Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Help = require('./Help');

var _Help2 = _interopRequireDefault(_Help);

var _ComposedComponent = require('./ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

var _materialUiRaisedButton = require('material-ui/RaisedButton');

var _materialUiRaisedButton2 = _interopRequireDefault(_materialUiRaisedButton);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _SchemaForm = require('./SchemaForm');

var _SchemaForm2 = _interopRequireDefault(_SchemaForm);

var _materialUiIconButton = require('material-ui/IconButton');

var _materialUiIconButton2 = _interopRequireDefault(_materialUiIconButton);

var Array = (function (_React$Component) {
    _inherits(Array, _React$Component);

    function Array(props) {
        _classCallCheck(this, Array);

        _get(Object.getPrototypeOf(Array.prototype), 'constructor', this).call(this, props);
        this.onAppend = this.onAppend.bind(this);
        this.onDelete = this.onDelete.bind(this);
        // we have the model here for the entire form, get the model for this array only
        // and add to the state. if is empty, add an entry by calling onAppend directly.
        this.state = {
            model: _utils2['default'].selectOrSet(this.props.form.key, this.props.model) || []
        };
        //console.log('constructor', this.props.form.key, this.props.model, this.state.model);
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
                            _utils2['default'].traverseSchema(items, function (prop, path) {
                                if (typeof prop['default'] !== 'undefined') {
                                    _utils2['default'].selectOrSet(path, empty, prop['default']);
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
            //console.log('onDelete is called', index);
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
            var copy = _lodash2['default'].cloneDeep(form);
            copy.arrayIndex = index;
            _utils2['default'].traverseForm(copy, this.setIndex(index));
            return copy;
        }
    }, {
        key: 'render',
        value: function render() {
            //console.log('Array.render', this.props.form.items, this.props.model, this.state.model);
            var arrays = [];
            var fields = [];
            var model = this.state.model;
            var items = this.props.form.items;
            //console.log('fields', fields);
            for (var i = 0; i < model.length; i++) {
                var boundOnDelete = this.onDelete.bind(this, i);
                var forms = this.props.form.items.map((function (form, index) {
                    var copy = this.copyWithIndex(form, i);
                    return this.props.builder(copy, this.props.model, index, this.props.onChange, this.props.mapper, this.props.builder);
                }).bind(this));
                //console.log('forms', i, forms);
                arrays.push(_react2['default'].createElement(
                    'li',
                    { key: i, className: 'list-group-item' },
                    _react2['default'].createElement(
                        _materialUiIconButton2['default'],
                        { iconClassName: 'material-icons', tooltip: 'Remove', onTouchTap: boundOnDelete },
                        'clear'
                    ),
                    forms
                ));
            }
            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    'div',
                    null,
                    _react2['default'].createElement(
                        'label',
                        { className: 'control-lable' },
                        this.props.form.title
                    ),
                    _react2['default'].createElement(
                        'ol',
                        { className: 'list-group' },
                        arrays
                    )
                ),
                _react2['default'].createElement(_materialUiRaisedButton2['default'], { label: this.props.form.add || 'Add', secondary: true, onTouchTap: this.onAppend })
            );
        }
    }]);

    return Array;
})(_react2['default'].Component);

exports['default'] = (0, _ComposedComponent2['default'])(Array);
module.exports = exports['default'];