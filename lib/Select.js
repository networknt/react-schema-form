'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ComposedComponent = require('./ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

var _core = require('@material-ui/core');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by steve on 15/09/15.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Select2 = function (_React$Component) {
    _inherits(Select2, _React$Component);

    function Select2(props) {
        _classCallCheck(this, Select2);

        var _this = _possibleConstructorReturn(this, (Select2.__proto__ || Object.getPrototypeOf(Select2)).call(this, props));

        _this.onSelected = _this.onSelected.bind(_this);

        var _this$props = _this.props,
            model = _this$props.model,
            form = _this$props.form;
        var key = form.key;


        var storedValue = model && _this.getModelKey(model, key) || false;
        var defaultValue = form.schema.default || false;
        var value = !_lodash2.default.isEmpty(storedValue) && storedValue || defaultValue;

        _this.props.setDefault(key, model, form, value);
        _this.state = {
            currentValue: value
        };
        return _this;
    }

    _createClass(Select2, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.model && nextProps.form.key) {
                this.setState({
                    currentValue: this.getModelKey(nextProps.model, nextProps.form.key) || (nextProps.form.titleMap != null ? nextProps.form.titleMap[0].value : '')
                });
            }
        }
    }, {
        key: 'getModelKey',
        value: function getModelKey(model, key) {
            if (Array.isArray(key)) {
                return key.reduce(function (cur, nxt) {
                    return cur[nxt] || {};
                }, model);
            } else {
                return model[key];
            }
        }
    }, {
        key: 'onSelected',
        value: function onSelected(event) {

            this.setState({
                currentValue: event.target.value
            });

            this.props.onChangeValidate(event);
        }
    }, {
        key: 'render',
        value: function render() {

            var menuItems = this.props.form.titleMap.map(function (item, idx) {
                return _react2.default.createElement(
                    _core.MenuItem,
                    { key: idx, value: item.name },
                    item.name
                );
            });

            return _react2.default.createElement(
                _core.FormControl,
                { style: { width: '100%' } },
                _react2.default.createElement(
                    _core.InputLabel,
                    { htmlFor: 'age-simple' },
                    this.props.form.title
                ),
                _react2.default.createElement(
                    _core.Select,
                    {
                        disabled: this.props.form.readonly,
                        value: this.state.currentValue ? this.state.currentValue : '',
                        onChange: this.onSelected
                    },
                    ' ',
                    menuItems
                )
            );
        }
    }]);

    return Select2;
}(_react2.default.Component);

var _default = (0, _ComposedComponent2.default)(Select2);

exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Select2, 'Select2', 'src/Select.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/Select.js');
}();

;