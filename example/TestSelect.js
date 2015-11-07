/**
 * Created by steve on 12/09/15.
 */
'use strict';

var React = require('react');
var TestSelect = React.createClass({
    displayName: 'TestSelect',

    getInitialState: function() {
        return {
            tests: [
                { name: "Simple", data: 'data/simple.json' },
                { name: "Basic JSON Schema Type", data: 'data/types.json' },
                { name: "Bootstrap Grid", data: 'data/grid.json' },
                { name: "Complex Key Support", data: 'data/complex-keys.json' },
                { name: "Array", data: 'data/array.json' },
                { name: "Tab Array", data: 'data/tabarray.json' },
                { name: "TitleMap Examples", data: 'data/titlemaps.json' },
                { name: "Kitchen Sink", data: 'data/sink.json' }
            ]
        };
    },


    render: function render() {
        return (
            <div>SchemaForm</div>
        );
    }
});

module.exports = TestSelect;
