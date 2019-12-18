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
  schema: {
    type: "object",
    title: "Types",
    properties: {
      date: {
        title: "Birthday",
        type: "object"
      }
    }
  },
  form: [{
    key: "date",
    type: "date"
  }],
  model: {
    date: "1947-01-8"
  }
};
describe("Date capture main test", function () {
  it('Bowie"s birthday :', function () {
    var result = (0, _enzyme.render)(_react["default"].createElement(_SchemaForm["default"], {
      form: cfg.form,
      schema: cfg.schema,
      model: cfg.model,
      onModelChange: onModelChange
    }));
    expect(result.find("input")[0].attribs.value).toEqual("1947-01-8");
  });
});