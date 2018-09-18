'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SchemaForm = require('../SchemaForm');

var _SchemaForm2 = _interopRequireDefault(_SchemaForm);

var _enzyme = require('enzyme');

var _enzymeAdapterReact = require('enzyme-adapter-react-16');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _enzyme.configure)({ adapter: new _enzymeAdapterReact2.default() });

var cfg = {
    form: ['name', {
        'key': 'date',
        'type': 'date',
        'condition': 'model.name !== "" && model.name !== undefined'
    }],
    schema: {
        'type': 'object',
        'title': 'Types',
        'properties': {
            'name': {
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

describe('Composed component test', function () {

    it('The simple condition :', function () {
        var display = (0, _enzyme.render)(_react2.default.createElement(_SchemaForm2.default, {
            form: cfg.form,
            schema: cfg.schema,
            model: cfg.model
        }));

        // Output must have two inputs
        expect(display.find('input').length).toEqual(2);
        // And secont inputs type have to be of type 'date'
        expect(display.find('input')[1].attribs.type).toEqual('date');
    });

    it('The complex condition :', function () {

        var newForm = ['name', {
            'key': 'date',
            'type': 'date',
            'condition': 'model.name !== "" && (2 > 1 && (model.name === "some" || model.name === "value"))'
        }];

        var model = { 'name': 'some' };

        var display = (0, _enzyme.render)(_react2.default.createElement(_SchemaForm2.default, {
            form: newForm,
            schema: cfg.schema,
            model: model
        }));
        // this case expected to have addictional date input
        expect(display.find('input').length).toEqual(2);

        model = { 'name': 'value' };
        display = (0, _enzyme.render)(_react2.default.createElement(_SchemaForm2.default, {
            form: newForm,
            schema: cfg.schema,
            model: model
        }));
        // and this one too
        expect(display.find('input').length).toEqual(2);

        model = { 'name': 'some other value' };
        display = (0, _enzyme.render)(_react2.default.createElement(_SchemaForm2.default, {
            form: newForm,
            schema: cfg.schema,
            model: model
        }));
        // here a date input is not expected cause condition is falsy
        expect(display.find('input').length).toEqual(1);
    });
});