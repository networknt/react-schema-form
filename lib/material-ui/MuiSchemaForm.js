/**
 * Created by steve on 11/09/15.
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./../utils');

var _utils2 = _interopRequireDefault(_utils);

var _MuiNumber = require('./MuiNumber');

var _MuiNumber2 = _interopRequireDefault(_MuiNumber);

var _MuiText = require('./MuiText');

var _MuiText2 = _interopRequireDefault(_MuiText);

var _MuiTextArea = require('./MuiTextArea');

var _MuiTextArea2 = _interopRequireDefault(_MuiTextArea);

var _MuiSelect = require('./MuiSelect');

var _MuiSelect2 = _interopRequireDefault(_MuiSelect);

var _MuiRadios = require('./MuiRadios');

var _MuiRadios2 = _interopRequireDefault(_MuiRadios);

var _MuiDate = require('./MuiDate');

var _MuiDate2 = _interopRequireDefault(_MuiDate);

var MuiSchemaForm = (function (_React$Component) {
    _inherits(MuiSchemaForm, _React$Component);

    function MuiSchemaForm(props) {
        _classCallCheck(this, MuiSchemaForm);

        _get(Object.getPrototypeOf(MuiSchemaForm.prototype), 'constructor', this).call(this, props);
        this.onChange = this.onChange.bind(this);
    }

    _createClass(MuiSchemaForm, [{
        key: 'onChange',
        value: function onChange(key, val) {
            this.props.onModelChange(key, val);
        }
    }, {
        key: 'render',
        value: function render() {
            var merged = _utils2['default'].merge(this.props.schema, this.props.form, this.props.ignore, this.props.option);
            //console.log('SchemaForm merged = ', JSON.stringify(merged, undefined, 2));
            //console.log('SchemaForm render merged ', merged);
            var forms = merged.map((function (form, index) {
                return MuiSchemaForm.renderSchema(form, this.props.model, form.key[0], this.onChange);
            }).bind(this));

            return _react2['default'].createElement(
                'div',
                { style: { width: '100%' }, className: 'muiSchemaForm' },
                forms
            );
        }
    }], [{
        key: 'renderSchema',
        value: function renderSchema(form, model, index, onChange) {
            var result;
            switch (form.type) {
                case 'number':
                    result = _react2['default'].createElement(_MuiNumber2['default'], { model: model, form: form, key: index, onChange: onChange });
                    break;
                case 'text':
                    result = _react2['default'].createElement(_MuiText2['default'], { model: model, form: form, key: index, onChange: onChange, className: 'muiSchemaForm' });
                    break;
                case 'textarea':
                    result = _react2['default'].createElement(_MuiTextArea2['default'], { model: model, form: form, key: index, onChange: onChange });
                    break;
                case 'select':
                    result = _react2['default'].createElement(_MuiSelect2['default'], { model: model, form: form, key: index, onChange: onChange });
                    break;
                case 'radios':
                    result = _react2['default'].createElement(_MuiRadios2['default'], { model: model, form: form, key: index, onChange: onChange });
                    break;
                case 'date':
                    result = _react2['default'].createElement(_MuiDate2['default'], { model: model, form: form, key: index, onChange: onChange });
                    break;
            }
            return result;
        }
    }]);

    return MuiSchemaForm;
})(_react2['default'].Component);

module.exports = MuiSchemaForm;