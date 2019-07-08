"use strict";

var _react = _interopRequireDefault(require("react"));

var _shallow = _interopRequireDefault(require("react-test-renderer/shallow"));

var _Text = _interopRequireDefault(require("../Text"));

var _ComposedComponent = _interopRequireDefault(require("../ComposedComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

test("Composed component test", function () {
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
  var TestText = (0, _ComposedComponent["default"])(_Text["default"]);
  renderer.render(_react["default"].createElement(TestText, {
    form: cfg.form,
    model: cfg.model,
    mapper: cfg.mapper
  }));
  var result = renderer.getRenderOutput();
  expect(result.props.value).toEqual("steeve");
});