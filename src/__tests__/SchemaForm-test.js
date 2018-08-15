import React from 'react';
import SchemaForm from '../SchemaForm';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('SchemaForm test', function() {

  it('shows SchemaForm', function() {
    var cfg = {
      form: {},
      schema: {
        'type': 'object'
      },
      model: {},
      mapper: {}
    };

    var result = shallow(<SchemaForm
      schema={cfg.schema}
      mapper={cfg.mapper}
    />);

    expect(result.props().className).toEqual('SchemaForm');
  });
});
