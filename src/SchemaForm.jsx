import React, { Component } from 'react'
import merge from 'lodash/merge'
import isNil from 'lodash/isNil'
import utils from './utils'
import Number from './Number'
import Text from './Text'
import TextArea from './TextArea'
import Markdown from './Markdown'
import TextSuggest from './TextSuggest'
import Select from './Select'
import MultiSelect from './MultiSelect'
import Radios from './Radios'
import DateComponent from './Date'
import Timestamp from './Timestamp'
import Checkbox from './Checkbox'
import Help from './Help'
import Array from './Array'
import FieldSet from './FieldSet'
import TripleBoolean from './TripleBoolean'
import Taxonomy from './Taxonomy'
import DynaSelect from './DynaSelect'

const formatDate = (date) => {
  let value =
    (date && typeof date === 'object' && date.toISOString().slice(0, 10)) ||
    date
  if (!value) value = ''
  if (value.length > 0) value = new Date(value).toISOString().slice(0, 10)
  return value
}

class SchemaForm extends Component {
  mapper = {
    number: Number,
    text: Text,
    password: Text,
    textarea: TextArea,
    markdown: Markdown,
    textsuggest: TextSuggest,
    select: Select,
    taxonomy: Taxonomy,
    radios: Radios,
    date: DateComponent,
    timestamp: Timestamp,
    checkbox: Checkbox,
    help: Help,
    array: Array,
    tBoolean: TripleBoolean,
    fieldset: FieldSet,
    tuple: FieldSet,
    multiselect: MultiSelect,
    dynaselect: DynaSelect
  }

  constructor(props) {
    super(props)
    this.builder = this.builder.bind(this)
  }

  // Assign default values and save it to the model
  setDefault = (key, model, form, value) => {
    const { onModelChange } = this.props
    const currentValue = utils.selectOrSet(key, model)

    // If current value is not setted and exist a default, apply the default over the model
    if (isNil(currentValue) && !isNil(value))
      onModelChange(key, value, form.type, form)
  }

  getLocalization = () => {
    const { localization } = this.props
    return {
      getLocalizedString:
        localization && localization.getLocalizedString
          ? localization.getLocalizedString
          : (value) => value,
      getLocalizedNumber:
        localization && localization.getLocalizedNumber
          ? localization.getLocalizedNumber
          : (value) => value,
      getLocalizedDate:
        localization && localization.getLocalizedDate
          ? localization.getLocalizedDate
          : formatDate
    }
  }

  builder(form, model, index, mapper, onChange, builder) {
    const { errors, showErrors, evalContext } = this.props
    const Field = this.mapper[form.type]
    if (!Field) {
      return null
    }

    // Apply conditionals to review if this field must be rendered
    if (
      form.condition &&
      !utils.safeEval(form.condition, { model, form, ...evalContext })
    ) {
      return null
    }

    const key = (form.key && form.key.join('.')) || index

    const error = errors && key in errors ? errors[key] : null

    return (
      <Field
        model={model}
        form={form}
        key={key}
        onChange={onChange}
        setDefault={this.setDefault}
        mapper={mapper}
        builder={builder}
        errorText={error}
        localization={this.getLocalization()}
        showErrors={showErrors}
      />
    )
  }

  render() {
    const {
      schema,
      form,
      ignore,
      option,
      model,
      className,
      onModelChange,
      mapper
    } = this.props
    const merged = utils.merge(schema, form, ignore, option)

    let mergedMapper = this.mapper
    if (mapper) {
      mergedMapper = merge(this.mapper, mapper)
    }
    const forms = merged.map((formPart, index) =>
      this.builder(
        formPart,
        model,
        index,
        mergedMapper,
        onModelChange,
        this.builder
      )
    )

    return <div className={className}>{forms}</div>
  }
}

SchemaForm.defaultProps = {
  localization: undefined,
  showErrors: false
}

export default SchemaForm
