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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by steve on 15/09/15.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


// import { withStyles } from 'material-ui/styles';
// import Typography from 'material-ui/styles/typography';

/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */
var TripleBoolean = function (_React$Component) {
    _inherits(TripleBoolean, _React$Component);

    function TripleBoolean(props) {
        _classCallCheck(this, TripleBoolean);

        var _this = _possibleConstructorReturn(this, (TripleBoolean.__proto__ || Object.getPrototypeOf(TripleBoolean)).call(this, props));

        _this.state = {
            yesChecked: false,
            noChecked: false
        };
        _this.divStyle = {
            padding: "20px"
        };
        _this.butStyle = {
            color: "#07f"
        };
        var _this$props = _this.props,
            model = _this$props.model,
            form = _this$props.form,
            value = _this$props.value;
        var key = form.key;


        console.log(_react2.default.version);

        _this.props.setDefault(key, model, form, value);
        return _this;
    }

    _createClass(TripleBoolean, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({
                yesChecked: nextProps.value === "yes",
                noChecked: nextProps.value === "no"
            });
        }
    }, {
        key: 'displaySwitch',
        value: function displaySwitch() {
            var _this2 = this;

            var renderBlock = null;

            renderBlock = _react2.default.createElement(
                'div',
                { style: this.divStyle },
                this.props.form.title,
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                    _core.FormGroup,
                    null,
                    _react2.default.createElement(_core.FormControlLabel, { control: _react2.default.createElement(_core.Checkbox, { onClick: function onClick(e) {
                                _this2.props.onChangeValidate(e, 'yes');
                            },
                            checked: this.state.yesChecked
                        }),
                        label: 'Yes'
                    }),
                    _react2.default.createElement(_core.FormControlLabel, { control: _react2.default.createElement(_core.Checkbox, { onClick: function onClick(e) {
                                _this2.props.onChangeValidate(e, 'no');
                            },
                            checked: this.state.noChecked
                        }),
                        label: 'No'
                    })
                ),
                this.props.value === 'yes' || this.props.value === 'no' ? _react2.default.createElement(
                    _core.Button,
                    { variant: 'raised', color: 'primary',
                        onClick: function onClick(e) {
                            return _this2.props.onChangeValidate(e, 'unanswered');
                        } },
                    'clear responce'
                ) : ''
            );

            return renderBlock;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _core.Card,
                null,
                this.displaySwitch()
            );
        }
    }]);

    return TripleBoolean;
}(_react2.default.Component);

var _default = (0, _ComposedComponent2.default)(TripleBoolean);

exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(TripleBoolean, 'TripleBoolean', 'src/TripleBoolean.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/TripleBoolean.js');
}();

;