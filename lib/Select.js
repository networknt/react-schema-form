'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ComposedComponent = require('./ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

var _MenuItem = require('@material-ui/core/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Select = require('@material-ui/core/Select');

var _Select2 = _interopRequireDefault(_Select);

var _InputLabel = require('@material-ui/core/InputLabel');

var _InputLabel2 = _interopRequireDefault(_InputLabel);

var _FormControl = require('@material-ui/core/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by steve on 15/09/15.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Select = function (_React$Component) {
    _inherits(Select, _React$Component);

    function Select() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Select);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Select.__proto__ || Object.getPrototypeOf(Select)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            currentValue: _this.getInitialValue(_this.props.model, _this.props.form)
        }, _this.onSelected = function (event) {
            var currentValue = event.target.value;
            _this.setState({
                currentValue: currentValue
            });
            _this.props.onChangeValidate(event);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Select, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.model && nextProps.form.key) {
                this.setState({
                    currentValue: this.getInitialValue(nextProps.model, nextProps.form)
                });
            }
        }
    }, {
        key: 'getInitialValue',
        value: function getInitialValue(model, form) {
            return this.getModelValue(model, form.key) || (form.titleMap != null ? form.titleMap[0].value : '');
        }
    }, {
        key: 'getModelValue',
        value: function getModelValue(model, key) {
            if (Array.isArray(key)) {
                return key.reduce(function (cur, nxt) {
                    return cur && cur[nxt];
                }, model);
            } else {
                return model[key];
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var form = this.props.form;

            var menuItems = form.titleMap.map(function (item, idx) {
                return _react2.default.createElement(
                    _MenuItem2.default,
                    { key: idx, value: item.value },
                    item.name
                );
            });
            return _react2.default.createElement(
                _FormControl2.default,
                { fullWidth: true },
                _react2.default.createElement(
                    _InputLabel2.default,
                    null,
                    form.title
                ),
                _react2.default.createElement(
                    _Select2.default,
                    {
                        value: this.state.currentValue,
                        placeholder: form.title,
                        disabled: form.readonly,
                        onChange: this.onSelected
                    },
                    menuItems
                )
            );
        }
    }]);

    return Select;
}(_react2.default.Component);

exports.default = (0, _ComposedComponent2.default)(Select);