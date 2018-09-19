import React from 'react'
import utils from './utils'
import ComposedComponent from './ComposedComponent'
import RaisedButton from 'material-ui/RaisedButton'
import _ from 'lodash'
import IconButton from 'material-ui/IconButton'

class Array extends React.Component {
  constructor(props) {
    super(props)
    // we have the model here for the entire form, get the model for this array only
    // and add to the state. if is empty, add an entry by calling onAppend directly.
    this.state = {
      model: utils.selectOrSet(this.props.form.key, this.props.model) || []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.model && nextProps.form && nextProps.form.key) {
      this.setState({
        model: utils.selectOrSet(nextProps.form.key, nextProps.model) || []
      })
    }
  }

  componentDidMount() {
    // Always start with one empty form unless configured otherwise.
    if (this.props.form.startEmpty !== true && this.state.model.length === 0) {
      this.onAppend()
    }
  }

  onAppend = () => {
    let empty
    if (this.props.form && this.props.form.schema && this.props.form.schema.items) {
      let items = this.props.form.schema.items
      if (items.type && items.type.indexOf('object') !== -1) {
        empty = {}

        // Check for possible defaults
        if (!this.props.options || this.props.options.setSchemaDefaults !== false) {
          empty = typeof items['default'] !== 'undefined' ? items['default'] : empty

          // Check for defaults further down in the schema.
          // If the default instance sets the new array item to something falsy, i.e. null
          // then there is no need to go further down.
          if (empty) {
            utils.traverseSchema(items, function (prop, path) {
              if (typeof prop['default'] !== 'undefined') {
                utils.selectOrSet(path, empty, prop['default'])
              }
            })
          }
        }

      } else if (items.type && items.type.indexOf('array') !== -1) {
        empty = []
        if (!this.props.options || this.props.options.setSchemaDefaults !== false) {
          empty = items['default'] || empty
        }
      } else {
        // No type? could still have defaults.
        if (!this.props.options || this.props.options.setSchemaDefaults !== false) {
          empty = items['default'] || empty
        }
      }
    }
    let newModel = this.state.model
    newModel.push(empty)
    this.setState({
        model: newModel
      }
    )
    this.props.onChangeValidate(this.state.model)
  }

  onDelete = index => () => {
    let newModel = this.state.model
    newModel.splice(index, 1)
    this.setState({model: newModel})
    this.props.onChangeValidate(this.state.model)
  }

  setIndex = index => form => {
    if (form.key) {
      form.key[form.key.indexOf('')] = index
    }
  }

  copyWithIndex = (form, index) => {
    let copy = _.cloneDeep(form)
    copy.arrayIndex = index
    utils.traverseForm(copy, this.setIndex(index))
    return copy
  }

  render() {
    let arrays = []
    let model = this.state.model
    for (let i = 0; i < model.length; i++) {
      let forms = this.props.form.items.map((form, index) =>
        this.props.builder(this.copyWithIndex(form, i), this.props.model, index, this.props.mapper, this.props.onChange, this.props.builder)
      )
      arrays.push(
        <li key={`react-schema-form-array-${this.props.form.title}-${i}`} className="list-group-item">
          <IconButton iconClassName="material-icons" tooltip="Remove" onClick={this.onDelete(i)}>clear</IconButton>
          {forms}
        </li>
      )
    }
    return (
      <div>
        <div>
          <label>{this.props.form.title}</label>
          <ol className="list-group">{arrays}</ol>
        </div>
        <RaisedButton label={this.props.form.add || 'Add'} secondary onClick={this.onAppend}/>
      </div>
    )
  }
}

export default ComposedComponent(Array)
