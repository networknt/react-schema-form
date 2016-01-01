import React from 'react';
import utils from './utils';
import classNames from 'classnames';
import ValidationMixin from './ValidationMixin';

const RadioButton = require('material-ui/lib/radio-button');
const RadioButtonGroup = require('material-ui/lib/radio-button-group');

class Radios extends React.Component {

    render() {
        let items = this.props.form.titleMap.map(function(item) {
            return (
                <RadioButton label={item.name}
                             value={item.value}
                             disabled={this.props.form.readonly}
                    />
            )
        }.bind(this));

        return (
            <RadioButtonGroup defaultSelected={this.props.value} name={this.props.form.title} onChange={this.props.onChangeValidate}>
                {items}
            </RadioButtonGroup>
        );
    }
}

export default ValidationMixin(Radios);
