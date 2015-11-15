/**
 * Created by steve on 01/11/15.
 */
import React from 'react';
import utils from './utils';
import classNames from 'classnames';
import ValidationMixin from './ValidationMixin';

class Select extends React.Component {

    render() {
        let formClasses = classNames('form-group', 'schema-form-select', this.props.form.htmlClass, { 'has-error' : this.props.valid === false }, this.props.form.htmlClass, { 'has-success' : this.props.valid === true && this.props.value != null});
        let labelClasses = classNames('control-label', this.props.form.labelHtmlClass);
        let fieldClasses = classNames('form-control', this.props.form.fieldHtmlClass);

        return (
            <div className={formClasses}>
                <label className={labelClasses}>{this.props.form.title}</label>
                <select className={fieldClasses}
                        value={this.props.value}
                        onChange={this.props.onChangeValidate}
                        id={this.props.form.key.slice(-1)[0]}
                        name={this.props.form.key.slice(-1)[0]}>
                    {this.props.form.titleMap.map(function(item) {
                        return <option key={item.value} value={item.value}>{item.name}</option>
                    }.bind(this))}
                </select>
            </div>
        );
    }
}

export default ValidationMixin(Select);
