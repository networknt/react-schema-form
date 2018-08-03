import React from 'react';
import ComposedComponent from './ComposedComponent';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

class Radios extends React.Component {

    render() {
        let items = this.props.form.titleMap.map(function(item, index) {
            return (
                <Radio label={item.name}
                       value={item.value}
                       key={index}
                       disabled={this.props.form.readonly}
                    />
            )
        }.bind(this));

        return (
            <span className={this.props.form.htmlClass}>
              <label className="control-lable">{this.props.form.title}</label>
              <RadioGroup defaultSelected={this.props.value} name={this.props.form.title} onChange={this.props.onChangeValidate}>
                  {items}
              </RadioGroup>
            </span>
        );
    }
}

export default ComposedComponent(Radios);
