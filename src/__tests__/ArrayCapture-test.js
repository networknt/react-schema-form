const React = require('react');
const SchemaForm = require('../SchemaForm');
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.dontMock('../ComposedComponent');
jest.dontMock('../utils');
jest.dontMock('lodash');

function onModelChange(key, val, type) {
    console.log('ExamplePage.onModelChange:', key, val);
    var newModel = this.state.model;
    utils.selectOrSet(key, newModel, val, type);
    this.setState({ model: newModel });
}

describe('Composed component test', () => {
    it('Output from model with 3 comps must have length 3: ', function() {
        const cfg = {
            form: [
                {
                    "key": "comments",
                    "add": "New",
                    "style": {
                        "add": "btn-success"
                    },
                    "items": [
                        "comments[].name"
                    ]
                }
            ],
            schema: {
                "type": "object",
                "title": "Comment",
                "required": ["comments"],
                "properties": {
                    "comments": {
                        "type": "array",
                        "maxItems": 2,
                        "items": {
                            "type": "object",
                            "properties": {
                                "name":  {
                                    "title": "Name",
                                    "type": "string"
                                }
                            },
                            "required": ["name"]
                        }
                    }
                }
            },
            model: {
                "comments": [
                  {
                    "name": "some value"
                  },
                  {
                    "name": "some next value"
                  },
                  {
                    "name": "some other value"
                  },
                ]
            }
        };
        
        let display = render(<SchemaForm 
            form={cfg.form}
            schema={cfg.schema}
            model={cfg.model}
            onModelChange={onModelChange}
        />);
    
        expect(display.find('input').length).toEqual(3);
    });
});
  