import React from 'react';
import SchemaForm from '../SchemaForm';
import utils from '../utils';
import { render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

function onModelChange(key, val, type) {
    var newModel = {};
    utils.selectOrSet(key, newModel, val, type);
}

var cfg = {
    form: ['issues'],
    schema: {
        'type': 'object',
        'title': 'Issues',
        'properties': {
            'issues': {
                'title': 'Did you have any issues?',
                'type': 'tBoolean',
                'default': 'unanswered'
            }
        }
    },
    model: {},
    mapper: {}
};

describe('SchemaForm test', function() {

    it('shows SchemaForm', function() {
      var result = render(<SchemaForm
        form={cfg.form}
        model={cfg.model}
        schema={cfg.schema}
        onModelChange={onModelChange}
      />);
  
      // the initial phase, we don't a clear button so we don't expect it render
      expect(result.find('Button').length).toEqual(0);
      
      cfg.model['issues'] = 'no';
      result = render(<SchemaForm
        form={cfg.form}
        model={cfg.model}
        schema={cfg.schema}
        onModelChange={onModelChange}
      />);
      // Second phase, user have made the choice so we expect clear button to render
      expect(result.find('Button').length).toEqual(1);

      cfg.model['issues'] = 'unanswered';
      result = render(<SchemaForm
        form={cfg.form}
        model={cfg.model}
        schema={cfg.schema}
        onModelChange={onModelChange}
      />);
      // user cleared his choice so we expect button to hide
      expect(result.find('Button').length).toEqual(0);
    });
  });