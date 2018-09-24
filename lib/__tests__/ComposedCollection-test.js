'use strict';

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})();

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
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(Text, 'Text', 'src/__tests__/ComposedCollection-test.js');
    reactHotLoader.register(Composed, 'Composed', 'src/__tests__/ComposedCollection-test.js');
    leaveModule(module);
})();

;