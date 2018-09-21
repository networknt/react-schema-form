'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ComposedComponent = require('./ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

var _NativeDateField = require('./NativeDateField');

var _NativeDateField2 = _interopRequireDefault(_NativeDateField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by steve on 22/12/15.
 */
exports.default = (0, _ComposedComponent2.default)(_NativeDateField2.default, { type: 'date' });