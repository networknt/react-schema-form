'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ComposedComponent = require('./ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

var _NativeDateField = require('./NativeDateField');

var _NativeDateField2 = _interopRequireDefault(_NativeDateField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})(); /**
       * Created by steve on 22/12/15.
       */


var _default = (0, _ComposedComponent2.default)(_NativeDateField2.default, { type: 'date' });

exports.default = _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, 'default', 'src/Date.js');
  leaveModule(module);
})();

;