/**
 * Created by steve on 14/09/15.
 */
'use strict';

var React = require('react');
var utils = require('./utils');
var _ = require('lodash');

var formDefCache = {};
var model = {};

var Array = React.createClass({
    displayName: 'Array',

    setIndex: function setIndex(index) {
        return function () {
            if (this.props.schema.key) {
                this.props.schema.key[this.props.schema.key.indexOf('')] = index;
            }
        };
    },

    getSubForm: function getSubForm() {
        var subForm = this.props.schema.items[0];
        if (this.props.schema.items.length > 1) {
            subForm = {
                type: 'section',
                items: this.props.schema.items.map(function (item) {
                    return item;
                })
            };
        }
        return subForm;
    },

    copyWithIndex: function copyWithIndex(index) {
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

    appendToArray: function appendToArray() {
        var len = list.length;
        var copy = scope.copyWithIndex(len);
        schemaForm.traverseForm(copy, function (part) {

            if (part.key) {
                var def;
                if (angular.isDefined(part['default'])) {
                    def = part['default'];
                }
                if (angular.isDefined(part.schema) && angular.isDefined(part.schema['default'])) {
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

    render: function render() {
        var field;

        return React.createElement(
            'div',
            null,
            field
        );
    }
});

module.exports = Array;