"use strict";

var _react = _interopRequireDefault(require("react"));

var _shallow = _interopRequireDefault(require("react-test-renderer/shallow"));

var _SchemaForm = _interopRequireDefault(require("../SchemaForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe("SchemaForm test", function () {
  it("shows SchemaForm", function () {
    var shallowRenderer = new _shallow["default"]();
    var cfg = {
      form: {},
      schema: {
        type: "object"
      },
      model: {},
      mapper: {}
    };
    shallowRenderer.render(_react["default"].createElement(_SchemaForm["default"], {
      schema: cfg.schema,
      mapper: cfg.mapper
    }));
    var result = shallowRenderer.getRenderOutput();
    expect(result.type).toEqual("div");
    expect(result.props.children).toEqual([]);
  });
});