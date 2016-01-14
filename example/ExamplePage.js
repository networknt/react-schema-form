/**
 * Created by steve on 12/09/15.
 */
'use strict';

var React = require('react');
var utils = require('../src/utils');
var { SchemaForm } = require('react-schema-form');
require('react-select/less/select.less');
var Select = require('react-select');
var $ = require('jquery');
var Ace = require('react-ace');
require('brace/mode/json');
require('brace/theme/github');
require('rc-select/assets/index.css');
import RcSelect from 'react-schema-form-rc-select/lib/RcSelect';

const ThemeManager = require('material-ui/lib/styles/theme-manager');
const LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');

var ExamplePage = React.createClass({

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: this.state.muiTheme
        };
    },

    getInitialState: function() {
        return {
            tests: [
                { label: "Simple", value: 'data/simple.json' },
                { label: "Simple Array", value: 'data/simplearray.json'},
                { label: "Basic JSON Schema Type", value: 'data/types.json' },
                { label: 'Basic Radios', value: 'data/radio.json'},
                { label: 'Address', value: 'data/address.json'},
                { label: "Kitchen Sink", value: 'data/kitchenSink.json'},
                { label: "Login", value: 'data/login.json'},
                { label: "Date", value: 'data/date.json'},
                { label: "Readonly", value: 'data/readonly.json'},
                { label: "Array", value: 'data/array.json'},
                { label: "Object", value: 'data/object.json'},
                { label: "ArraySelect", value: 'data/arrayselect.json'}
            ],
            schema: {},
            form: [],
            model: {},
            schemaJson: '',
            formJson: '',
            selected: '',
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
        };
    },

    onSelectChange: function(val) {
        console.log("Selected:" + val);
        $.ajax({
            type: 'GET',
            url: val
        }).done(function(data) {

            console.log('done', data);
            //console.log('data.schema = ', data.schema);
            //console.log('data.form = ', data.form);
            this.setState({
                schemaJson: JSON.stringify(data.schema, undefined, 2),
                formJson: JSON.stringify(data.form, undefined, 2),
                selected : val,
                schema: data.schema,
                model: {},
                form: data.form
            })
        }.bind(this));
    },

    onModelChange: function(key, val) {
        //console.log('ExamplePage.onModelChange:', key);
        //console.log('ExamplePage.onModelChange:', val);


        var newModel = this.state.model;
        utils.selectOrSet(key, newModel, val);
        this.setState({ model: newModel });

    },

    onFormChange: function(val) {
        //console.log("onFormChange:" + val);
        try {
            let f = JSON.parse(val);
            this.setState({formJson: val, form: f});
        } catch (e) {
            this.setState({formJson: val})
        }
    },

    onSchemaChange: function(val) {
        //console.log("onSchemaChange:" + val);
        try {
            let s = JSON.parse(val);
            this.setState({schemaJson: val, schema: s});
        } catch (e) {
            this.setState({schemaJson: val})
        }
    },

    render: function() {
        var mapper = {
            "rc-select": RcSelect
        };

        var schemaForm = '';
        if (this.state.form.length > 0) {
            //console.log('schema = ', this.state.schema);
            //console.log('form = ', this.state.schema);
            //console.log('model = ', this.state.model);
            schemaForm = (
                <SchemaForm schema={this.state.schema} form={this.state.form} model={this.state.model} onModelChange={this.onModelChange} mapper={mapper} />
            );
        }

        return (
            <div className="col-md-12">
                <h1>Schema Form Example</h1>
                <div className="row">
                    <div className="col-sm-4">
                        <h3 style={{display:'inline-block'}}>The Generated Form</h3>
                        {schemaForm}
                        <h3>Model</h3>
                        <pre>{JSON.stringify(this.state.model,undefined,2,2)}</pre>
                    </div>
                    <div className="col-sm-8">
                        <h3>Select Example</h3>
                        <div className="form-group">
                            <Select
                                name="selectTest"
                                value={this.state.selected}
                                options={this.state.tests}
                                onChange={this.onSelectChange}>
                            </Select>
                        </div>
                        <h3>Form</h3>
                        <Ace mode="json" theme="github" height="300px" width="800px" onChange={this.onFormChange} name="aceForm" value={this.state.formJson} editorProps={{$blockScrolling: true}}/>
                        <h3>Schema</h3>
                        <Ace mode="json" theme="github" height="300px" width="800px" onChange={this.onSchemaChange} name="aceSchema" value={this.state.schemaJson} editorProps={{$blockScrolling: true}}/>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ExamplePage;

