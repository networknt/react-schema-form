'use strict';

jest.dontMock('../SchemaForm');

describe('SchemaForm', function () {

  var React;
  var TestUtils;
  var SchemaForm;

  beforeEach(function () {
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;
    SchemaForm = require('../SchemaForm');
  });

  it('shows SchemaForm', function () {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(SchemaForm, null));

    var result = shallowRenderer.getRenderOutput();
    //console.log('result = ', result);
    expect(result.props.children).toEqual('SchemaForm');
  });
});