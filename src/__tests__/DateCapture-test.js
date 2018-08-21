import React from 'react';
import SchemaForm from '../SchemaForm';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

function onModelChange(key, val, type) {
    var newModel = {};
    utils.selectOrSet(key, newModel, val, type);
}

var cfg = {
    schema: {
        'type': 'object',
        'title': 'Types',
        'properties': {
            'date': {
                'title': 'Birthday',
                'type': 'object'
            }
        }
    },
    form: [
        {
            'key': 'date',
            'type': 'date'
        }
    ],
    model: {
        'date': '1947-01-8'
    }
};

describe('Date capture main test', () => {

    it('Bowie"s birthday :', function() {
        var result = render(<SchemaForm 
            form={cfg.form}
            schema={cfg.schema}
            model={cfg.model}
            onModelChange={onModelChange}
        />);

        expect(result.find('input')[0].attribs.value).toEqual('1947-01-8');
    });
});