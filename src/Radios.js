import React from 'react';
import utils from './utils';
import classNames from 'classnames';
import ValidationMixin from './ValidationMixin';

class Radios extends React.Component {

    render() {
        let formClasses = classNames('form-group', { 'has-error' : this.props.valid === false }, 'schema-form-radios', this.props.form.htmlClass);
        let labelClasses = classNames('control-label', this.props.form.labelHtmlClass);
        let fieldClasses = classNames(this.props.form.fieldHtmlClass);
        let help = this.props.form.description || '';
        if(!this.props.valid || this.props.form.description) {
            help = (
                <div className="help-block">
                    {this.props.error || this.props.form.description}
                </div>
            )
        }
        let items = this.props.form.titleMap.map(function(item) {
            return (
                <div key={item.name}>
                    <label>
                        <input type="radio"
                               name={item.name}
                               value={item.value}
                               className={fieldClasses}
                               onChange={this.props.onChangeValidate}
                               checked={this.props.value === item.value}
                               id={item.name}
                            />
                        <span>{item.name}</span>
                    </label>
                </div>
            )

        }.bind(this));

        return (
            <div className={formClasses}>
                <label className={labelClasses}>{this.props.form.title}</label>
                {items}
                {help}
            </div>
        );
    }
}

export default ValidationMixin(Radios);
