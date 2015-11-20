/**
 * Created by steve on 01/11/15.
 */
import React from 'react';
import utils from './utils';
import classNames from 'classnames';
import ValidationMixin from './ValidationMixin';
var ReactSelect = require('react-select');

class Select extends React.Component {

    constructor(props) {
        super(props);
        this.onSelectChange = this.onSelectChange.bind(this);
        console.log("titleMap", this.props.form.titleMap);
    }

    onSelectChange(e) {
        this.props.onChangeValidate({target: {value: e}});
    }

    render() {
        let formClasses = classNames('form-group', 'schema-form-select', this.props.form.htmlClass, { 'has-error' : this.props.valid === false }, this.props.form.htmlClass, { 'has-success' : this.props.valid === true && this.props.value != null});
        let labelClasses = classNames('control-label', this.props.form.labelHtmlClass);
        let fieldClasses = classNames('form-control', this.props.form.fieldHtmlClass);

        return (
            <div style={{display: 'block', position: 'relative', marginBottom: '20px'}}>
                <label className={labelClasses}>{this.props.form.title}</label>
                <ReactSelect
                        value={this.props.value}
                        onChange={this.onSelectChange}
                        id={this.props.form.key.slice(-1)[0]}
                        name={this.props.form.key.slice(-1)[0]}
                        options={this.props.form.titleMap}
                        labelKey="name"
                        valueKey="value"/>
            </div>
        );
    }
}

export default ValidationMixin(Select);
