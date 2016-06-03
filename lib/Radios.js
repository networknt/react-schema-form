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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ComposedComponent = require('./ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

var RadioButton = require('material-ui/RadioButton/RadioButton');
var RadioButtonGroup = require('material-ui/RadioButton/RadioButtonGroup');

var Radios = (function (_React$Component) {
    _inherits(Radios, _React$Component);

    function Radios() {
        _classCallCheck(this, Radios);

        _get(Object.getPrototypeOf(Radios.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Radios, [{
        key: 'render',
        value: function render() {
            var items = this.props.form.titleMap.map((function (item, index) {
                return _react2['default'].createElement(RadioButton, { label: item.name,
                    value: item.value,
                    key: index,
                    disabled: this.props.form.readonly
                });
            }).bind(this));

            return _react2['default'].createElement(
                'span',
                null,
                _react2['default'].createElement(
                    'label',
                    { className: 'control-lable' },
                    this.props.form.title
                ),
                _react2['default'].createElement(
                    RadioButtonGroup,
                    { defaultSelected: this.props.value, name: this.props.form.title, onChange: this.props.onChangeValidate },
                    items
                )
            );
        }
    }]);

    return Radios;
})(_react2['default'].Component);

exports['default'] = (0, _ComposedComponent2['default'])(Radios);
module.exports = exports['default'];
