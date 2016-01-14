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

# Customization
react-schema-form provides most fields including FieldSet and Array and they might cover most use cases; however, you might have requirement that needs something that is not built in. In this case, you
can implement your own field and inject it into the generic mapper for the builder to leverage your component. By passing a mapper as a props to the SchemaForm, you can replace built in component with
yours or you can define a brand new type and provide your component to render it.

[react-schema-form-rc-select](https://github.com/networknt/react-schema-form-rc-select) is an example to provide multiple select to the react schema form.

```js
require('rc-select/assets/index.css');
import RcSelect from 'react-schema-form-rc-select/lib/RcSelect';

...

        var mapper = {
            "rc-select": RcSelect
        };

        var schemaForm = '';
        if (this.state.form.length > 0) {
            schemaForm = (
                <SchemaForm schema={this.state.schema} form={this.state.form} model={this.state.model} onModelChange={this.onModelChange} mapper={mapper} />
            );
        }


```


# Contributing

See our [CONTRIBUTING.md](https://github.com/networknt/react-schema-form/CONTRIBUTING.md) for information on how to contribute.


# License

MIT Licensed. Copyright (c) Network New Technologies Inc. 2015.
