"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-16"));

var _SchemaForm = _interopRequireDefault(require("../SchemaForm"));

var _utils = _interopRequireDefault(require("../utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact["default"]()
});

function onModelChange(key, val, type) {
  var newModel = {};

  _utils["default"].selectOrSet(key, newModel, val, type);
}

var cfg = {
  form: ["issues"],
  schema: {
    type: "object",
    title: "Issues",
    properties: {
      issues: {
        title: "Did you have any issues?",
        type: "tBoolean",
        "default": "unanswered"
      }
    }
  },
  model: {},
  mapper: {}
};
describe("SchemaForm test", function () {
  it("shows SchemaForm", function () {
    var result = (0, _enzyme.render)(_react["default"].createElement(_SchemaForm["default"], {
      form: cfg.form,
      model: cfg.model,
      schema: cfg.schema,
      onModelChange: onModelChange
    })); // the initial phase, we don't a clear button so we don't expect it render

    expect(result.find("Button").length).toEqual(0);
    cfg.model.issues = "no";
    result = (0, _enzyme.render)(_react["default"].createElement(_SchemaForm["default"], {
      form: cfg.form,
      model: cfg.model,
      schema: cfg.schema,
      onModelChange: onModelChange
    })); // Second phase, user have made the choice so we expect clear button to render

    expect(result.find("Button").length).toEqual(1);
    cfg.model.issues = "unanswered";
    result = (0, _enzyme.render)(_react["default"].createElement(_SchemaForm["default"], {
      form: cfg.form,
      model: cfg.model,
      schema: cfg.schema,
      onModelChange: onModelChange
    })); // user cleared his choice so we expect button to hide

    expect(result.find("Button").length).toEqual(0);
  });
});