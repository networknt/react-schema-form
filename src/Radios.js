import React from 'react'
import ComposedComponent from './ComposedComponent'
import RadioButton from 'material-ui/RadioButton'
import RadioButtonGroup from 'material-ui/RadioButton/RadioButtonGroup'

class Radios extends React.Component {

  render() {
    let items = this.props.form.titleMap.map(({name, value}, i) =>
      <RadioButton label={name}
                   value={value}
                   key={`react-schema-form-radio-${this.props.form.title}-${i}`}
                   disabled={this.props.form.readonly}/>
    )

    return (
      <span className={this.props.form.htmlClass}>
              <label>{this.props.form.title}</label>
              <RadioButtonGroup defaultSelected={this.props.value}
                                name={this.props.form.title}
                                onChange={this.props.onChangeValidate}>
                  {items}
              </RadioButtonGroup>
            </span>
    )
  }
}

export default ComposedComponent(Radios)
