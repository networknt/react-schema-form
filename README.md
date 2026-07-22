# react-schema-form

[![Join the chat at https://gitter.im/networknt/react-schema-form](https://badges.gitter.im/networknt/react-schema-form.svg)](https://gitter.im/networknt/react-schema-form?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![CircleCI](https://circleci.com/gh/networknt/react-schema-form.svg?style=svg)](https://circleci.com/gh/networknt/react-schema-form)

[![npm package](https://img.shields.io/npm/v/react-schema-form.svg?style=flat-square)](https://www.npmjs.org/package/react-schema-form)

[React](http://facebook.github.io/react/) forms based on json schema for form generation and validation. This is a port of the [angular schema form](https://github.com/Textalk/angular-schema-form) project using
[material-ui](http://www.material-ui.com/) for the underlying components.

# Live demo
[demo](http://networknt.github.io/react-schema-form/)

While you are trying the demo forms, you can update the schema and form in the json editor to see the instant re-rendered form. This is a way to build form interactively.

# Examples

If you don't have babel-cli installed globally, please do it first.

```
sudo npm install -g babel-cli
```

Clone the project and run

```
cd react-schema-form
npm install
cd example
yarn
npm start
```

Then open localhost:8080 in a browser.

# Installation

```sh
npm install react-schema-form --save
```

There is one added on component react-schema-form-rc-select for multiple select and dynamically loading dropdown from server. To install it.
```
npm install react-schema-form-rc-select --save
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

## Structured object and array fields

Use `type: "structured"` for a schema property whose value must remain a JSON-compatible
object or array. The default UI provides Form, JSON, and YAML tabs. Form reuses the normal
schema-generated controls and the effective mapper, so mapper overrides, nested fields,
defaults, conditions, and read-only descendants continue to work.

```js
const schema = {
  type: 'object',
  properties: {
    provider: {
      type: 'object',
      additionalProperties: false,
      required: ['name'],
      properties: {
        name: { type: 'string', title: 'Provider name' },
        retries: { type: 'integer', minimum: 0, default: 3 },
      },
    },
  },
}

const form = [{
  key: 'provider',
  type: 'structured',
  tabs: ['form', 'json', 'yaml'],
  defaultTab: 'form',
  editorRows: 14,
}]

const model = { provider: { name: 'primary', retries: 3 } }
```

The same configuration can be placed in the schema when a separate form definition is not
needed:

```js
const schema = {
  type: 'object',
  properties: {
    provider: {
      type: 'object',
      'x-schema-form': {
        type: 'structured',
        tabs: ['form', 'json', 'yaml'],
        defaultTab: 'form',
      },
      properties: {
        name: { type: 'string', title: 'Provider name' },
      },
    },
  },
}
```

### Configuration

| Option | Behavior |
| --- | --- |
| `tabs` | Ordered subset of `form`, `json`, and `yaml`. Defaults to all three. |
| `defaultTab` | Initial enabled tab. Falls back to the first enabled tab. |
| `editorRows` | Row count for the default multiline JSON/YAML editor. Defaults to 12. |
| `codecOptions` | Overrides `maxInputBytes`, `maxDepth`, `maxNodes`, or `maxAliasCount`. |
| `EditorComponent` | Component used instead of the default multiline editor. |
| `renderEditor` | Render callback alternative to `EditorComponent`. |
| `onDraftError` | Callback receiving a parse or validation error and `{ form, format }`. |

`EditorComponent` and `renderEditor` receive `value`, `onChange`, `format`, `label`,
`readOnly`, `rows`, `error`, and `ariaDescribedBy`. `onChange` accepts either a text string
or a normal input change event.

```js
const form = [{
  key: 'provider',
  type: 'structured',
  EditorComponent: MyCodeEditor,
}]
```

### Synchronization and validation

- Form edits update the typed model immediately and regenerate the JSON and YAML text.
- JSON/YAML edits remain local drafts until Apply succeeds. Parsing, structured-root checks,
  and AJV schema validation all run before `onModelChange` receives the object, array, or null.
- Invalid drafts preserve the last valid model. Reset restores the active text editor from that
  value.
- A dirty JSON/YAML draft locks tab switching so edits cannot be silently discarded.
- If the parent supplies a different value while a text draft is dirty, Reload accepts the
  external value and Keep Draft preserves the local text for another Apply attempt.
- Formatting, key ordering, YAML comments, anchors, and the user's original quoting style are
  not preserved after Apply. The component preserves semantic JSON-compatible data, then
  regenerates both text representations.

Form is disabled for `null`, an uninitialized value, or an open object with no named properties.
Use JSON or YAML to initialize nullable values and to edit arbitrary additional properties.

### Safe YAML and resource limits

YAML uses the YAML 1.2 core schema and accepts exactly one document. Duplicate keys, merge
keys, custom tags, unsupported node types, unsafe object keys (`__proto__`, `constructor`, and
`prototype`), cycles, non-finite numbers, and non-JSON values are rejected. Aliases are bounded
before conversion to protect against expansion attacks.

The defaults are:

| Limit | Default |
| --- | ---: |
| Input size | 1 MiB |
| Nesting depth | 100 |
| Normalized nodes | 10,000 |
| YAML aliases | 20 |

Treat the structured field as a configuration-data editor, not an unbounded document editor.
Applications may lower these limits with `codecOptions`; raising them should be based on measured
payload requirements.

## Peer dependencies

The package declares React, React DOM, MUI, Emotion, MUI X date pickers, CodeMirror, Day.js, and
the markdown editor as peers because the corresponding built-in fields integrate with them.
Install the peer versions reported by your package manager and keep a single compatible React,
MUI, and Emotion instance in the application. npm 7 and newer normally installs peers
automatically; warnings indicate a missing or incompatible host version and should be resolved
rather than suppressed.
# Examples

There are some simple forms in the demo to show how each fields to be rendered.
For more real world exmaples, please check [Light Framework Forms](https://github.com/networknt/light/tree/master/server/src/main/resources/form)

There are still some angular schema form in this folder and migration is in progress.

If you are interested in how these forms are utilized in the framework, please take a look at a react component [Form.jsx](https://github.com/networknt/light/blob/master/edibleforestgarden/src/app/components/Form.jsx)

Basically, All forms in this folder will be loaded to an Graph Database and UI is rendered by formId and form model will be validated on the browser as well as
backend APIs.

# Form format

React-schema-form implements the form format as defined by the json-schema-form standard.

The documentation for that format is located at the [json-schema-form wiki](https://github.com/json-schema-form/json-schema-form/wiki/Documentation).

## DynaSelect option grouping

`dynaselect` can render grouped dropdown options when the fetched or static options include group metadata.

```json
{
  "key": "apiTags",
  "type": "dynaselect",
  "multiple": true,
  "groupByKey": "groupLabel",
  "groupSortKey": "groupSortOrder",
  "optionSortKey": "tagSortOrder",
  "optionValueKey": "value"
}
```

The option payload remains a flat list, for example:

```json
[
  { "id": "tag-uuid", "value": "openapi", "label": "openapi", "groupLabel": "Protocol / Spec", "groupSortOrder": 10, "tagSortOrder": 10 }
]
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

# Error Handler

The error handler is disabled by default but you can enable it by using showErrors prop on `SchemaForm`.

```js
...
onValidate = () => {
    if (form is valid) {
        ...
    } else {
        this.setState({ showErrors: true });
    }
}

...
    <>
        <SchemaForm
            schema={schemaObject}
            form={formObject}
            model={modelObject}
            onModelChange={this.onModelChange}
            mapper={mapperObject}
            showErrors={this.state.showErrors}
        />
        <Button onClick={this.validate}>Submit</Button>
    </>
```


# Contributing

See our [CONTRIBUTING.md](https://github.com/networknt/react-schema-form/CONTRIBUTING.md) for information on how to contribute.


# License

MIT Licensed. Copyright (c) Network New Technologies Inc. 2020.
