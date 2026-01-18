import { useState, useEffect } from 'react'
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

const getValidationState = (props) => {
    const { errorText, form, showErrors } = props
    const value = defaultValue(props)
    if (!showErrors) {
        return {
            value,
            valid: true,
            error: ''
        }
    }

    const validationResult = utils.validate(form, value || undefined)
    const error = !validationResult.valid ? validationResult.error : undefined
    return {
        value,
        valid: validationResult.valid,
        error: (!validationResult.valid ? error : null) || errorText
    }
}

/**
 * A hook that provides the logic for form fields.
 * It manages the field value, validation state, and provide an onChange handler.
 * 
 * @param {Object} props Component props 
 * @returns {Object} { value, valid, error, onChangeValidate }
 */
export default function useSchemaField(props) {
    const { form, onChange } = props
    const [state, setState] = useState(() => getValidationState(props))

    // Update state when props change (equivalent to getDerivedStateFromProps)
    useEffect(() => {
        setState(getValidationState(props))
    }, [props.model, props.form, props.showErrors, props.errorText])

    const onChangeValidate = (e, v) => {
        let value = null
        const type = form.schema ? form.schema.type : form.type
        if (v !== undefined) {
            value = v
        } else {
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
                    ; ({ value } = e.target)
                    break
                case 'string':
                    if (form.type === 'timestamp') {
                        value = e
                    } else {
                        ; ({ value } = e.target)
                    }
                    break
                default:
                    // nothing should goes here.
                    console.log('type = ', type)
                    if (e && e.target) {
                        ; ({ value } = e.target)
                    } else {
                        value = e
                    }
            }
        }

        const validationResult = utils.validate(form, value)
        setState({
            value,
            valid: validationResult.valid,
            error: validationResult.valid ? null : validationResult.error
        })

        onChange(form.key, value)
    }

    return {
        ...state,
        onChangeValidate
    }
}
