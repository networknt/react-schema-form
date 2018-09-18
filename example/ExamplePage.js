import React from 'react'
import {SchemaForm, utils} from 'react-schema-form'
import AceEditor from 'react-ace'
import {MenuItem, RaisedButton, SelectField} from 'material-ui'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import lightRawTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
// import RcSelect from 'react-schema-form-rc-select/lib/RcSelect'
import 'brace/ext/language_tools'
import 'brace/mode/json'
import 'brace/theme/github'


let ExamplePage = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    }
  },

  getInitialState: function () {
    return {
      tests: [
        {label: 'Simple', value: 'data/simple.json'},
        {label: 'Simple Array', value: 'data/simplearray.json'},
        {label: 'Basic JSON Schema Type', value: 'data/types.json'},
        {label: 'Basic Radios', value: 'data/radio.json'},
        {label: 'Condition', value: 'data/condition.json'},
        {label: 'Kitchen Sink', value: 'data/kitchenSink.json'},
        {label: 'Login', value: 'data/login.json'},
        {label: 'Date', value: 'data/date.json'},
        {label: 'Readonly', value: 'data/readonly.json'},
        {label: 'Array', value: 'data/array.json'},
        {label: 'Object', value: 'data/object.json'},
        {label: 'ArraySelect', value: 'data/arrayselect.json'}
      ],
      validationResult: {},
      schema: {},
      form: [],
      model: {},
      schemaJson: '',
      formJson: '',
      selected: '',
      muiTheme: getMuiTheme(lightRawTheme)
    }
  },

  onSelectChange: function (event, index, value) {
    if (!value) {
      this.setState({
        schemaJson: '',
        formJson: '',
        selected: '',
        schema: {},
        model: {},
        form: []
      })
      return
    }

    fetch(value)
      .then(x => x.json())
      .then(({form, schema}) => {
        this.setState({
          schemaJson: JSON.stringify(schema, undefined, 2),
          formJson: JSON.stringify(form, undefined, 2),
          selected: value,
          schema,
          model: {},
          form
        })
      })
  },

  onModelChange: function (key, val, type) {
    console.log('ExamplePage.onModelChange:', key, val)
    let newModel = this.state.model
    utils.selectOrSet(key, newModel, val, type)
    this.setState({model: newModel})
  },

  onValidate: function () {
    console.log('ExamplePage.onValidate is called')
    let result = utils.validateBySchema(this.state.schema, this.state.model)
    this.setState({validationResult: result})
  },

  onFormChange: function (val) {
      let f = JSON.parse(val)
      this.setState({formJson: val, form: f})
  },

  onSchemaChange: function (val) {
      let s = JSON.parse(val)
      this.setState({schemaJson: val, schema: s})
  },

  render: function () {
    let mapper = {
      // 'rc-select': RcSelect
    }

    let schemaForm = ''
    let validate = ''
    if (this.state.form.length > 0) {
      schemaForm = (
        <SchemaForm schema={this.state.schema} form={this.state.form} model={this.state.model}
                    onModelChange={this.onModelChange} mapper={mapper}/>
      )
      validate = (
        <div>
          <RaisedButton primary={true} label="Validate" onClick={this.onValidate}/>
          <pre>{JSON.stringify(this.state.validationResult, undefined, 2)}</pre>
        </div>
      )
    }

    return (
      <div className="col-md-12">
        <h1>Schema Form Example</h1>
        <div className="row">
          <div className="col-sm-4">
            <h3 style={{display: 'inline-block'}}>The Generated Form</h3>
            {schemaForm}
            <h3>Model</h3>
            <pre>{JSON.stringify(this.state.model, undefined, 2)}</pre>
            {validate}
          </div>
          <div className="col-sm-8">
            <h3>Select Example</h3>
            <div className="form-group">
              <SelectField
                floatingLabelText="tests"
                value={this.state.selected}
                onChange={this.onSelectChange}>
                {this.state.tests.map(({label, value}) => <MenuItem key={value} value={value} primaryText={label}/>)}
              </SelectField>
            </div>
            <h3>Form</h3>
            <AceEditor mode="json" theme="github" height="300px" width="800px" onChange={this.onFormChange}
                       name="aceForm" value={this.state.formJson} editorProps={{$blockScrolling: true}}/>
            <h3>Schema</h3>
            <AceEditor mode="json" theme="github" height="300px" width="800px" onChange={this.onSchemaChange}
                       name="aceSchema" value={this.state.schemaJson} editorProps={{$blockScrolling: true}}/>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = ExamplePage
