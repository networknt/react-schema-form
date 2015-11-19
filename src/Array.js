/**
 * Created by steve on 14/09/15.
 */
var React = require('react');
var classNames = require('classnames');
var utils = require('./utils');
var _ = require('lodash');

var formDefCache = {};
var list = [];
var subForm;

var Array = React.createClass({

    setIndex: function(index) {
        return function(form) {
            //console.log('form', form);
            if (form.key) {
                form.key[form.key.indexOf('')] = index;
            }
        };
    },

    getSubForm: function() {
        var subForm = this.props.form.items[0];
        if(this.props.form.items.length > 1) {
            subForm = {
                type: 'section',
                items: this.props.form.items.map(function(item) {
                    return item;
                })
            }
        }
        return subForm;
    },

    copyWithIndex: function(index) {
        if (!formDefCache[index]) {
            if (this.getSubForm()) {
                var copy = _.cloneDeep(subForm);
                copy.arrayIndex = index;
                utils.traverseForm(copy, this.setIndex(index));
                formDefCache[index] = copy;
            }
        }
        return formDefCache[index];
    },

    appendToArray: function() {
        var len = list.length;
        //console.log('before copywithindex this.props.form.items', this.props.form.items);
        var copy = this.copyWithIndex(len);
        utils.traverseForm(copy, function(part) {

            if (part.key) {
                var def;
                if (part['default']) {
                    def = part['default'];
                }
                if (part.schema &&
                    part.schema['default']) {
                    def = part.schema['default'];
                }

                if (def) {
                    utils.selectOrSet(part.key, this.props.model, def);
                }
            }
        }.bind(this));

        // If there are no defaults nothing is added so we need to initialize
        // the array. undefined for basic values, {} or [] for the others.
        if (len === list.length) {
            var type = utils.selectOrSet('schema.items.type', this.props.form);
            var dflt;
            if (type === 'object') {
                dflt = {};
            } else if (type === 'array') {
                dflt = [];
            }
            //console.log('list = ', list);
            list.push(dflt);
        }
        return list;
    },

    deleteFromArray: function(index) {
        list.splice(index, 1);

        // Trigger validation.
        if (scope.validateArray) {
            scope.validateArray();
        }
        return list;
    },

    componentWillMount: function () {
        //console.log('this.props.form.items', this.props.form.items);
        if (this.props.form.items) {

            // To be more compatible with JSON Form we support an array of items
            // in the form definition of "array" (the schema just a value).
            // for the subforms code to work this means we wrap everything in a
            // section. Unless there is just one.
            subForm = this.props.form.items[0];
            if (this.props.form.items.length > 1) {
                subForm = {
                    type: 'section',
                    items: this.props.form.items.map(function(item) {
                        return item;
                    })
                };
            }

        }

        list = utils.selectOrSet(this.props.form.key, this.props.model);
        //console.log('componentWillMount list ', list);
        if(!list) {
            list = [];
        }
        //console.log('componentWillMount list =', list);
        if(list.length === 0) {
            //console.log('before appendToArray this.props.form.items', this.props.form.items);
            this.appendToArray();
        }

    },

    handleAdd: function() {
        //console.log('handleAdd is called');
        this.appendToArray();
    },

    render: function() {
        let arrayClasses = classNames('schema-form-array', this.props.form.htmlClass);
        let listClasses = classNames('list-group-item', this.props.form.fieldHtmlClass);
        //console.log('array classes', arrayClasses);
        //console.log('array = ', this.props.form.items);
        //console.log('render list = ', list);
        return (
            React.createElement("div", {className: {arrayClasses}},
                React.createElement("h3", null, this.props.form.title),
                list.map(function(listItem, listIndex) {
                    //console.log('listItem = ', listItem);
                    React.createElement("ol", {className: "list-group"},
                        React.createElement("li", {className: {listClasses}},
                            listItem.map(function(item, index){
                                React.createElement("button", {type: "button", className: "close pull-right"},
                                    React.createElement("span", {"aria-hidden": "true"}, "×"), React.createElement("span", {className: "sr-only"}, "Close")
                                );
                                return MuiSchemaForm.renderSchema(item, this.props.model, index, this.props.onChange);
                            }.bind(this))
                        )

                    )
                }.bind(this)),
                React.createElement("div", {className: "clearfix"},
                    React.createElement("button", {type: "button",
                            className: "btn btn-default pull-right", onClick: this.handleAdd},
                        React.createElement("i", {className: "glyphicon glyphicon-plus"}),
                        "Add"
                    )
                )
            )
        )
    }
});

module.exports = Array;
