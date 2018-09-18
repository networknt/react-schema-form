'use strict';

var _enzyme = require('enzyme');

var _enzymeAdapterReact = require('enzyme-adapter-react-16');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var SchemaForm = require('../SchemaForm');


(0, _enzyme.configure)({ adapter: new _enzymeAdapterReact2.default() });

jest.dontMock('../ComposedComponent');
jest.dontMock('../utils');
jest.dontMock('lodash');

function onModelChange(key, val, type) {
    console.log('ExamplePage.onModelChange:', key, val);
    var newModel = this.state.model;
    utils.selectOrSet(key, newModel, val, type);
    this.setState({ model: newModel });
}

describe('Composed component test', function () {
    it('Output from model with 3 comps must have length 3: ', function () {
        var cfg = {
            form: [{
                'key': 'comments',
                'add': 'New',
                'style': {
                    'add': 'btn-success'
                },
                'items': ['comments[].name']
            }],
            schema: {
                'type': 'object',
                'title': 'Comment',
                'required': ['comments'],
                'properties': {
                    'comments': {
                        'type': 'array',
                        'maxItems': 2,
                        'items': {
                            'type': 'object',
                            'properties': {
                                'name': {
                                    'title': 'Name',
                                    'type': 'string'
                                }
                            },
                            'required': ['name']
                        }
                    }
                }
            },
            model: {
                'comments': [{
                    'name': 'some value'
                }, {
                    'name': 'some next value'
                }, {
                    'name': 'some other value'
                }]
            }
        };

        var display = (0, _enzyme.render)(React.createElement(SchemaForm, {
            form: cfg.form,
            schema: cfg.schema,
            model: cfg.model,
            onModelChange: onModelChange
        }));

        expect(display.find('input').length).toEqual(3);
    });
});