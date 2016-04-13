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

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _Number = require('./Number');

var _Number2 = _interopRequireDefault(_Number);

var _Text = require('./Text');

var _Text2 = _interopRequireDefault(_Text);

var _TextArea = require('./TextArea');

var _TextArea2 = _interopRequireDefault(_TextArea);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _Radios = require('./Radios');

var _Radios2 = _interopRequireDefault(_Radios);

var _Date = require('./Date');

var _Date2 = _interopRequireDefault(_Date);

var _Checkbox = require('./Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Help = require('./Help');

var _Help2 = _interopRequireDefault(_Help);

var _Array = require('./Array');

var _Array2 = _interopRequireDefault(_Array);

var _FieldSet = require('./FieldSet');

var _FieldSet2 = _interopRequireDefault(_FieldSet);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var SchemaForm = (function (_React$Component) {
    _inherits(SchemaForm, _React$Component);

    function SchemaForm(props) {
        _classCallCheck(this, SchemaForm);

        _get(Object.getPrototypeOf(SchemaForm.prototype), 'constructor', this).call(this, props);
        this.mapper = {
            "number": _Number2['default'],
            "text": _Text2['default'],
            "password": _Text2['default'],
            "textarea": _TextArea2['default'],
            "select": _Select2['default'],
            "radios": _Radios2['default'],
            "date": _Date2['default'],
            "checkbox": _Checkbox2['default'],
            "help": _Help2['default'],
            "array": _Array2['default'],
            "fieldset": _FieldSet2['default']
        };
        this.onChange = this.onChange.bind(this);
    }

    _createClass(SchemaForm, [{
        key: 'onChange',
        value: function onChange(key, val) {
            //console.log('SchemaForm.onChange', key, val);
            this.props.onModelChange(key, val);
        }
    }, {
        key: 'builder',
        value: function builder(form, model, index, onChange, mapper) {
            var type = form.type;
            var Field = this.mapper[type];
            if (!Field) {
                console.log("Invalid field: \"" + form.key[0] + "\"!");
                return null;
            }
            if (form.condition && eval(form.condition) === false) {
                return null;
            }
            return _react2['default'].createElement(Field, { model: model, form: form, key: index, onChange: onChange, mapper: mapper, builder: this.builder });
        }
    }, {
        key: 'render',
        value: function render() {
            var merged = _utils2['default'].merge(this.props.schema, this.props.form, this.props.ignore, this.props.option);
            //console.log('SchemaForm merged = ', JSON.stringify(merged, undefined, 2));
            var mapper = this.mapper;
            if (this.props.mapper) {
                mapper = _lodash2['default'].merge(this.mapper, this.props.mapper);
            }
            var forms = merged.map((function (form, index) {
                return this.builder(form, this.props.model, index, this.onChange, mapper);
            }).bind(this));

            return _react2['default'].createElement(
                'div',
                { style: { width: '100%' }, className: 'SchemaForm' },
                forms
            );
        }
    }]);

    return SchemaForm;
})(_react2['default'].Component);

module.exports = SchemaForm;