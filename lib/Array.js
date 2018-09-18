'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _ComposedComponent = require('./ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Array = function (_React$Component) {
  _inherits(Array, _React$Component);

  function Array(props) {
    _classCallCheck(this, Array);

    // we have the model here for the entire form, get the model for this array only
    // and add to the state. if is empty, add an entry by calling onAppend directly.
    var _this = _possibleConstructorReturn(this, (Array.__proto__ || Object.getPrototypeOf(Array)).call(this, props));

    _this.onAppend = function () {
      return _this.__onAppend__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.onDelete = function () {
      return _this.__onDelete__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.setIndex = function () {
      return _this.__setIndex__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.copyWithIndex = function () {
      return _this.__copyWithIndex__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.state = {
      model: _utils2.default.selectOrSet(_this.props.form.key, _this.props.model) || []
    };
    return _this;
  }

  _createClass(Array, [{
    key: '__copyWithIndex__REACT_HOT_LOADER__',
    value: function __copyWithIndex__REACT_HOT_LOADER__() {
      return this.__copyWithIndex__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__setIndex__REACT_HOT_LOADER__',
    value: function __setIndex__REACT_HOT_LOADER__() {
      return this.__setIndex__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onDelete__REACT_HOT_LOADER__',
    value: function __onDelete__REACT_HOT_LOADER__() {
      return this.__onDelete__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__onAppend__REACT_HOT_LOADER__',
    value: function __onAppend__REACT_HOT_LOADER__() {
      return this.__onAppend__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.model && nextProps.form && nextProps.form.key) {
        this.setState({
          model: _utils2.default.selectOrSet(nextProps.form.key, nextProps.model) || []
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Always start with one empty form unless configured otherwise.
      if (this.props.form.startEmpty !== true && this.state.model.length === 0) {
        this.onAppend();
      }
    }
  }, {
    key: '__onAppend__REACT_HOT_LOADER__',
    value: function __onAppend__REACT_HOT_LOADER__() {
      var empty = void 0;
      if (this.props.form && this.props.form.schema && this.props.form.schema.items) {
        var items = this.props.form.schema.items;
        if (items.type && items.type.indexOf('object') !== -1) {
          empty = {};

          // Check for possible defaults
          if (!this.props.options || this.props.options.setSchemaDefaults !== false) {
            empty = typeof items['default'] !== 'undefined' ? items['default'] : empty;

            // Check for defaults further down in the schema.
            // If the default instance sets the new array item to something falsy, i.e. null
            // then there is no need to go further down.
            if (empty) {
              _utils2.default.traverseSchema(items, function (prop, path) {
                if (typeof prop['default'] !== 'undefined') {
                  _utils2.default.selectOrSet(path, empty, prop['default']);
                }
              });
            }
          }
        } else if (items.type && items.type.indexOf('array') !== -1) {
          empty = [];
          if (!this.props.options || this.props.options.setSchemaDefaults !== false) {
            empty = items['default'] || empty;
          }
        } else {
          // No type? could still have defaults.
          if (!this.props.options || this.props.options.setSchemaDefaults !== false) {
            empty = items['default'] || empty;
          }
        }
      }
      var newModel = this.state.model;
      newModel.push(empty);
      this.setState({
        model: newModel
      });
      this.props.onChangeValidate(this.state.model);
    }
  }, {
    key: '__onDelete__REACT_HOT_LOADER__',
    value: function __onDelete__REACT_HOT_LOADER__(index) {
      var _this2 = this;

      return function () {
        var newModel = _this2.state.model;
        newModel.splice(index, 1);
        _this2.setState({ model: newModel });
        _this2.props.onChangeValidate(_this2.state.model);
      };
    }
  }, {
    key: '__setIndex__REACT_HOT_LOADER__',
    value: function __setIndex__REACT_HOT_LOADER__(index) {
      return function (form) {
        if (form.key) {
          form.key[form.key.indexOf('')] = index;
        }
      };
    }
  }, {
    key: '__copyWithIndex__REACT_HOT_LOADER__',
    value: function __copyWithIndex__REACT_HOT_LOADER__(form, index) {
      var copy = _lodash2.default.cloneDeep(form);
      copy.arrayIndex = index;
      _utils2.default.traverseForm(copy, this.setIndex(index));
      return copy;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var arrays = [];
      var model = this.state.model;

      var _loop = function _loop(i) {
        var forms = _this3.props.form.items.map(function (form, index) {
          return _this3.props.builder(_this3.copyWithIndex(form, i), _this3.props.model, index, _this3.props.mapper, _this3.props.onChange, _this3.props.builder);
        });
        arrays.push(_react2.default.createElement(
          'li',
          { key: 'react-schema-form-array-' + _this3.props.form.title + '-' + i, className: 'list-group-item' },
          _react2.default.createElement(
            _IconButton2.default,
            { iconClassName: 'material-icons', tooltip: 'Remove', onClick: _this3.onDelete(i) },
            'clear'
          ),
          forms
        ));
      };

      for (var i = 0; i < model.length; i++) {
        _loop(i);
      }
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'label',
            null,
            this.props.form.title
          ),
          _react2.default.createElement(
            'ol',
            { className: 'list-group' },
            arrays
          )
        ),
        _react2.default.createElement(_RaisedButton2.default, { label: this.props.form.add || 'Add', secondary: true, onClick: this.onAppend })
      );
    }
  }]);

  return Array;
}(_react2.default.Component);

var _default = (0, _ComposedComponent2.default)(Array);

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Array, 'Array', 'src/Array.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/Array.js');
}();

;