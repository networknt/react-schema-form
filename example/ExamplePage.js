/**
 * Created by steve on 12/09/15.
 */
var React = require('react');
var { SchemaForm } = require('react-schema-form');
require('react-select/less/select.less');
var Select = require('react-select');

var ExamplePage = React.createClass({

    getInitialState: function() {
        return {
            tests: [
                { label: "Simple", value: 'data/simple.json' },
                { label: "Basic JSON Schema Type", value: 'data/types.json' },
                { label: "Bootstrap Grid", value: 'data/grid.json' },
                { label: "Complex Key Support", value: 'data/complex-keys.json' },
                { label: "Array", value: 'data/array.json' },
                { label: "Tab Array", value: 'data/tabarray.json' },
                { label: "TitleMap Examples", value: 'data/titlemaps.json' },
                { label: "Kitchen Sink", value: 'data/sink.json' }
            ],
            itParsesSchema: true,
            itParsesForm: true
        };
    },

    onSelectChange: function(val) {
        console.log("Selected:" + val);
    },

    render: function() {
        return (
            <div className="col-md-12">
                <h1>Schema Form Example</h1>
                <div className="row">
                    <div className="col-sm-4">
                        <h3>The Generated Form</h3>
                        <SchemaForm/>
                        <h3>Model</h3>
                        <pre>pretty</pre>
                    </div>
                    <div className="col-sm-8">
                        <h3>Select Example</h3>
                        <div className="form-group">
                            <Select
                                name="selectTest"
                                value="data/simple.json"
                                options={this.state.tests}
                                onChange={this.onSelectChange}>
                            </Select>
                        </div>
                        <h3>Form</h3>
                        <div ui-ace="{ theme: 'monokai',mode:'json'}"
                             ng-className="{red: !itParsesForm}" ng-model="formJson" className="form-control form"></div>
                        <h3>Schema</h3>
                        <div ui-ace="{ theme: 'monokai',mode:'json'}"
                             ng-className="{red: !itParses}" ng-model="schemaJson" className="form-control schema"></div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ExamplePage;

