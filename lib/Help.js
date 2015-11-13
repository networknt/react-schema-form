/**
 * Created by steve on 20/09/15.
 */
'use strict';

var React = require('react');
var classNames = require('classnames');

var Help = React.createClass({
    displayName: 'Help',

    render: function render() {
        var classes = classNames('helpvalue', 'schema-form-helpvalue', this.props.form.htmlClass);
        //console.log('help classes', classes);
        return React.createElement('div', { className: classes, dangerouslySetInnerHTML: { __html: this.props.form.helpvalue } });
    }
});

module.exports = Help;