'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormControl = require('@material-ui/core/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _FormControlLabel = require('@material-ui/core/FormControlLabel');

var _FormControlLabel2 = _interopRequireDefault(_FormControlLabel);

var _FormLabel = require('@material-ui/core/FormLabel');

var _FormLabel2 = _interopRequireDefault(_FormLabel);

var _RadioGroup = require('@material-ui/core/RadioGroup');

var _RadioGroup2 = _interopRequireDefault(_RadioGroup);

var _Radio = require('@material-ui/core/Radio');

var _Radio2 = _interopRequireDefault(_Radio);

var _styles = require('@material-ui/core/styles');

var _ComposedComponent = require('./ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
    return {
        formControl: {
            marginTop: theme.spacing.unit
        },
        group: {
            margin: theme.spacing.unit + 'px 0'
        }
    };
};

var Radios = function (_React$Component) {
    _inherits(Radios, _React$Component);

    function Radios() {
        _classCallCheck(this, Radios);

        return _possibleConstructorReturn(this, (Radios.__proto__ || Object.getPrototypeOf(Radios)).apply(this, arguments));
    }

    _createClass(Radios, [{
        key: 'renderItems',
        value: function renderItems(form) {
            return form.titleMap.map(function (item, index) {
                return _react2.default.createElement(_FormControlLabel2.default, {
                    key: index,
                    control: _react2.default.createElement(_Radio2.default, null),
                    label: item.name,
                    value: item.value,
                    disabled: form.readonly
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var classes = this.props.classes;

            return _react2.default.createElement(
                _FormControl2.default,
                { component: 'fieldset', className: classes.formControl },
                _react2.default.createElement(
                    _FormLabel2.default,
                    { component: 'legend' },
                    this.props.form.title
                ),
                _react2.default.createElement(
                    _RadioGroup2.default,
                    {
                        value: this.props.value,
                        name: this.props.form.title,
                        onChange: this.props.onChangeValidate,
                        className: classes.group },
                    this.renderItems(this.props.form)
                )
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

    return Radios;
}(_react2.default.Component);

var _default = (0, _ComposedComponent2.default)((0, _styles.withStyles)(styles)(Radios));

exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(styles, 'styles', 'src/Radios.js');
    reactHotLoader.register(Radios, 'Radios', 'src/Radios.js');
    reactHotLoader.register(_default, 'default', 'src/Radios.js');
    leaveModule(module);
})();

;