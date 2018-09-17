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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by steve on 15/09/15.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var TextArea = function (_React$Component) {
    _inherits(TextArea, _React$Component);

    function TextArea() {
        _classCallCheck(this, TextArea);

        return _possibleConstructorReturn(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).apply(this, arguments));
    }

    _createClass(TextArea, [{
        key: 'render',
        value: function render() {
            // FIXME: Obviously fix rowsMax eventually..
            var value = (0, _utils.selectOrSet)(this.props.form.key, this.props.model) ? (0, _utils.selectOrSet)(this.props.form.key, this.props.model) : '';
            return _react2.default.createElement(_core.TextField, {
                type: this.props.form.type,
                label: this.props.form.title,
                helperText: this.props.form.placeholder,
                onChange: this.props.onChangeValidate,
                error: !!this.props.error,
                value: value,

                disabled: this.props.form.readonly,
                style: this.props.form.style || { width: '100%' }
            });
        }
    }]);

    return TextArea;
}(_react2.default.Component);

var _default = (0, _ComposedComponent2.default)(TextArea);

exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(TextArea, 'TextArea', 'src/TextArea.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/TextArea.js');
}();

;