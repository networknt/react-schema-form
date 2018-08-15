'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ComposedComponent = require('./ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

var _core = require('@material-ui/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Radios = function (_React$Component) {
    _inherits(Radios, _React$Component);

    function Radios() {
        _classCallCheck(this, Radios);

        return _possibleConstructorReturn(this, (Radios.__proto__ || Object.getPrototypeOf(Radios)).apply(this, arguments));
    }

    _createClass(Radios, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            //console.log("VALUE", this.state.value);
            var items = this.props.form.titleMap.map(function (item, index) {
                return _react2.default.createElement(_core.FormControlLabel, {
                    key: index,
                    label: item.name,
                    value: item.value,
                    disabled: this.props.form.readonly,
                    control: _react2.default.createElement(_core.Radio, {
                        checked: this.props.value === item.value })
                });
            }.bind(this));

            return _react2.default.createElement(
                'span',
                { className: this.props.form.htmlClass },
                _react2.default.createElement(
                    'label',
                    { className: 'control-lable' },
                    this.props.form.title
                ),
                _react2.default.createElement(
                    _core.RadioGroup,
                    { name: this.props.form.title, onChange: function onChange(e) {
                            return _this2.props.onChangeValidate(e);
                        } },
                    items
                )
            );
        }
    }]);

    return Radios;
}(_react2.default.Component);

var _default = (0, _ComposedComponent2.default)(Radios);

exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Radios, 'Radios', 'src/Radios.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/Radios.js');
}();

;