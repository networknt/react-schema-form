'use strict';

var React = require('react');
var Text = require('../Text').default;
var Composed = require('../ComposedComponent').default;
var Shalow = require('react-test-renderer/shallow');

test('Composed component test', function () {

    var renderer = new Shalow();
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

    var TestText = Composed(Text);
    renderer.render(React.createElement(TestText, {
        form: cfg.form,
        model: cfg.model,
        mapper: cfg.mapper
    }));

    var result = renderer.getRenderOutput();

    expect(result.props.value).toEqual('steeve');
});