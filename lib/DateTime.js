'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ComposedComponent = require('./ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var utils = require('./utils');
var classNames = require('classnames');

/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */
var DateTimeField = function (_React$Component) {
    _inherits(DateTimeField, _React$Component);

    function DateTimeField(props) {
        _classCallCheck(this, DateTimeField);

        var _this = _possibleConstructorReturn(this, (DateTimeField.__proto__ || Object.getPrototypeOf(DateTimeField)).call(this, props));

        _this.onDatePicked = _this.onDatePicked.bind(_this);
        return _this;
    }

    _createClass(DateTimeField, [{
        key: 'onDatePicked',
        value: function onDatePicked(e) {
            console.log(Date);
            var d = new Date(e.target.value);
            console.log(d.toJSON());
            this.props.onChangeValidate(d);
        }
    }, {
        key: 'render',
        value: function render() {
            var _React$createElement;

            var value = null;
            if (this.props && this.props.value) {
                value = this.props.value;
            }

            return _react2.default.createElement(
                'div',
                {
                    style: { width: '100%', display: 'block' },
                    className: this.props.form.htmlClass
                },
                _react2.default.createElement(_TextField2.default, (_React$createElement = {
                    type: 'datetime-local',
                    label: this.props.form.title
                }, _defineProperty(_React$createElement, 'type', 'datetime-local'), _defineProperty(_React$createElement, 'defaultValue', '2017-05-24T10:30'), _defineProperty(_React$createElement, 'onChange', this.onDatePicked), _defineProperty(_React$createElement, 'disabled', this.props.form.readonly), _React$createElement))
            );
        }
    }]);

    return DateTimeField;
}(_react2.default.Component);

var _default = (0, _ComposedComponent2.default)(DateTimeField);

exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(DateTimeField, 'DateTimeField', 'src/DateTime.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/DateTime.js');
}();

;