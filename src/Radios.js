import React from 'react';
import utils from './utils';
import classNames from 'classnames';
import ComposedComponent from './ComposedComponent';

import {Radio, 
        RadioGroup,
        FormControlLabel } from '@material-ui/core';

class Radios extends React.Component {

    render() {
        //console.log("VALUE", this.state.value);
        let items = this.props.form.titleMap.map(function(item, index) {
            return (
                <FormControlLabel
                    label={item.name}
                    value={item.value}
                    disabled={this.props.form.readonly}
                    control={<Radio
                        checked={this.props.value === item.value} />}
                    />
            )
        }.bind(this));

        return (
            <span className={this.props.form.htmlClass}>
              <label className="control-lable">{this.props.form.title}</label>
              <RadioGroup name={this.props.form.title} onChange={(e) => this.props.onChangeValidate(e)}>
                  {items}
              </RadioGroup>
            </span>
        );
    }
}

export default ComposedComponent(Radios);
