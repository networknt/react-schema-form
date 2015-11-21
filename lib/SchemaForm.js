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

var _Number = require('./Number');

var _Number2 = _interopRequireDefault(_Number);

var _Text = require('./Text');

var _Text2 = _interopRequireDefault(_Text);

var _Textarea = require('./Textarea');

var _Textarea2 = _interopRequireDefault(_Textarea);

var utils = require('./utils');
var FormField = require('./FormField');

var Section = require('./Section');
var Help = require('./Help');
var Checkbox = require('./Checkbox');
var Submit = require('./Submit');
var Array = require('./Array');
var Select = require('./Select');
var Radios = require('./Radios');

var SchemaForm = (function (_React$Component) {
    _inherits(SchemaForm, _React$Component);

    function SchemaForm(props) {
        _classCallCheck(this, SchemaForm);

        _get(Object.getPrototypeOf(SchemaForm.prototype), 'constructor', this).call(this, props);
        this.onChange = this.onChange.bind(this);
    }

    _createClass(SchemaForm, [{
        key: 'onChange',
        value: function onChange(key, val) {
            //console.log('SchemaForm onChange val', val);
            //console.log('SchemaForm onChange key', key);
            this.props.onModelChange(key, val);
        }
    }, {
        key: 'renderSchema',
        value: function renderSchema(form, model, index, onChange) {
            var result;
            //console.log('form = ', form);
            switch (form.type) {
                case 'number':
                    result = _react2['default'].createElement(_Number2['default'], { model: model, form: form, key: index, onChange: onChange });
                    break;
                case 'text':
                    result = _react2['default'].createElement(_Text2['default'], { model: model, form: form, key: index, onChange: onChange });
                    break;
                case 'textarea':
                    result = _react2['default'].createElement(_Textarea2['default'], { model: model, form: form, key: index, onChange: onChange });
                    break;
                case 'help':
                    result = _react2['default'].createElement(Help, { model: model, form: form, key: index, onChange: onChange });
                    break;
                case 'checkbox':
                    result = _react2['default'].createElement(Checkbox, { model: model, form: form, key: index, onChange: onChange });
                    break;
                case 'submit':
                    result = _react2['default'].createElement(Submit, { model: model, form: form, key: index, onChange: onChange });
                    break;
                case 'section':
                    result = _react2['default'].createElement(Section, { model: model, form: form, key: index, onChange: onChange, renderSchema: this.renderSchema });
                    break;
                case 'array':
                    result = _react2['default'].createElement(Array, { model: model, form: form, key: index, onChange: onChange, renderSchema: this.renderSchema });
                    break;
                case 'select':
                    result = _react2['default'].createElement(Select, { model: model, form: form, key: index, onChange: onChange });
                    break;
                case 'radios':
                    result = _react2['default'].createElement(Radios, { model: model, form: form, key: index, onChange: onChange });
                    break;
            }
            //console.log('renderSchema', result);
            return result;
        }
    }, {
        key: 'render',
        value: function render() {
            var merged = utils.merge(this.props.schema, this.props.form, this.props.ignore, this.props.option);
            //console.log('SchemaForm merged = ', JSON.stringify(merged, undefined, 2));
            //console.log('SchemaForm render merged ', merged);
            var forms = merged.map((function (form, index) {
                return this.renderSchema(form, this.props.model, form.key[0], this.onChange);
            }).bind(this));

            return _react2['default'].createElement(
                'div',
                null,
                forms
            );
        }
    }]);

    return SchemaForm;
})(_react2['default'].Component);

module.exports = SchemaForm;