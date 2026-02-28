import React from "react";
import { SchemaForm, utils } from "react-schema-form";
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { githubLight } from '@uiw/codemirror-theme-github';

import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import Localizer from "./localizer";
import SelectLabel from "./selectlabel";
import ErrorBoundary from "./ErrorBoundary";

const examples = {
    localizer: Localizer,
    selectLabel: SelectLabel
};

class ExamplePage extends React.Component {
    constructor(props) {
        super(props);
        
        this.tempModel = {
            comments: [
                { name: "1" },
                { name: "2" }
            ]
        };

        this.state = {
            tests : [
                {label : "Simple", value: "data/simple.json"},
                {label : "Yaml Rule", value: "data/rule.json"},
                {label : "Static Autocomplete", value: "data/static-autocomplete.json"},
                {label : "Conditional Dynaselect", value: "data/conditional-dynaselect.json"},    
                {label : "Triple Boolean", value: "data/noanswer.json"},
                {label : "Simple Array", value: "data/simplearray.json"},
                {label : "Basic JSON Schema Type", value: "data/types.json"},
                {label : "Checkbox", value: "data/checkbox.json"},
                {label : "Basic Radios", value: "data/radio.json"},
                {label : "Condition", value: "data/condition.json"},
                {label : "Help", value: "data/help.json"},
                {label : "Kitchen Sink", value: "data/kitchenSink.json"},
                {label : "Login", value: "data/login.json"},
                {label : "Date", value: "data/date.json"},
                {label : "Number", value: "data/number.json"},
                {label : "Timestamp", value: "data/timestamp.json"},
                {label : "Subjects", value: "data/subjects.json"},
                {label : "Readonly", value: "data/readonly.json"},
                {label : "Array", value: "data/array.json"},
                {label : "Object", value: "data/object.json"},
                {label : "Select", value: "selectLabel"},
                {label : "ArraySelect", value: "data/arrayselect.json"},
                {label : "htmlClass", value: "data/htmlclass.json"},
                {label : "Tuples", value: "data/tuple.json"},
                {label : "Advanced Tuples", value: "data/tuple-advanced.json"},
                {label : "Conditional Array", value: "data/conditionalarray.json"},
                {label : "Markdown", value: "data/markdown.json"},
                {label : "Taxonomy", value: "data/taxonomy.json"},
                {label : "Test - Date Capture", value: "data/tests/datecapture.json"},
                {label : "Test - Localizer", value: "localizer"},
                {label : "Portal Config", value: "data/portal/config-detail.json"},
                {label : "Portal Quiz", value: "data/portal/quiz.json"},
                {label : "Schema Form", value: "data/portal/schema-form.json"},
                {label : "Logger Config", value: "data/portal/logger-config.json"},
                {label : "Portal Category", value: "data/portal/category.json"},
                {label : "MapRoot Restaurant", value: "data/maproot/restaurant.json"},
                {label : "MapRoot Payment", value: "data/maproot/payment.json"},
                {label : "MapRoot Pickup", value: "data/maproot/pickup.json"},
                {label : "Create API Version", value: "data/portal/create-api-version.json"},

            ],
            validationResult: {},
            schema: {},
            form: [],
            model: {},
            schemaJson: "",
            formJson: "",
            selected: "",
            localization: undefined,
            showErrors: false,
            isLoading: false
        };
    }

    componentDidUpdate(prevProps, prevState) {
        // Prevent unnecessary re-renders
        if (prevState.model === this.state.model && 
            prevState.form === this.state.form && 
            prevState.schema === this.state.schema) {
            return;
        }
    }

    setStateDefault = () => {
        this.setState({ model: JSON.parse(JSON.stringify(this.tempModel)) });
    };

    onSelectChange = async ({ target: { value } }) => {
        // Set loading state
        this.setState({ isLoading: true });

        try {
            if (!value) {
                this.setState({
                    schemaJson: "",
                    formJson: "",
                    selected: "",
                    schema: {},
                    model: {},
                    form: [],
                    showErrors: false,
                    isLoading: false
                });
                return;
            }

            if (!value.endsWith("json")) {
                const elem = examples[value];
                this.setState({
                    schemaJson: JSON.stringify(elem.schema, undefined, 2),
                    formJson: JSON.stringify(elem.form, undefined, 2),
                    selected: value,
                    schema: elem.schema,
                    model: elem.model || {},
                    form: elem.form,
                    localization: elem.localization,
                    showErrors: false,
                    isLoading: false
                });
            } else {
                const response = await fetch(value);
                const { form, schema, model } = await response.json();
                
                // Update state only if component is still mounted
                if (this._isMounted) {
                    this.setState({
                        schemaJson: JSON.stringify(schema, undefined, 2),
                        formJson: JSON.stringify(form, undefined, 2),
                        selected: value,
                        schema,
                        model: model || {},
                        form,
                        showErrors: false,
                        isLoading: false
                    });
                }
            }
        } catch (error) {
            console.error('Error loading form data:', error);
            this.setState({ 
                isLoading: false,
                error: 'Failed to load form data'
            });
        }
    };

    onModelChange = (key, val, type) => {
        requestAnimationFrame(() => {
            this.setState(prevState => {
                const newModel = JSON.parse(JSON.stringify(prevState.model));
                utils.selectOrSet(key, newModel, val, type);
                return { model: newModel };
            });
        });
    };

    onValidate = () => {
        const { schema, model } = this.state;
        const result = utils.validateBySchema(schema, model);
        this.setState({ validationResult: result, showErrors: true });
    };

    onFormChange = val => {
        try {
            const form = JSON.parse(val);
            requestAnimationFrame(() => {
                this.setState({ formJson: val, form });
            });
        } catch (e) {
            console.debug('Invalid JSON - still typing...');
        }
    };

    onSchemaChange = val => {
        try {
            const schema = JSON.parse(val);
            requestAnimationFrame(() => {
                this.setState({ schemaJson: val, schema });
            });
        } catch (e) {
            console.debug('Invalid JSON - still typing...');
        }
    };

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    renderSchemaForm = () => {
        const { schema, form, model, localization, showErrors } = this.state;
        
        if (!form || form.length === 0) return null;

        return (
            <ErrorBoundary>
                <SchemaForm
                    key={`schema-form-${JSON.stringify(form)}`}
                    schema={schema}
                    form={form}
                    onModelChange={this.onModelChange}
                    mapper={{}}
                    model={model}
                    localization={localization}
                    showErrors={showErrors}
                />
            </ErrorBoundary>
        );
    };

    render() {
        const {
            model,
            validationResult,
            selected,
            tests,
            formJson,
            schemaJson,
            form,
            isLoading
        } = this.state;

        if (isLoading) {
            return <div>Loading...</div>;
        }

        return (
            <div className="col-md-12">
                <h1>Schema Form Example</h1>
                <div className="row">
                    <div className="col-sm-4">
                        <h3 style={{ display: "inline-block" }}>
                            The Generated Form
                        </h3>
                        {this.renderSchemaForm()}
                        <h3>Model</h3>
                        <pre>{JSON.stringify(model, undefined, 2)}</pre>
                        {form.length > 0 && (
                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.onValidate}
                                >
                                    Validate
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.setStateDefault}
                                >
                                    Throw temp model in
                                </Button>
                                <pre>{JSON.stringify(validationResult, undefined, 2)}</pre>
                            </div>
                        )}
                    </div>
                    <div className="col-sm-8">
                        <h3>Select Example</h3>
                        <FormControl
                            classes={{ root: "form-group" }}
                            style={{ minWidth: 150 }}
                        >
                            <InputLabel htmlFor="select-test">
                                select-test
                            </InputLabel>
                            <Select
                                autoWidth
                                name="selectTest"
                                inputProps={{
                                    name: "selectTest",
                                    id: "select-test"
                                }}
                                value={selected}
                                onChange={this.onSelectChange}
                            >
                                {tests.map(({ label, value }) => (
                                    <MenuItem key={value} value={value}>
                                        {label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <h3>Form</h3>
                        <CodeMirror 
                            value={formJson} 
                            height="300px" 
                            width="800px" 
                            theme={githubLight} 
                            extensions={[json()]} 
                            onChange={this.onFormChange}
                        />
                        <h3>Schema</h3>
                        <CodeMirror 
                            value={schemaJson} 
                            height="300px" 
                            width="800px" 
                            theme={githubLight} 
                            extensions={[json()]} 
                            onChange={this.onSchemaChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ExamplePage;
