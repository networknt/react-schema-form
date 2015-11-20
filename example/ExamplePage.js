/**
 * Created by steve on 12/09/15.
 */
'use strict';

var React = require('react');
var utils = require('../src/utils');
var { SchemaForm } = require('react-schema-form');
import {MuiSchemaForm} from 'react-schema-form';
require('react-select/less/select.less');
var Select = require('react-select');
var $ = require('jquery');
var Ace = require('react-ace');
require('brace/mode/json');
require('brace/theme/github');

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
                { label: "Basic JSON Schema Type", value: 'data/types.json' },
                { label: 'Basic Radios', value: 'data/radio.json'},
                { label: "Kitchen Sink", value: 'data/kitchenSink.json'}
            ],
            schema: {},
            form: [],
            model: {},
            schemaJson: '',
            formJson: '',
            selected: '',
            libraryOptions: [
                {label: 'Bootstrap', value: 'bootstrap'},
                {label: 'Material-UI (beta)', value: 'material-ui'}
            ],
            selectedLibrary: 'bootstrap',
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
        };
    },

    onSelectChange: function(val) {
        //console.log("Selected:" + val);
        $.ajax({
            type: 'GET',
            url: val
        }).done(function(data) {

            //console.log('done', data);
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
        this.setState({model: utils.selectOrSet(key, this.state.model, val)});
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

    onLibraryChange: function(val) {
        console.log("Library change:", val);
        this.setState({
            selectedLibrary: val
        });
    },

    render: function() {

        var schemaForm = '';
        if (this.state.form.length > 0) {
            //console.log('schema = ', this.state.schema);
            //console.log('form = ', this.state.schema);
            //console.log('model = ', this.state.model);
            if (typeof this.state.selectedLibrary === 'undefined' || this.state.selectedLibrary === 'bootstrap') {
                schemaForm = (
                    <SchemaForm schema={this.state.schema} form={this.state.form} model={this.state.model} onModelChange={this.onModelChange} />
                );
            } else {
                schemaForm = (
                    <MuiSchemaForm schema={this.state.schema} form={this.state.form} model={this.state.model} onModelChange={this.onModelChange} />
                );
            }
        }

        return (
            <div className="col-md-12">
                <h1>Schema Form Example</h1>
                <div className="row">
                    <div className="col-sm-4">
                        <h3 style={{display:'inline-block'}}>The Generated Form</h3>
                        <span style={{width: '150px', position: 'absolute', top: '20px', right: '15px'}}>
                            <Select name="selectLibrary"
                                    value={this.state.selectedLibrary}
                                    onChange={this.onLibraryChange}
                                    options={this.state.libraryOptions}>
                            </Select>
                        </span>
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

