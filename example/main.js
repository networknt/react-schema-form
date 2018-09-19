import React from 'react'
import ReactDOM from 'react-dom'

let ExamplePage = require('./ExamplePage')

// For me this obfuscates the location of the error when searching from console. Not sure why it's necessary.
let warn = console.warn

console.warn = function (warning) {
  throw new Error(warning)
  warn.apply(console, arguments)
}

ReactDOM.render(<ExamplePage/>, document.getElementById('app'))
