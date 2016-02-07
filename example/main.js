var React = require('react');
var ReactDOM = require('react-dom');

var ExamplePage  = require('./ExamplePage');

// For me this obfuscates the location of the error when searching from console. Not sure why it's necessary.
var warn = console.warn;

console.warn = function(warning) {
    throw new Error(warning);
    warn.apply(console, arguments);
};

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

ReactDOM.render(<ExamplePage />, document.getElementById("app"));
