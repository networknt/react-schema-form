import React from 'react'
import {SchemaForm, utils} from 'react-schema-form'
import AceEditor from 'react-ace'
import {Button, FormControl, InputLabel, MenuItem, Select} from '@material-ui/core'
import {ErrorBoundary} from './ErrorBoundary'
// RcSelect is still in migrating process so it's excluded for now
// import RcSelect from 'react-schema-form-rc-select/lib/RcSelect';

class ExamplePage extends React.Component {

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
            {label: 'Simple', value: 'data/simple.json'},
            {label: 'Triple Boolean', value: 'data/noanswer.json'},
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
        selected: ''
    }

    setStateDefault = () => this.setState({model: this.tempModel})

    onSelectChange = ({target: {value}}) => {
        if (!value) {
            return this.setState({
                schemaJson: '',
                formJson: '',
                selected: '',
                schema: {},
                model: {},
                form: []
            })
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
                    form,
                })
            })
    }

    onModelChange = (key, val, type) => {
        console.log('ExamplePage.onModelChange:', key, val)
        let newModel = this.state.model
        utils.selectOrSet(key, newModel, val, type)
        this.setState({model: newModel})
    }

    onValidate = () => {
        console.log('ExamplePage.onValidate is called')
        let result = utils.validateBySchema(this.state.schema, this.state.model)
        this.setState({validationResult: result})
    }

    onFormChange = (val) => {
        try {
            const form = JSON.parse(val)
            this.setState({formJson: val, form})
        } catch (e) {
            console.error(e)
        }
    }

    onSchemaChange = (val) => {
        try {
            const schema = JSON.parse(val)
            this.setState({schemaJson: val, schema})
        } catch (e) {
            console.error(e)
        }
    }

    render() {
        let mapper = {
            // 'rc-select': RcSelect
        }

        let schemaForm = ''
        let validate = ''
        if (this.state.form.length > 0) {
            schemaForm = (
                <ErrorBoundary>
                    <SchemaForm schema={this.state.schema} form={this.state.form} model={this.state.model}
                                onModelChange={this.onModelChange} mapper={mapper}/>
                </ErrorBoundary>
            )
            validate = (
                <div>
                    <Button variant='raised' color='primary' onClick={this.onValidate}>Validate</Button>
                    <Button variant='raised' color='primary' onClick={this.setStateDefault}>Throw temp model
                        in</Button>
                    <pre>{JSON.stringify(this.state.validationResult, undefined, 2)}</pre>
                </div>
            )
        }

        return (
            <div className='col-md-12'>
                <h1>Schema Form Example</h1>
                <div className='row'>
                    <div className='col-sm-4'>
                        <h3 style={{display: 'inline-block'}}>The Generated Form</h3>
                        {schemaForm}
                        <h3>Model</h3>
                        <pre>{JSON.stringify(this.state.model, undefined, 2)}</pre>
                        {validate}
                    </div>
                    <div className='col-sm-8'>
                        <h3>Select Example</h3>
                        <FormControl classes={{root: 'form-group'}} style={{minWidth: 150}}>
                            <InputLabel htmlFor="select-test">select-test</InputLabel>
                            <Select
                                autoWidth
                                name='selectTest'
                                inputProps={{name: 'selectTest', id: 'select-test'}}
                                value={this.state.selected}
                                onChange={this.onSelectChange}>
                                {this.state.tests.map(({label, value}) =>
                                    <MenuItem key={value} value={value}>{label}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <h3>Form</h3>
                        <AceEditor mode='json' theme='github' height='300px' width='800px'
                                   onChange={this.onFormChange} name='aceForm'
                                   value={this.state.formJson} editorProps={{$blockScrolling: true}}/>
                        <h3>Schema</h3>
                        <AceEditor mode='json' theme='github' height='300px' width='800px'
                                   onChange={this.onSchemaChange} name='aceSchema'
                                   value={this.state.schemaJson} editorProps={{$blockScrolling: true}}/>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = ExamplePage
