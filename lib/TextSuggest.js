'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ComposedComponent = require('./ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

var _AutoComplete = require('material-ui/AutoComplete');

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

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

    function TextSuggest(props) {
        _classCallCheck(this, TextSuggest);

        var _this = _possibleConstructorReturn(this, (TextSuggest.__proto__ || Object.getPrototypeOf(TextSuggest)).call(this, props));

        _this.handleUpdate = function () {
            return _this.__handleUpdate__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.reachTitle = function () {
            return _this.__reachTitle__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        var _this$props = _this.props,
            model = _this$props.model,
            form = _this$props.form;
        var key = form.key;


        var storedValue = model && _this.getModelKey(model, key) || undefined;
        var defaultValue = form.schema.default || undefined;
        var value = !_.isNil(storedValue) && storedValue || defaultValue;

        _this.props.setDefault(key, model, form, value);
        _this.state = {
            currentValue: value
        };
        return _this;
    }

    _createClass(TextSuggest, [{
        key: '__reachTitle__REACT_HOT_LOADER__',
        value: function __reachTitle__REACT_HOT_LOADER__() {
            return this.__reachTitle__REACT_HOT_LOADER__.apply(this, arguments);
        }
    }, {
        key: '__handleUpdate__REACT_HOT_LOADER__',
        value: function __handleUpdate__REACT_HOT_LOADER__() {
            return this.__handleUpdate__REACT_HOT_LOADER__.apply(this, arguments);
        }
    }, {
        key: 'getModelKey',
        value: function getModelKey(model, key) {
            if (Array.isArray(key)) {
                return key.reduce(function (cur, nxt) {
                    return cur[nxt] || false;
                }, model);
            } else {
                return model[key];
            }
        }
    }, {
        key: '__handleUpdate__REACT_HOT_LOADER__',


        /*
        Try to reach the related enum title, if not return the ID as an string
         Useful to show the title (enumName) instead of the code (enum)
        */
        value: function __handleUpdate__REACT_HOT_LOADER__(newValue, index) {
            var key = this.props.form.key;
            var type = this.props.form.schema.type;

            return this.props.onChange(key, newValue[dataSourceConfig['value']], type, this.props.form);
        }
    }, {
        key: '__reachTitle__REACT_HOT_LOADER__',
        value: function __reachTitle__REACT_HOT_LOADER__(init_value) {
            if (!this.props.form.schema || !this.props.form.schema.enum) return init_value.toString();

            var names = this.props.form.schema.enumNames || this.props.form.schema.enum;
            var values = this.props.form.schema.enum;

            var init_value_name = names[values.indexOf(init_value)];

            return init_value_name || init_value.toString();
        }
    }, {
        key: 'render',
        value: function render() {
            // assign the filter, by default case insensitive
            var filter = this.props.form.filter == "fuzzy" ? _AutoComplete2.default.fuzzyFilter : _AutoComplete2.default.caseInsensitiveFilter;

            var value = !_.isNil(this.state.currentValue) && this.reachTitle(this.state.currentValue) || undefined;

            return _react2.default.createElement(
                'div',
                { className: this.props.form.htmlClass },
                _react2.default.createElement(_AutoComplete2.default, {
                    type: this.props.form.type,
                    floatingLabelText: this.props.form.title,
                    hintText: this.props.form.placeholder,
                    errorText: this.props.error || this.props.errorText,
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

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(dataSourceConfig, 'dataSourceConfig', 'src/TextSuggest.js');

    __REACT_HOT_LOADER__.register(TextSuggest, 'TextSuggest', 'src/TextSuggest.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/TextSuggest.js');
}();

;