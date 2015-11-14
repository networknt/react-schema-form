/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
var utils = require('./utils');
var classNames = require('classnames');
import {ValidationMixin} from './ValidationMixin';

class TextArea extends React.Component {

    render() {
        let formClasses = classNames('form-group', 'schema-form-textarea', { 'has-error' : this.props.valid === false }, this.props.form.htmlClass, { 'has-success' : this.props.valid === true && this.props.value != null});
        let labelClasses = classNames('control-label', this.props.form.labelHtmlClass);
        let fieldClasses = classNames('form-control', this.props.form.fieldHtmlClass);
        let help = this.props.form.description || '';
        if(!this.props.valid || this.props.form.description) {
            help = (
                <div className="help-block">
                    {this.props.error || this.props.form.description}
                </div>
            )
        }

        return (
            <div className={formClasses}>
                <label className={labelClasses}>{this.props.form.title}</label>
                <textarea className={fieldClasses}
                    id={this.props.form.key.slice(-1)[0]}
                    onChange={this.props.onChangeValidate}
                    defaultValue={this.props.value}
                    placeholder={this.props.form.placeholder}
                    name={this.props.form.key.slice(-1)[0]}>
                </textarea>
                {help}
            </div>
        );
    }
}

export default ValidationMixin(TextArea);
