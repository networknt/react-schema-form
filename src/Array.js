/**
 * Created by steve on 14/09/15.
 */
var React = require('react');
var classNames = require('classnames');
var utils = require('./utils');
var _ = require('lodash');

var formDefCache = {};

var Array = React.createClass({

    setIndex: function(index) {
        return function() {
            if (this.props.form.key) {
                this.props.form.key[this.props.form.key.indexOf('')] = index;
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
                utils.traverseForm(copy, setIndex(index));
                formDefCache[index] = copy;
            }
        }
        return formDefCache[index];
    },

    appendToArray: function() {
        var len = list.length;
        var copy = scope.copyWithIndex(len);
        schemaForm.traverseForm(copy, function(part) {

            if (part.key) {
                var def;
                if (angular.isDefined(part['default'])) {
                    def = part['default'];
                }
                if (angular.isDefined(part.schema) &&
                    angular.isDefined(part.schema['default'])) {
                    def = part.schema['default'];
                }

                if (angular.isDefined(def)) {
                    sfSelect(part.key, scope.model, def);
                }
            }
        });

        // If there are no defaults nothing is added so we need to initialize
        // the array. undefined for basic values, {} or [] for the others.
        if (len === list.length) {
            var type = sfSelect('schema.items.type', form);
            var dflt;
            if (type === 'object') {
                dflt = {};
            } else if (type === 'array') {
                dflt = [];
            }
            list.push(dflt);
        }

        // Trigger validation.
        if (scope.validateArray) {
            scope.validateArray();
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

    render: function() {
        let arrayClasses = classNames('schema-form-array', this.props.form.htmlClass);
        let listClasses = classNames('list-group-item', this.props.form.fieldHtmlClass);
        console.log('array classes', arrayClasses);
        console.log('array = ', this.props.form.items);
        return (
            React.createElement("div", {className: {arrayClasses}},
                React.createElement("h3", null, this.props.form.title),
                React.createElement("ol", {className: "list-group"},
                    React.createElement("li", {className: {listClasses}},
                        this.props.form.items.map(function(item, index){
                            React.createElement("button", {type: "button", className: "close pull-right"},
                                React.createElement("span", {"aria-hidden": "true"}, "×"), React.createElement("span", {className: "sr-only"}, "Close")
                            )
                            return this.props.renderSchema(item, this.props.model, index, this.props.onChange);
                        }.bind(this))
                    )
                ),
                React.createElement("div", {className: "clearfix"},
                    React.createElement("button", {type: "button",
                            className: "btn btn-default pull-right"},
                        React.createElement("i", {className: "glyphicon glyphicon-plus"}),
                        "Add"
                    )
                )
            )
        )
    }
});

module.exports = Array;
