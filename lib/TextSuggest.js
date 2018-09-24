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

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable */
// temporary disable eslint in this unfinished file because it blocks tests
/**
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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TextSuggest.__proto__ || Object.getPrototypeOf(TextSuggest)).call.apply(_ref, [this].concat(args))), _this), _this.handleUpdate = function (newValue, index) {
            var key = _this.props.form.key;
            var type = _this.props.form.schema.type;

            return _this.props.onChange(key, newValue[dataSourceConfig['value']], type, _this.props.form);
        }, _this.handleInit = function (init_value) {
            if (!_this.props.form.schema || !_this.props.form.schema.enum) return init_value.toString();

            var names = _this.props.form.schema.enumNames || _this.props.form.schema.enum;
            var values = _this.props.form.schema.enum;

            // console.log(names, values);
            // console.log("indexOf", values.indexOf(init_value));
            // console.log("names[values.indexOf(init_value)]", names[values.indexOf(init_value)]);
            var init_value_name = names[values.indexOf(init_value)];

            // this.handleUpdate({[dataSourceConfig['value']]: init_value, [dataSourceConfig['text']]: init_value_name})

            return init_value_name || init_value.toString();
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TextSuggest, [{
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
    }, {
        key: '__reactstandin__regenerateByEval',
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
        }
    }]);

    return TextSuggest;
}(_react2.default.Component);

var _default = (0, _ComposedComponent2.default)(TextSuggest);

exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(dataSourceConfig, 'dataSourceConfig', 'src/TextSuggest.js');
    reactHotLoader.register(TextSuggest, 'TextSuggest', 'src/TextSuggest.js');
    reactHotLoader.register(_default, 'default', 'src/TextSuggest.js');
    leaveModule(module);
})();

;