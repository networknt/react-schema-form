/**
 * Created by steve on 15/09/15.
 */
'use strict';

var React = require('react');
var utils = require('./utils');

var Number = React.createClass({
    displayName: 'Number',

    render: function render() {

        return React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement(
                'label',
                { className: 'control-label' },
                this.props.form.title
            ),
            React.createElement('input', { type: this.props.form.type,
                onChange: this.props.onChange,
                step: this.props.form.step,
                className: 'form-control',
                id: this.props.form.key.slice(-1)[0],
                name: this.props.form.key.slice(-1)[0] })
        );
    }
});

module.exports = Number;