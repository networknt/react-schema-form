'use strict';

var _ComposedComponent = require('../ComposedComponent');

var _ComposedComponent2 = _interopRequireDefault(_ComposedComponent);

var _Text = require('../Text');

var _Text2 = _interopRequireDefault(_Text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('../ComposedComponent');
jest.dontMock('../utils');
jest.dontMock('lodash');

var React = require('react');
var TestUtils = require('react-addons-test-utils');


describe('ComposedComponent', function () {

    it('shows default value at text field', function () {
        var shallowRenderer = TestUtils.createRenderer();
        var cfg = {
            form: {
                key: ['name'],
                schema: {
                    default: 'steeve',
                    title: 'name',
                    type: 'String'
                },
                type: 'text',
                title: 'name'
            },
            model: { name: 'steeve' },
            mapper: {}
        };

        var Composed = (0, _ComposedComponent2.default)(_Text2.default);

        shallowRenderer.render(React.createElement(Composed, {
            form: cfg.form,
            model: cfg.model,
            mapper: cfg.mapper
        }));

        var result = shallowRenderer.getRenderOutput();

        expect(result.props.value).toEqual('steeve');
    });
});
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }
}();

;