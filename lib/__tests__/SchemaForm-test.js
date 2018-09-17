'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SchemaForm = require('../SchemaForm');

var _SchemaForm2 = _interopRequireDefault(_SchemaForm);

var _enzyme = require('enzyme');

var _enzymeAdapterReact = require('enzyme-adapter-react-16');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _enzyme.configure)({ adapter: new _enzymeAdapterReact2.default() });

describe('SchemaForm test', function () {

  it('shows SchemaForm', function () {
    var cfg = {
      form: {},
      schema: {
        'type': 'object'
      },
      model: {},
      mapper: {}
    };

    var result = (0, _enzyme.shallow)(_react2.default.createElement(_SchemaForm2.default, {
      schema: cfg.schema,
      mapper: cfg.mapper
    }));

    expect(result.props().className).toEqual('SchemaForm');
  });
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;