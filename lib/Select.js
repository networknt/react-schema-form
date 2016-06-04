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

var _materialUiMenuItem = require('material-ui/MenuItem');

var _materialUiMenuItem2 = _interopRequireDefault(_materialUiMenuItem);

var _materialUiSelectField = require('material-ui/SelectField');

var _materialUiSelectField2 = _interopRequireDefault(_materialUiSelectField);

var Select = (function (_React$Component) {
    _inherits(Select, _React$Component);

    function Select(props) {
        _classCallCheck(this, Select);

        _get(Object.getPrototypeOf(Select.prototype), 'constructor', this).call(this, props);
        this.onSelected = this.onSelected.bind(this);
        this.state = {
            currentValue: this.props.form.titleMap != null ? this.props.form.titleMap[0].value : ""
        };
    }

    _createClass(Select, [{
        key: 'onSelected',
        value: function onSelected(event, selectedIndex, menuItem) {

            this.setState({
                currentValue: menuItem
            });
            event.target.value = menuItem;
            this.props.onChangeValidate(event);
        }
    }, {
        key: 'render',
        value: function render() {
            var menuItems = this.props.form.titleMap.map(function (item, idx) {
                return _react2['default'].createElement(_materialUiMenuItem2['default'], { key: idx,
                    primaryText: item.name,
                    value: item.value });
            });

            return _react2['default'].createElement(
                _materialUiSelectField2['default'],
                {
                    value: this.state.currentValue,
                    floatingLabelText: this.props.form.title,
                    disabled: this.props.form.readonly,
                    onChange: this.onSelected,
                    fullWidth: true },
                menuItems
            );
        }
    }]);

    return Select;
})(_react2['default'].Component);

exports['default'] = (0, _ComposedComponent2['default'])(Select);
module.exports = exports['default'];