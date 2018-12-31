"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styles = require("@material-ui/core/styles");

var _MenuItem = require("@material-ui/core/MenuItem");

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Select = require("@material-ui/core/Select");

var _Select2 = _interopRequireDefault(_Select);

var _InputLabel = require("@material-ui/core/InputLabel");

var _InputLabel2 = _interopRequireDefault(_InputLabel);

var _FormControl = require("@material-ui/core/FormControl");

var _FormControl2 = _interopRequireDefault(_FormControl);

var _Chip = require("@material-ui/core/Chip");

var _Chip2 = _interopRequireDefault(_Chip);

var _ComposedComponent = require("./ComposedComponent");

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = function styles(theme) {
    return {
        root: {
            display: "flex",
            flexWrap: "wrap"
        },
        chips: {
            display: "flex",
            flexWrap: "wrap"
        },
        chip: {
            margin: theme.spacing.unit / 4
        },
        menuItem: {
            fontWeight: theme.typography.fontWeightRegular
        },
        selectedMenuItem: {
            fontWeight: theme.typography.fontWeightMedium
        }
    };
};

var ITEM_HEIGHT = 48;
var ITEM_PADDING_TOP = 8;
var MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

var MultiSelect = function (_Component) {
    _inherits(MultiSelect, _Component);

    function MultiSelect(props) {
        _classCallCheck(this, MultiSelect);

        var _this = _possibleConstructorReturn(this, (MultiSelect.__proto__ || Object.getPrototypeOf(MultiSelect)).call(this, props));

        _this.onSelected = function (event) {
            var onChangeValidate = _this.props.onChangeValidate;

            var currentValue = event.target.value;
            _this.setState({ currentValue: currentValue });
            onChangeValidate(currentValue);
        };

        var _this$props = _this.props,
            model = _this$props.model,
            form = _this$props.form;

        _this.state = {
            currentValue: _utils2.default.getValueFromModel(model, form.key) || []
        };
        return _this;
    }

    _createClass(MultiSelect, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                form = _props.form,
                classes = _props.classes,
                getLocalizedString = _props.localization.getLocalizedString;
            var currentValue = this.state.currentValue;

            var getTitle = _utils2.default.getTitleByValue.bind(this, form.titleMap);
            var menuItems = form.titleMap.map(function (item) {
                return _react2.default.createElement(
                    _MenuItem2.default,
                    {
                        key: item.value,
                        value: item.value,
                        className: currentValue.indexOf(item.value) === -1 ? classes.menuItem : classes.selectedMenuItem
                    },
                    item.name && getLocalizedString(item.name)
                );
            });
            return _react2.default.createElement(
                _FormControl2.default,
                { fullWidth: true },
                _react2.default.createElement(
                    _InputLabel2.default,
                    { required: form.required },
                    form.title && getLocalizedString(form.title)
                ),
                _react2.default.createElement(
                    _Select2.default,
                    {
                        multiple: true,
                        value: currentValue || "",
                        placeholder: form.placeholder && getLocalizedString(form.placeholder),
                        disabled: form.readonly,
                        onChange: this.onSelected,
                        MenuProps: MenuProps,
                        renderValue: function renderValue(selected) {
                            return _react2.default.createElement(
                                "div",
                                { className: classes.chips },
                                selected.map(function (value) {
                                    return _react2.default.createElement(_Chip2.default, {
                                        key: value,
                                        label: getTitle(value) && getLocalizedString(getTitle(value)),
                                        className: classes.chip
                                    });
                                })
                            );
                        }
                    },
                    menuItems
                )
            );
        }
    }], [{
        key: "getDerivedStateFromProps",
        value: function getDerivedStateFromProps(props) {
            var model = props.model,
                form = props.form;

            if (model && form.key) {
                return {
                    currentValue: _utils2.default.getValueFromModel(model, form.key) || []
                };
            }
            return null;
        }
    }]);

    return MultiSelect;
}(_react.Component);

exports.default = (0, _ComposedComponent2.default)((0, _styles.withStyles)(styles)(MultiSelect));