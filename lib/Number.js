'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ComposedComponent = require('./ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by steve on 15/09/15.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */
var Number = function (_React$Component) {
    _inherits(Number, _React$Component);

    function Number(props) {
        _classCallCheck(this, Number);

        var _this = _possibleConstructorReturn(this, (Number.__proto__ || Object.getPrototypeOf(Number)).call(this, props));

        _this.preValidationCheck = _this.preValidationCheck.bind(_this);
        _this.state = {
            lastSuccessfulValue: _this.props.value
        };
        _this.numberField = _react2.default.createRef();
        return _this;
    }

    _createClass(Number, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({
                lastSuccessfulValue: nextProps.value
            });
        }
    }, {
        key: 'isNumeric',
        value: function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty(n) {
            return !n || 0 === n.length;
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
            } else if (this.isEmpty(e.target.value)) {
                this.setState({
                    lastSuccessfulValue: e.target.value
                });
                this.props.onChangeValidate(e);
            } else {
                this.numberField.current.value = this.state.lastSuccessfulValue;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                form = _props.form,
                error = _props.error;

            return _react2.default.createElement(_TextField2.default, {
                type: form.type,
                label: form.title,
                placeholder: form.placeholder,
                helperText: error || form.description,
                error: !!error,
                onChange: this.preValidationCheck,
                value: this.state.lastSuccessfulValue,
                ref: this.numberField,
                disabled: form.readonly,
                fullWidth: true
            });
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
        }
    }]);

    return Number;
}(_react2.default.Component);

var _default = (0, _ComposedComponent2.default)(Number);

exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(Number, 'Number', 'src/Number.js');
    reactHotLoader.register(_default, 'default', 'src/Number.js');
    leaveModule(module);
})();

;