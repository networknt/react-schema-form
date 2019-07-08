"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ComposedComponent = _interopRequireDefault(require("./ComposedComponent"));

var _NativeDateField = _interopRequireDefault(require("./NativeDateField"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by steve on 22/12/15.
 */
var _default = (0, _ComposedComponent["default"])(_NativeDateField["default"], {
  type: "date"
});

exports["default"] = _default;