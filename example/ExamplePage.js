/**
 * Created by steve on 12/09/15.
 */

import React from 'react';
import { utils } from 'react-schema-form';
import { SchemaForm } from 'react-schema-form';
// require('react-select/less/select.less');
import Select from 'react-select';
var $ = require('jquery');
import AceEditor from 'react-ace';
// require('brace/ext/language_tools');
// require('brace/mode/json');
// require('brace/theme/github');
// require('rc-select/assets/index.css');

// RcSelect is still in migrating process so it's excluded for now
// import RcSelect from 'react-schema-form-rc-select/lib/RcSelect';
import Button from '@material-ui/core/Button';

class ExamplePage extends React.Component{

    tempModel = {
        'comments': [
          {
            'name': '1'
          },
          {
            'name': '2'
          }
        ]
    }

    state = {
            tests: [
                { label: 'Simple', value: 'data/simple.json' },
                { label: 'Triple Boolean', value: 'data/noanswer.json' },
                { label: 'Simple Array', value: 'data/simplearray.json'},
                { label: 'Basic JSON Schema Type', value: 'data/types.json' },
                { label: 'Basic Radios', value: 'data/radio.json'},
                { label: 'Condition', value: 'data/condition.json'},
                { label: 'Kitchen Sink', value: 'data/kitchenSink.json'},
                { label: 'Login', value: 'data/login.json'},
                { label: 'Date', value: 'data/date.json'},
                { label: 'Readonly', value: 'data/readonly.json'},
                { label: 'Array', value: 'data/array.json'},
                { label: 'Object', value: 'data/object.json'},
                { label: 'ArraySelect', value: 'data/arrayselect.json'}
            ],
            validationResult: {},
            schema: {},
            form: [],
            model: {},
            schemaJson: '',
            formJson: '',
            selected: ''
    };

    setStateDefault() {
        this.setState({
            model: this.tempModel,
        });
    }

    onSelectChange(val) {
        //console.log('Selected:' + val);
        if(!val) {
            this.setState({
                schemaJson: '',
                formJson: '',
                selected : '',
                schema: {},
                model: {},
                form: []
            });
            return;
        }

        $.ajax({
            type: 'GET',
            url: val.value
        }).done(function(data) {
            //console.log('done', data);
            //console.log('data.schema = ', data.schema);
            //console.log('data.form = ', data.form);
            this.setState({
                schemaJson: JSON.stringify(data.schema, undefined, 2),
                formJson: JSON.stringify(data.form, undefined, 2),
                selected : val.value,
                schema: data.schema,
                model: {},
                form: data.form
            });
        }.bind(this));
    }

    onModelChange(key, val, type) {
        console.log('ExamplePage.onModelChange:', key, val);
        var newModel = this.state.model;
        utils.selectOrSet(key, newModel, val, type);
        this.setState({ model: newModel });
    }

    onValidate() {
        console.log('ExamplePage.onValidate is called');
        let result = utils.validateBySchema(this.state.schema, this.state.model);
        this.setState({ validationResult: result });
    }

    onFormChange(val) {
        try {
            let f = JSON.parse(val);
            this.setState({formJson: val, form: f});
        } catch (e) {}
    }

    onSchemaChange(val) {
        try {
            let s = JSON.parse(val);
            this.setState({schemaJson: val, schema: s});
        } catch (e) {}
    }

    render() {
        var mapper = {
            // 'rc-select': RcSelect
        };

        var schemaForm = '';
        var validate = '';
        if (this.state.form.length > 0) {
            schemaForm = (
                <SchemaForm schema={this.state.schema} form={this.state.form} model={this.state.model} onModelChange={this.onModelChange.bind(this)} mapper={mapper} />
            );
            validate = (
                <div>
                    <Button variant='raised' color='primary' onClick={this.onValidate.bind(this)}>Validate</Button>
                    <Button variant='raised' color='primary' onClick={this.setStateDefault.bind(this)}>Throw temp model in</Button>
                    <pre>{JSON.stringify(this.state.validationResult,undefined,2,2)}</pre>
                </div>
            );
        }

        return ( 
            <div className='col-md-12'>
                <h1>Schema Form Example</h1>
                <div className='row'>
                    <div className='col-sm-4'>
                        <h3 style={{display:'inline-block'}}>The Generated Form</h3>
                        {schemaForm}
                        <h3>Model</h3>
                        <pre>{JSON.stringify(this.state.model,undefined,2,2)}</pre>
                        {validate}
                    </div>
                    <div className='col-sm-8'>
                        <h3>Select Example</h3>
                        <div className='form-group'>
                            <Select
                                name='selectTest'
                                value={this.state.selected}
                                options={this.state.tests}
                                onChange={this.onSelectChange.bind(this)}>
                            </Select>
                        </div>
                        <h3>Form</h3>
                            <AceEditor style={{'zIndex': '-1'}} mode='json' theme='github' height='300px' width='800px' onChange={this.onFormChange.bind(this)} name='aceForm' value={this.state.formJson} editorProps={{$blockScrolling: true}}/>
                        <h3>Schema</h3>
                            <AceEditor mode='json' theme='github' height='300px' width='800px' onChange={this.onSchemaChange.bind(this)} name='aceSchema' value={this.state.schemaJson} editorProps={{$blockScrolling: true}}/>
                    </div>
                </div>
            </div>
        );
    }
};

module.exports = ExamplePage;
