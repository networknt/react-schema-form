/**
 * Created by steve on 20/09/15.
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

var _ComposedComponent = require('./ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

var _materialUiCheckbox = require('material-ui/Checkbox');

var _materialUiCheckbox2 = _interopRequireDefault(_materialUiCheckbox);

var Checkbox2 = (function (_React$Component) {
    _inherits(Checkbox2, _React$Component);

    function Checkbox2() {
        _classCallCheck(this, Checkbox2);

        _get(Object.getPrototypeOf(Checkbox2.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Checkbox2, [{
        key: 'render',
        value: function render() {
            var _this = this;

            return _react2['default'].createElement(_materialUiCheckbox2['default'], {
                name: this.props.form.key.slice(-1)[0],
                value: this.props.form.key.slice(-1)[0],
                defaultChecked: this.props.value || false,
                label: this.props.form.title,
                disabled: this.props.form.readonly,
                onCheck: function (e, checked) {
                    _this.props.onChangeValidate(e);
                }
            });
        }
    }]);

    return Checkbox2;
})(_react2['default'].Component);

exports['default'] = (0, _ComposedComponent2['default'])(Checkbox2);
module.exports = exports['default'];