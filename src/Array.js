/**
 * Created by steve on 11/09/15.
 */
import React from 'react';
import utils from './utils';
import Number from './Number';
import Text from './Text';
import TextArea from './TextArea';
import Select from './Select';
import Radios from './Radios';
import Date from './Date';
import Checkbox from './Checkbox';
import Help from './Help';
import ComposedComponent from './ComposedComponent';
import {Button, IconButton, Card} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Close';

import _ from 'lodash';

class Array extends React.Component {

    constructor(props) {
        super(props);
        this.onAppend = this.onAppend.bind(this);
        this.onDelete = this.onDelete.bind(this);
        // we have the model here for the entire form, get the model for this array only
        // and add to the state. if is empty, add an entry by calling onAppend directly.
        this.state = {
            model: utils.selectOrSet(this.props.form.key, this.props.model) || []
        };
        //console.log('constructor', this.props.form.key, this.props.model, this.state.model);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.model && nextProps.form && nextProps.form.key) {
            this.setState({
                model: utils.selectOrSet(nextProps.form.key, nextProps.model) || []
            });
        }
    }

    componentDidMount() {
        // Always start with one empty form unless configured otherwise.
        if(this.props.form.startEmpty !== true && this.state.model.length === 0) {
            this.onAppend();
        }
    }

    onAppend() {
        //console.log('onAppend is called this.state.model', this.state.model);
        var empty;
        if(this.props.form && this.props.form.schema && this.props.form.schema.items) {
            var items = this.props.form.schema.items;
            if (items.type && items.type.indexOf('object') !== -1) {
                empty = {};

                // Check for possible defaults
                if (!this.props.options || this.props.options.setSchemaDefaults !== false) {
                    empty = typeof items['default'] !== 'undefined' ? items['default'] : empty;

                    // Check for defaults further down in the schema.
                    // If the default instance sets the new array item to something falsy, i.e. null
                    // then there is no need to go further down.
                    if (empty) {
                        utils.traverseSchema(items, function(prop, path) {
                            if (typeof prop['default'] !== 'undefined') {
                                utils.selectOrSet(path, empty, prop['default']);
                            }
                        });
                    }
                }

            } else if (items.type && items.type.indexOf('array') !== -1) {
                empty = [];
                if (!this.props.options || this.props.options.setSchemaDefaults !== false) {
                    empty = items['default'] || empty;
                }
            } else {
                // No type? could still have defaults.
                if (!this.props.options || this.props.options.setSchemaDefaults !== false) {
                    empty = items['default'] || empty;
                }
            }
        }
        var newModel = this.state.model;
        newModel.push(empty);
        this.setState({
                model: newModel
            }
        );
        this.props.onChangeValidate(this.state.model);
        //console.log('After append this.state.model', newModel);
    }

    onDelete(index) {
        var newModel = this.state.model;
        newModel.splice(index, 1);
        this.setState({
            model: newModel,
        });

        this.props.onChangeValidate(this.state.model);
    }

    setIndex(index) {
        return function(form) {
            if (form.key) {
                form.key[form.key.indexOf('')] = index;
            }
        };
    };

    copyWithIndex(form, index) {
        var copy = _.cloneDeep(form);
        copy.arrayIndex = index;
        utils.traverseForm(copy, this.setIndex(index));
        return copy;
    };

    render() {
        //console.log('Array.render', this.props.form.items, this.props.model, this.state.model);
        var arrays = [];
        var fields = [];
        var model = this.state.model;
        var items = this.props.form.items;
        //console.log('fields', fields);
        for(var i = 0; i < model.length; i++ ) {
            let boundOnDelete = this.onDelete.bind(this, i);
            let forms = this.props.form.items.map(function(form, index){
                var copy = this.copyWithIndex(form, i);
                return this.props.builder(copy, this.props.model, index, this.props.mapper, this.props.onChange, this.props.builder);
            }.bind(this));
            //console.log('forms', i, forms);
            arrays.push(
                <Card key={i} style={{padding:'20px'}}>
                    <IconButton onClick={boundOnDelete}><DeleteIcon /></IconButton>
                    {forms}
                </Card>
            );
        }
        return (
            <div>
                <div>
                    <label className="control-lable">{this.props.form.title}</label>
                    <ol className="list-group">
                        {arrays}
                    </ol>
                </div>
                <Button variant='raised' color='secondary' onClick={this.onAppend.bind(this)}>Add</Button>
            </div>
        );
    }
}

export default ComposedComponent(Array);
