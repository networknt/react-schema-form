"use strict";

var _react = _interopRequireDefault(require("react"));

var _shallow = _interopRequireDefault(require("react-test-renderer/shallow"));

var _ComposedComponent = _interopRequireDefault(require("../ComposedComponent"));

var _Text = _interopRequireDefault(require("../Text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

jest.dontMock("../ComposedComponent");
jest.dontMock("../utils");
jest.dontMock("lodash");
describe("ComposedComponent", function () {
  it("shows default value at text field", function () {
    var renderer = new _shallow["default"]();
    var cfg = {
      form: {
        key: ["name"],
        schema: {
          "default": "steeve",
          title: "name",
          type: "String"
        },
        type: "text",
        title: "name"
      },
      model: {
        name: "steeve"
      },
      mapper: {}
    };
    var Composed = (0, _ComposedComponent["default"])(_Text["default"]);
    renderer.render(_react["default"].createElement(Composed, {
      form: cfg.form,
      model: cfg.model,
      mapper: cfg.mapper
    }));
    var result = renderer.getRenderOutput();
    expect(result.props.value).toEqual("steeve");
  });
  it("shows an error when there is an error", function () {
    var renderer = new _shallow["default"]();
    var cfg = {
      form: {
        key: ["name"],
        required: true,
        schema: {
          title: "name",
          type: "String"
        },
        type: "text",
        title: "name"
      },
      model: {
        name: ""
      },
      mapper: {}
    };
    var Composed = (0, _ComposedComponent["default"])(_Text["default"]);
    renderer.render(_react["default"].createElement(Composed, {
      form: cfg.form,
      model: cfg.model,
      mapper: cfg.mapper,
      showErrors: true
    }));
    var result = renderer.getRenderOutput();
    expect(result.props.error).toEqual("Missing required property: name");
  });
});