import React from 'react';
import Composed from '../ComposedComponent';
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
    from: [
        {
            'key': 'date',
            'type': 'date'
        }
    ],
    model: {
        'date': '2018-08-11'
    }
};

describe('Date capture main test', () => {

    it('Bowie"s birthday :', function() {
        var result = render(<Composed 
            form={cfg.form}
            schema={cfg.schema}
            model={cfg.model}
            onModelChange={onModelChange}
        />);

        console.log('OUTPUT: ', result.html());
    });
});