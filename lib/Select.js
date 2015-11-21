/**
 * Created by steve on 01/11/15.
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

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ValidationMixin = require('./ValidationMixin');

var _ValidationMixin2 = _interopRequireDefault(_ValidationMixin);

var ReactSelect = require('react-select');

var Select = (function (_React$Component) {
    _inherits(Select, _React$Component);

    function Select(props) {
        _classCallCheck(this, Select);

        _get(Object.getPrototypeOf(Select.prototype), 'constructor', this).call(this, props);
        this.onSelectChange = this.onSelectChange.bind(this);
        console.log("titleMap", this.props.form.titleMap);
    }

    _createClass(Select, [{
        key: 'onSelectChange',
        value: function onSelectChange(e) {
            this.props.onChangeValidate({ target: { value: e } });
        }
    }, {
        key: 'render',
        value: function render() {
            var formClasses = (0, _classnames2['default'])('form-group', 'schema-form-select', this.props.form.htmlClass, { 'has-error': this.props.valid === false }, this.props.form.htmlClass, { 'has-success': this.props.valid === true && this.props.value != null });
            var labelClasses = (0, _classnames2['default'])('control-label', this.props.form.labelHtmlClass);
            var fieldClasses = (0, _classnames2['default'])('form-control', this.props.form.fieldHtmlClass);

            return _react2['default'].createElement(
                'div',
                { style: { display: 'block', position: 'relative', marginBottom: '20px' } },
                _react2['default'].createElement(
                    'label',
                    { className: labelClasses },
                    this.props.form.title
                ),
                _react2['default'].createElement(ReactSelect, {
                    value: this.props.value,
                    onChange: this.onSelectChange,
                    id: this.props.form.key.slice(-1)[0],
                    name: this.props.form.key.slice(-1)[0],
                    options: this.props.form.titleMap,
                    labelKey: 'name',
                    valueKey: 'value' })
            );
        }
    }]);

    return Select;
})(_react2['default'].Component);

exports['default'] = (0, _ValidationMixin2['default'])(Select);
module.exports = exports['default'];