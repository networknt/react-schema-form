//var React = require('react');
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var utils = require('./utils');

exports['default'] = function (ComposedComponent) {
    return (function (_React$Component) {
        _inherits(_class, _React$Component);

        function _class(props) {
            _classCallCheck(this, _class);

            _get(Object.getPrototypeOf(_class.prototype), 'constructor', this).call(this, props);
            this.onChangeValidate = this.onChangeValidate.bind(this);
            var value = this.defaultValue();
            var validationResult = utils.validate(this.props.form, value);
            this.state = {
                value: value,
                valid: !!(validationResult.valid || !value),
                error: !validationResult.valid && value ? validationResult.error.message : null
            };
        }

        _createClass(_class, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                if (typeof this.state.value !== 'undefined') {
                    this.props.onChange(this.props.form.key, this.state.value);
                }
            }

            /**
             * Called when <input> value changes.
             * @param e The input element, or something.
             */
        }, {
            key: 'onChangeValidate',
            value: function onChangeValidate(e) {
                //console.log('onChangeValidate e', e);
                var value = null;
                if (this.props.form.schema.type === 'integer' || this.props.form.schema.type === 'number') {
                    if (e.target.value.indexOf('.') == -1) {
                        value = parseInt(e.target.value);
                    } else {
                        value = parseFloat(e.target.value);
                    }
                } else if (this.props.form.schema.type === 'boolean') {
                    value = e.target.checked;
                } else if (this.props.form.schema.type === 'date' || this.props.form.schema.type === 'array') {
                    value = e;
                } else {
                    // string
                    value = e.target.value;
                }
                //console.log('onChangeValidate this.props.form, value', this.props.form, value);
                var validationResult = utils.validate(this.props.form, value);
                this.setState({
                    value: value,
                    valid: validationResult.valid,
                    error: validationResult.valid ? null : validationResult.error.message
                });
                //console.log('conhangeValidate this.props.form.key, value', this.props.form.key, value);
                this.props.onChange(this.props.form.key, value);
            }
        }, {
            key: 'defaultValue',
            value: function defaultValue() {
                // check if there is a value in the model, if there is, display it. Otherwise, check if
                // there is a default value, display it.
                //console.log('Text.defaultValue key', this.props.form.key);
                //console.log('Text.defaultValue model', this.props.model);
                var value = utils.selectOrSet(this.props.form.key, this.props.model);
                //console.log('Text defaultValue value = ', value);

                // check if there is a default value
                if (!value && this.props.form['default']) {
                    value = this.props.form['default'];
                }

                if (!value && this.props.form.schema && this.props.form.schema['default']) {
                    value = this.props.form.schema['default'];
                }

                // Support for Select
                // The first value in the option will be the default.
                if (!value && this.props.form.titleMap && this.props.form.titleMap[0].value) {
                    value = this.props.form.titleMap[0].value;
                }
                //console.log('value', value);
                return value;
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2['default'].createElement(ComposedComponent, _extends({}, this.props, this.state, { onChangeValidate: this.onChangeValidate }));
            }
        }]);

        return _class;
    })(_react2['default'].Component);
};

module.exports = exports['default'];