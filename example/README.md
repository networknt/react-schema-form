# react-schema-form example

The example app loads selectable JSON fixtures from `public/data` and renders them with the
workspace version of `react-schema-form`.

```sh
npm install
npm run dev
```

Create the production build with:

```sh
npm run build
```

The structured-data examples cover:

- a closed object with generated Form controls;
- an open object that falls back to JSON/YAML;
- a primitive array;
- an array of objects;
- invalid draft and Reset behavior;
- a read-only structured value.

Select an example whose name starts with `Structured -` in the example picker. The model preview
shows that successful edits remain typed objects or arrays rather than JSON/YAML strings.
