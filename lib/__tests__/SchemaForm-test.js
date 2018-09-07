'use strict';

jest.dontMock('../SchemaForm');
jest.dontMock('../utils');
jest.dontMock('lodash');

var React = require('react');
var ShallowRenderer = require('react-test-renderer/shallow');
var SchemaForm = require('../SchemaForm');

describe('SchemaForm', function () {

  beforeEach(function () {});

  it('shows SchemaForm', function () {
    var shallowRenderer = new ShallowRenderer();
    var cfg = {
      form: {},
      schema: {
        'type': 'object'
      },
      model: {},
      mapper: {}
    };
    shallowRenderer.render(React.createElement(SchemaForm, {
      schema: cfg.schema,
      mapper: cfg.mapper
    }));

    var result = shallowRenderer.getRenderOutput();
    expect(result.type).toEqual('div');
    expect(result.props.children).toEqual([]);
  });
});