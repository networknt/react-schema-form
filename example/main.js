var React = require('react');
var ExamplePage  = require('./ExamplePage');

var warn = console.warn;

console.warn = function(warning) {
    throw new Error(warning);
    warn.apply(console, arguments);
};

React.render(<ExamplePage />, document.body);
