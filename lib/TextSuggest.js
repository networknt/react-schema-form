'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ComposedComponent = require('./ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by XaviTorello on 30/05/18
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var dataSourceConfig = {
    text: 'name',
    value: 'value'
};

var TextSuggest = function (_React$Component) {
    _inherits(TextSuggest, _React$Component);

    function TextSuggest() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, TextSuggest);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TextSuggest.__proto__ || Object.getPrototypeOf(TextSuggest)).call.apply(_ref, [this].concat(args))), _this), _this.handleUpdate = function () {
            var _this2;

            return (_this2 = _this).__handleUpdate__REACT_HOT_LOADER__.apply(_this2, arguments);
        }, _this.handleInit = function () {
            var _this3;

            return (_this3 = _this).__handleInit__REACT_HOT_LOADER__.apply(_this3, arguments);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TextSuggest, [{
        key: '__handleInit__REACT_HOT_LOADER__',
        value: function __handleInit__REACT_HOT_LOADER__() {
            return this.__handleInit__REACT_HOT_LOADER__.apply(this, arguments);
        }
    }, {
        key: '__handleUpdate__REACT_HOT_LOADER__',
        value: function __handleUpdate__REACT_HOT_LOADER__() {
            return this.__handleUpdate__REACT_HOT_LOADER__.apply(this, arguments);
        }
    }, {
        key: '__handleUpdate__REACT_HOT_LOADER__',
        value: function __handleUpdate__REACT_HOT_LOADER__(newValue, index) {
            var key = this.props.form.key;
            var type = this.props.form.schema.type;

            return this.props.onChange(key, newValue[dataSourceConfig['value']], type, this.props.form);
        }
    }, {
        key: '__handleInit__REACT_HOT_LOADER__',
        value: function __handleInit__REACT_HOT_LOADER__(init_value) {
            if (!this.props.form.schema || !this.props.form.schema.enum) return init_value.toString();

            var names = this.props.form.schema.enumNames || this.props.form.schema.enum;
            var values = this.props.form.schema.enum;

            // console.log(names, values);
            // console.log("indexOf", values.indexOf(init_value));
            // console.log("names[values.indexOf(init_value)]", names[values.indexOf(init_value)]);
            var init_value_name = names[values.indexOf(init_value)];

            // this.handleUpdate({[dataSourceConfig['value']]: init_value, [dataSourceConfig['text']]: init_value_name})

            return init_value_name || init_value.toString();
        }
    }, {
        key: 'render',
        value: function render() {
            // console.log('TextSuggest', this.props);
            // assign the filter, by default case insensitive
            var filter = function (filter) {
                switch (filter) {
                    case 'fuzzy':
                        return AutoComplete.fuzzyFilter;
                        break;
                    default:
                        return AutoComplete.caseInsensitiveFilter;
                        break;
                }
            }(this.props.form.filter);

            // console.log("TEXTSUG", this.props);

            var value = this.props.value && this.handleInit(this.props.value);

            return _react2.default.createElement(
                'div',
                { className: this.props.form.htmlClass },
                _react2.default.createElement(AutoComplete, {
                    type: this.props.form.type,
                    floatingLabelText: this.props.form.title,
                    hintText: this.props.form.placeholder,
                    errorText: this.props.error,
                    onNewRequest: this.handleUpdate,
                    disabled: this.props.form.readonly,
                    style: this.props.form.style || { width: '100%' },
                    openOnFocus: true,
                    searchText: value,
                    dataSource: this.props.form.titleMap || ['Loading...'],
                    filter: filter,
                    maxSearchResults: this.props.form.maxSearchResults || 5,
                    dataSourceConfig: dataSourceConfig
                })
            );
        }
    }]);

    return TextSuggest;
}(_react2.default.Component);

var _default = (0, _ComposedComponent2.default)(TextSuggest);

exports.default = _default;
;

var _temp2 = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(dataSourceConfig, 'dataSourceConfig', 'src/TextSuggest.js');

    __REACT_HOT_LOADER__.register(TextSuggest, 'TextSuggest', 'src/TextSuggest.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/TextSuggest.js');
}();

;