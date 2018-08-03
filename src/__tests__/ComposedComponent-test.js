jest.dontMock('../ComposedComponent');
jest.dontMock('../utils');
jest.dontMock('lodash');

var React = require('react');
var TestUtils = require('react-addons-test-utils');
import ComposedComponent from '../ComposedComponent';
import Text from '../Text';

describe('ComposedComponent', function() {

    it('shows default value at text field', function() {
        var shallowRenderer = TestUtils.createRenderer();
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

        shallowRenderer.render( 
            <Composed 
                form={cfg.form} 
                model={cfg.model}
                mapper={cfg.mapper}
        />);

        var result = shallowRenderer.getRenderOutput();

        expect(result.props.value).toEqual('steeve');
    });
});