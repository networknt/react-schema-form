'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SchemaForm = require('../SchemaForm');

var _SchemaForm2 = _interopRequireDefault(_SchemaForm);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _enzyme = require('enzyme');

var _enzymeAdapterReact = require('enzyme-adapter-react-16');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

var _core = require('@material-ui/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _enzyme.configure)({ adapter: new _enzymeAdapterReact2.default() });

function onModelChange(key, val, type) {
    var newModel = {};
    _utils2.default.selectOrSet(key, newModel, val, type);
}

var cfg = {
    form: ['issues'],
    schema: {
        'type': 'object',
        'title': 'Issues',
        'properties': {
            'issues': {
                'title': 'Did you have any issues?',
                'type': 'tBoolean',
                'default': 'unanswered'
            }
        }
    },
    model: {},
    mapper: {}
};

describe('SchemaForm test', function () {

    it('shows SchemaForm', function () {
        var result = (0, _enzyme.render)(_react2.default.createElement(_SchemaForm2.default, {
            form: cfg.form,
            model: cfg.model,
            schema: cfg.schema,
            onModelChange: onModelChange
        }));

        // the initial phase, we don't a clear button so we don't expect it render
        expect(result.find('Button').length).toEqual(0);

        cfg.model['issues'] = 'no';
        var result = (0, _enzyme.render)(_react2.default.createElement(_SchemaForm2.default, {
            form: cfg.form,
            model: cfg.model,
            schema: cfg.schema,
            onModelChange: onModelChange
        }));
        // Second phase, user have made the choice so we expect clear button to render
        expect(result.find('Button').length).toEqual(1);

        cfg.model['issues'] = 'unanswered';
        var result = (0, _enzyme.render)(_react2.default.createElement(_SchemaForm2.default, {
            form: cfg.form,
            model: cfg.model,
            schema: cfg.schema,
            onModelChange: onModelChange
        }));
        // user cleared his choice so we expect button to hide
        expect(result.find('Button').length).toEqual(0);
    });
});
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(onModelChange, 'onModelChange', 'src/__tests__/TripleBoolean-test.js');

    __REACT_HOT_LOADER__.register(cfg, 'cfg', 'src/__tests__/TripleBoolean-test.js');
}();

;