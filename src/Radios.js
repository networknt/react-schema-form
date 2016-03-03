import React from 'react';
import utils from './utils';
import classNames from 'classnames';
import ComposedComponent from './ComposedComponent';

const RadioButton = require('material-ui/lib/radio-button');
const RadioButtonGroup = require('material-ui/lib/radio-button-group');

class Radios extends React.Component {

    render() {
        let items = this.props.form.titleMap.map(function(item, index) {
            return (
                <RadioButton label={item.name}
                             value={item.value}
                             key={index}
                             disabled={this.props.form.readonly}
                    />
            )
        }.bind(this));

        return (
            <span>
              <label className="control-lable">{this.props.form.title}</label>
              <RadioButtonGroup defaultSelected={this.props.value} name={this.props.form.title} onChange={this.props.onChangeValidate}>
                  {items}
              </RadioButtonGroup>
            </span>
        );
    }
}

export default ComposedComponent(Radios);
