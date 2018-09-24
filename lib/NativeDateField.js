'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Native date field. 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Contains common logic for final components Date and DateTime.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */


var NativeDateField = function (_React$Component) {
    _inherits(NativeDateField, _React$Component);

    function NativeDateField(props) {
        _classCallCheck(this, NativeDateField);

        var _this = _possibleConstructorReturn(this, (NativeDateField.__proto__ || Object.getPrototypeOf(NativeDateField)).call(this, props));

        _this.onDatePicked = _this.onDatePicked.bind(_this);
        return _this;
    }

    _createClass(NativeDateField, [{
        key: 'onDatePicked',
        value: function onDatePicked(e) {
            var date = new Date(e.target.value);
            this.props.onChangeValidate(date);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                form = _props.form,
                value = _props.value,
                type = _props.type;
            // {shrink: true} fixes rendering of TextField without value
            // see https://github.com/mui-org/material-ui/issues/8131#issuecomment-328373902

            return _react2.default.createElement(_TextField2.default, {
                label: form.title,
                type: type,
                defaultValue: value,
                InputLabelProps: { shrink: true },
                onChange: this.onDatePicked,
                disabled: form.readonly
            });
        }
    }]);

    return NativeDateField;
}(_react2.default.Component);

exports.default = NativeDateField;