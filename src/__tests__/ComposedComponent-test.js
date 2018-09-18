jest.dontMock('../ComposedComponent');
jest.dontMock('../utils');
jest.dontMock('lodash');

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import ComposedComponent from '../ComposedComponent';
import Text from '../Text';

describe('ComposedComponent', function () {

  it('shows default value at text field', function () {
    const renderer = new ShallowRenderer();
    var cfg = {
      form: {
        key: ['name'],
        schema: {
          default: 'steeve',
          title: 'name',
          type: 'String',
        },
        type: 'text',
        title: 'name',
      },
      model: {name: 'steeve'},
      mapper: {}
    };

    var Composed = ComposedComponent(Text);

    renderer.render(
      <Composed
        form={cfg.form}
        model={cfg.model}
        mapper={cfg.mapper}
      />);

    var result = renderer.getRenderOutput();

    expect(result.props.value).toEqual('steeve');
  });
});
