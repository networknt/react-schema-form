/**
 * Created by steve on 11/09/15.
 */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import _ from 'lodash';
import utils from './utils';
import ComposedComponent from './ComposedComponent';


const styles = theme => ({
    addButton: {
      marginTop: theme.spacing.unit
    },
  });

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
        if (this.props.form.startEmpty !== true && this.state.model.length === 0) {
            this.onAppend();
        }
    }

    onAppend() {
        //console.log('onAppend is called this.state.model', this.state.model);
        var empty;
        if (this.props.form && this.props.form.schema && this.props.form.schema.items) {
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
                        utils.traverseSchema(items, function (prop, path) {
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
        console.log('onDelete is called', index);
        var newModel = this.state.model;
        newModel.splice(index, 1);
        this.setState(
            {
                model: newModel
            }
        );
        this.props.onChangeValidate(this.state.model);
    }

    setIndex(index) {
        return function (form) {
            if (form.key) {
                form.key[form.key.indexOf('')] = index;
            }
        };
    }

    copyWithIndex(form, index) {
        var copy = _.cloneDeep(form);
        copy.arrayIndex = index;
        utils.traverseForm(copy, this.setIndex(index));
        return copy;
    }

    makeUniqueListItemKey (index) {
        // not the best possible approach but allows to delete correct list items
        // when user added several items to the Array
        return index + Date.now()
    }

    render() {
        //console.log('Array.render', this.props.form.items, this.props.model, this.state.model);
        let {classes} = this.props;
        var arrays = [];
        var model = this.state.model;
        //console.log('fields', fields);
        for (var i = 0; i < model.length; i++) {
            let onItemDelete = this.onDelete.bind(this, i);
            let forms = this.props.form.items.map(function (form, index) {
                var copy = this.copyWithIndex(form, i);
                return this.props.builder(copy, this.props.model, index, this.props.onChange, this.props.mapper, this.props.builder);
            }.bind(this));
            //console.log('forms', i, forms);
            arrays.push(
                <div key={this.makeUniqueListItemKey(i)}>
                    <IconButton onClick={onItemDelete}>
                        <DeleteIcon />
                    </IconButton>
                    {forms}
                </div>
            );
        }
        return (
            <div>
                <div>
                    <label>{this.props.form.title}</label>
                    <div>
                        {arrays}
                    </div>
                </div>
                <Button className={classes.addButton} variant="contained" color="primary" onClick={this.onAppend}>
                    {this.props.form.add || 'Add'}
                </Button>
            </div>
        );
    }
}

export default ComposedComponent(withStyles(styles)(Array));
