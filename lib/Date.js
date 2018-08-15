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

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by steve on 22/12/15.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var utils = require('./utils');

//import Clear from '@material-ui/core/SvgIcon';

/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */
var Date = function (_React$Component) {
    _inherits(Date, _React$Component);

    function Date(props) {
        _classCallCheck(this, Date);

        var _this = _possibleConstructorReturn(this, (Date.__proto__ || Object.getPrototypeOf(Date)).call(this, props));

        var _this$props = _this.props,
            model = _this$props.model,
            form = _this$props.form,
            value = _this$props.value;
        var key = form.key;


        _this.props.setDefault(key, model, form, value);

        _this.onDatePicked = _this.onDatePicked.bind(_this);
        return _this;
    }

    _createClass(Date, [{
        key: 'onDatePicked',
        value: function onDatePicked(e) {
            console.log('DATE SELECT', e.target.value, this.props.form.type);
            this.props.onChangeValidate(e);
        }
    }, {
        key: 'render',
        value: function render() {
            var value = (0, _utils.selectOrSet)(this.props.form.key, this.props.model) ? (0, _utils.selectOrSet)(this.props.form.key, this.props.model) : '0';

            return _react2.default.createElement(_core.TextField, { style: { width: '100%', display: 'block' },
                label: this.props.form.title,
                type: this.props.form.type,
                value: value,
                onChange: this.onDatePicked
            });
        }
    }]);

    return Date;
}(_react2.default.Component);

var _default = (0, _ComposedComponent2.default)(Date);

exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Date, 'Date', 'src/Date.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/Date.js');
}();

;