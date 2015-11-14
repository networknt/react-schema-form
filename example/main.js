var React = require('react');
var ReactDOM = require('react-dom');

var ExamplePage  = require('./ExamplePage');

var warn = console.warn;

console.warn = function(warning) {
    throw new Error(warning);
    warn.apply(console, arguments);
};


ReactDOM.render(<ExamplePage />, document.getElementById("app"));
