'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ComposedComponent = require('./ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _attachFile = require('material-ui/svg-icons/editor/attach-file');

var _attachFile2 = _interopRequireDefault(_attachFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by XaviTorello on 30/05/18
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Binary = function (_React$Component) {
    _inherits(Binary, _React$Component);

    function Binary() {
        _classCallCheck(this, Binary);

        return _possibleConstructorReturn(this, (Binary.__proto__ || Object.getPrototypeOf(Binary)).apply(this, arguments));
    }

    _createClass(Binary, [{
        key: 'handleUpdate',
        value: function handleUpdate(selectorFiles) {
            var _props$form = this.props.form,
                key = _props$form.key,
                type = _props$form.type;

            var file_attachment = selectorFiles[0];

            return this.props.onChange(key, file_attachment, type, this.props.form);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            // console.log('Binary', this.props);

            return _react2.default.createElement(
                'div',
                { className: this.props.form.htmlClass },
                _react2.default.createElement(
                    _RaisedButton2.default,
                    {
                        containerElement: 'label',
                        disabled: this.props.form.readonly
                        // errorText={this.props.error}
                        , label: this.props.form.placeholder || "Puja un fitxer",
                        style: this.props.form.style || { width: '100%' }
                    },
                    _react2.default.createElement(_attachFile2.default, null),
                    _react2.default.createElement('input', {
                        type: 'file'
                        // accept="image/*"
                        // style={{"display":"none"}}
                        , onChange: function onChange(e) {
                            return _this2.handleUpdate(e.target.files);
                        },
                        label: this.props.form.title || "Upload a file"
                    })
                )
            );
        }
    }]);

    return Binary;
}(_react2.default.Component);

var _default = (0, _ComposedComponent2.default)(Binary);

exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Binary, 'Binary', 'src/Binary.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/Binary.js');
}();

;