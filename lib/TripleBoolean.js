"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _core = require("@material-ui/core");

var _FormLabel = require("@material-ui/core/FormLabel");

var _FormLabel2 = _interopRequireDefault(_FormLabel);

var _ComposedComponent = require("./ComposedComponent");

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/**
 * Created by steve on 15/09/15.
 */


/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */
var TripleBoolean = function (_Component) {
    _inherits(TripleBoolean, _Component);

    _createClass(TripleBoolean, null, [{
        key: "getDerivedStateFromProps",
        value: function getDerivedStateFromProps(nextProps) {
            return {
                yesChecked: nextProps.value === "yes",
                noChecked: nextProps.value === "no"
            };
        }
    }]);

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
        var _this$props = _this.props,
            model = _this$props.model,
            form = _this$props.form,
            value = _this$props.value,
            setDefault = _this$props.setDefault;
        var key = form.key;


        setDefault(key, model, form, value);
        return _this;
    }

    _createClass(TripleBoolean, [{
        key: "displaySwitch",
        value: function displaySwitch() {
            var _props = this.props,
                _props$form = _props.form,
                title = _props$form.title,
                yesLabel = _props$form.yesLabel,
                noLabel = _props$form.noLabel,
                clearButtonLabel = _props$form.clearButtonLabel,
                required = _props$form.required,
                onChangeValidate = _props.onChangeValidate,
                value = _props.value,
                getLocalizedString = _props.localization.getLocalizedString;
            var _state = this.state,
                yesChecked = _state.yesChecked,
                noChecked = _state.noChecked;

            return _react2.default.createElement(
                "div",
                { style: this.divStyle },
                _react2.default.createElement(
                    _FormLabel2.default,
                    { required: required },
                    title && getLocalizedString(title)
                ),
                _react2.default.createElement("br", null),
                _react2.default.createElement(
                    _core.FormGroup,
                    null,
                    _react2.default.createElement(_core.FormControlLabel, {
                        control: _react2.default.createElement(_core.Checkbox, {
                            onClick: function onClick(e) {
                                onChangeValidate(e, "yes");
                            },
                            checked: yesChecked
                        }),
                        label: yesLabel ? getLocalizedString(yesLabel) : "Yes"
                    }),
                    _react2.default.createElement(_core.FormControlLabel, {
                        control: _react2.default.createElement(_core.Checkbox, {
                            onClick: function onClick(e) {
                                onChangeValidate(e, "no");
                            },
                            checked: noChecked
                        }),
                        label: noLabel ? getLocalizedString(noLabel) : "No"
                    })
                ),
                value === "yes" || value === "no" ? _react2.default.createElement(
                    _core.Button,
                    {
                        id: "temp",
                        variant: "text",
                        color: "primary",
                        onClick: function onClick(e) {
                            return onChangeValidate(e, "unanswered");
                        }
                    },
                    clearButtonLabel ? getLocalizedString(clearButtonLabel) : "clear response"
                ) : ""
            );
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _core.Card,
                null,
                this.displaySwitch()
            );
        }
    }]);

    return TripleBoolean;
}(_react.Component);

exports.default = (0, _ComposedComponent2.default)(TripleBoolean);