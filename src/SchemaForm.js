/**
 * Created by steve on 11/09/15.
 */
var React = require('react');
var utils = require('./utils');
var FormField = require('./FormField');
var Number = require('./Number');
var Text = require('./Text');
var Textarea = require('./Textarea');

var SchemaForm = React.createClass({

    getInitialState: function() {
        return {
            model: this.props.model || {}
        };
    },

    onChange : function(key, val) {
        console.log('onChange val', val);
        console.log('onChange key', key);
        this.setState({model: utils.selectOrSet(key, this.state.model, val)});
        console.log('model = ', this.state.model);
        this.props.onModelChange(this.state.model);
    },

    renderSchema: function(form, model, index, onChange) {
        var result;
        switch (form.type) {
            case 'number':
                result = <Number model={model} form={form} key={index} onChange={onChange} />
                break;
            case 'text':
                result = <Text model={model} form={form} key={index} onChange={onChange} />
                break;
            case 'textarea':
                result = <Textarea model={model} form={form} key={index} onChange={onChange} />
                break;
            case 'array':
                result = <Array model={model} form={form} key={index} onChange={onChange} />
                break;
        }
        return result;
    },

    render: function() {
        var merged = utils.merge(this.props.schema, this.props.form, this.props.ignore, this.props.option);
        console.log('SchemaForm merged = ', JSON.stringify(merged, undefined, 2));
        var forms = merged.map(function(form, index) {
            return this.renderSchema(form, this.state.model, index, this.onChange);
        }.bind(this))

        return (
            <div>{forms}</div>
        );
    }
});

module.exports = SchemaForm;
