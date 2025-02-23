import React from 'react'
import utils from './utils'

const defaultValue = (props) => {
  // check if there is a value in the model, if there is, display it. Otherwise, check if
  // there is a default value, display it.
  let value
  if (props.form && props.form.key)
    value = utils.selectOrSet(props.form.key, props.model)

  // check if there is a default value
  if (value === null || value === undefined) {
    if (props.form.default) {
      value = props.form.default
    } else if (props.form.schema && props.form.schema.default) {
      value = props.form.schema.default
    }
  }
  return value
}


const getDisplayName = (WrappedComponent) =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component'

export default (ComposedComponent, defaultProps = {}) =>
  (class Composed extends React.Component {
    constructor(props) {
      super(props)
      this.displayName = `ComposedComponent(${getDisplayName(
        ComposedComponent
      )})`
      this.onChangeValidate = this.onChangeValidate.bind(this)
      this.state = this.constructor.getDerivedStateFromProps(this.props)
    }

    static getDerivedStateFromProps(nextProps) {
      const { errorText, form, showErrors, localization } = nextProps
      const getLocalizedString = localization && localization.getLocalizedString
      const value = defaultValue(nextProps)
      if (!showErrors) {
        return {
          value,
          valid: true,
          error: ''
        }
      }

      const validationResult = utils.validate(
        form,
        value || undefined
      )
      const error = !validationResult.valid ? validationResult.error : undefined
      console.log("error", error);
      return {
        value,
        valid: validationResult.valid,
        error: (!validationResult.valid ? error : null) || errorText
      }
    }

    /**
     * Called when <input> value changes.
     * @param e The input element, or something.
     */
    onChangeValidate(e, v) {
            const { form, onChange, localization } = this.props; // eslint-disable-line
      const getLocalizedString = localization && localization.getLocalizedString
      let value = null
      // use the schema type so that we can have a limited number of types to handle. This
      // gives us the flexibility to create add-ons without touching the code of main project.
      // console.log(form.schema.type, form.type);
      const type = form.schema ? form.schema.type : form.type
      switch (type) {
        case 'integer':
        case 'number': {
          value = e
          break
        }
        case 'boolean':
          value = e.target.checked
          break
        case 'array':
          value = e
          break
        case 'object':
          if (form.type === 'date') {
            if (e.target.value.length > 0) {
              value = new Date(e.target.value)
            } else {
              value = ''
            }
            break
          }
          ;({ value } = e.target)
          break
        case 'string':
          if(form.type === 'timestamp') {
            value = e;
          } else {
            ;({ value } = e.target)  
          }
          break;  
        default:
          // nothing should goes here. 
          console.log("type = ", type);
          ;({ value } = e.target)
      }

      const validationResult = utils.validate(form, value)
      console.log(form, value);
      console.log("error", validationResult.valid ? null : validationResult.error);
      this.setState({
        value,
        valid: validationResult.valid,
        error: validationResult.valid ? null : validationResult.error
      })

      onChange(form.key, value)
    }

    render() {
      return (
        <ComposedComponent
          {...defaultProps}
          {...this.props}
          {...this.state}
          onChangeValidate={this.onChangeValidate}
        />
      )
    }
  })
