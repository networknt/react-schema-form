# react-schema-form

[![npm package](https://img.shields.io/npm/v/react-schema-form.svg?style=flat-square)](https://www.npmjs.org/package/react-schema-form)

[React](http://facebook.github.io/react/) forms based on json schema for form generation and validation. This is a port of the [angular schema form](https://github.com/Textalk/angular-schema-form) project using
[material-ui](http://www.material-ui.com/) for underline components.

Some of the components (like array and section) are still work in progress.

# [Live demo](http://networknt.github.io/react-schema-form/)

# Examples
Clone the project and run

```
npm install
npm start
```

Then open localhost:8080 in a browser.

# Installation

```sh
npm install react-schema-form@latest --save
```

# Usage
```js
var { SchemaForm } = require('react-schema-form');

<SchemaForm schema={this.state.schema} form={this.state.form} model={this.props.model} onModelChange={this.props.onModelChange} />

// for example:
_onChange: function() {
    this.setState({
        schema: FormStore.getForm('com.networknt.light.example').schema,
        form: FormStore.getForm('com.networknt.light.example').form
    });
}
```

# Contributing

See our [CONTRIBUTING.md](https://github.com/networknt/react-schema-form/CONTRIBUTING.md) for information on how to contribute.


# License

MIT Licensed. Copyright (c) Network New Technologies Inc. 2015.
