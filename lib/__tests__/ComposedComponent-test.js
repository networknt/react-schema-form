'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _shallow = require('react-test-renderer/shallow');

var _shallow2 = _interopRequireDefault(_shallow);

var _ComposedComponent = require('../ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

var _Text = require('../Text');

var _Text2 = _interopRequireDefault(_Text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('../ComposedComponent');
jest.dontMock('../utils');
jest.dontMock('lodash');

describe('ComposedComponent', function () {

  it('shows default value at text field', function () {
    var renderer = new _shallow2.default();
    var cfg = {
      form: {
        key: ['name'],
        schema: {
          default: 'steeve',
          title: 'name',
          type: 'String'
        },
        type: 'text',
        title: 'name'
      },
      model: { name: 'steeve' },
      mapper: {}
    };

    var Composed = (0, _ComposedComponent2.default)(_Text2.default);

    renderer.render(_react2.default.createElement(Composed, {
      form: cfg.form,
      model: cfg.model,
      mapper: cfg.mapper
    }));

    var result = renderer.getRenderOutput();

    expect(result.props.value).toEqual('steeve');
  });
});