/**
 * Created by steve on 15/09/15.
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

var _materialUiTextField = require('material-ui/TextField');

var _materialUiTextField2 = _interopRequireDefault(_materialUiTextField);

/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */

var Number = (function (_React$Component) {
    _inherits(Number, _React$Component);

    function Number(props) {
        _classCallCheck(this, Number);

        _get(Object.getPrototypeOf(Number.prototype), 'constructor', this).call(this, props);
        this.preValidationCheck = this.preValidationCheck.bind(this);
        this.state = {
            lastSuccessfulValue: this.props.value
        };
    }

    _createClass(Number, [{
        key: 'isNumeric',
        value: function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        /**
         * Prevent the field from accepting non-numeric characters.
         * @param e
         */
    }, {
        key: 'preValidationCheck',
        value: function preValidationCheck(e) {
            if (this.isNumeric(e.target.value)) {
                this.setState({
                    lastSuccessfulValue: e.target.value
                });
                this.props.onChangeValidate(e);
            } else {
                this.refs.numberField.setValue(this.state.lastSuccessfulValue);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(_materialUiTextField2['default'], {
                type: this.props.form.type,
                floatingLabelText: this.props.form.title,
                hintText: this.props.form.placeholder,
                errorText: this.props.error,
                onChange: this.preValidationCheck,
                defaultValue: this.state.lastSuccessfulValue,
                ref: 'numberField',
                disabled: this.props.form.readonly,
                style: this.props.form.style || { width: '100%' } });
        }
    }]);

    return Number;
})(_react2['default'].Component);

exports['default'] = (0, _ComposedComponent2['default'])(Number);
module.exports = exports['default'];