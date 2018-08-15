import React from 'react';
import SchemaForm from '../SchemaForm';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const cfg = {
    form: [
        'name',
        {
            'key': 'date',
            'type': 'date',
            'condition': 'model.name !== "" && model.name !== undefined'
        }
    ],
    schema: {
        'type': 'object',
        'title': 'Types',
        'properties': {
            'name':  {
                'type': 'string',
                'minLength': 3
            },
            'date': {
                'title': 'Date',
                'type': 'object'
            }
        },
        'required': ['name', 'date']
    },
    model: {
        'name': 'some value'
    }
};

describe('Composed component test', () => {

    it('The simple condition :', function() { 
        let display = render(<SchemaForm 
            form={cfg.form}
            schema={cfg.schema}
            model={cfg.model}
        />);

        // Output must have two inputs
        expect(display.find('input').length).toEqual(2);
        // And secont inputs type have to be of type 'date'
        expect(display.find('input')[1].attribs.type).toEqual('date');
    });

    it('The complex condition :', function() {

        let newForm = [
            'name',
            {
                'key': 'date',
                'type': 'date',
                'condition': 'model.name !== "" && (2 > 1 && (model.name === "some" || model.name === "value"))'
            }
        ];

        let model = {'name': 'some'};

        let display = render(<SchemaForm 
            form={newForm}
            schema={cfg.schema}
            model={model}
        />);
        // this case expected to have addictional date input
        expect(display.find('input').length).toEqual(2);

        model = {'name': 'value'};
        display = render(<SchemaForm 
            form={newForm}
            schema={cfg.schema}
            model={model}
        />);
        // and this one too
        expect(display.find('input').length).toEqual(2);

        model = {'name': 'some other value'};
        display = render(<SchemaForm 
            form={newForm}
            schema={cfg.schema}
            model={model}
        />);
        // here a date input is not expected cause condition is falsy
        expect(display.find('input').length).toEqual(1);
    });

});
