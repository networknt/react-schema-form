'use strict';

var React = require('react');
var ShallowRenderer = require('react-test-renderer/shallow');
var SchemaForm = require('../SchemaForm');

describe('SchemaForm test', function () {

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