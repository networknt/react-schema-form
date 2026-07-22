import React, { useEffect, useId, useMemo, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import TextField from '@mui/material/TextField'
import utils from './utils'
import {
  applyStructuredDraft,
  createStructuredDraftState,
  editStructuredDraft,
  keepStructuredDraft,
  receiveExternalStructuredValue,
  reloadExternalStructuredValue,
  resetStructuredDraft,
  structuredDraftReducer,
} from './structuredDataState'

const formats = ['json', 'yaml']

function modelValue(form, model) {
  if (!model || !form.key) return undefined
  return utils.selectOrSet(form.key, model)
}

function configuredValue(form, model) {
  const value = modelValue(form, model)
  if (value !== undefined) return value
  if (form.default !== undefined) return form.default
  return form.schema?.default
}

function DefaultEditor({
  ariaDescribedBy,
  error,
  label,
  onChange,
  readOnly,
  rows,
  value,
}) {
  return (
    <TextField
      error={error}
      fullWidth
      label={label}
      multiline
      onChange={onChange}
      rows={rows}
      slotProps={{
        htmlInput: { 'aria-describedby': ariaDescribedBy },
        input: { readOnly },
      }}
      value={value}
    />
  )
}

function StructuredDataField(props) {
  const {
    EditorComponent,
    errorText,
    form,
    localization: { getLocalizedString },
    model,
    onChange,
    renderEditor,
    setDefault,
    showErrors,
  } = props
  const schema = form.schema
  const codecOptions = useMemo(
    () => ({ ...(form.codecOptions || {}), schema }),
    [form.codecOptions, schema],
  )
  const defaultFormat = formats.includes(form.defaultTab) ? form.defaultTab : 'json'
  const value = configuredValue(form, model)
  const [state, setState] = useState(() => createStructuredDraftState({
    activeFormat: defaultFormat,
    codecOptions,
    schema,
    value,
  }))
  const reactId = useId().replaceAll(':', '')
  const title = form.title && getLocalizedString(form.title)
  const readOnly = Boolean(form.readonly || form.readOnly || schema?.readonly || schema?.readOnly)
  const activeDirty = state.dirty[state.activeFormat]
  const hasDirtyDraft = Object.values(state.dirty).some(Boolean)
  const visibleError = state.error?.message || (showErrors ? errorText : null)
  const helperId = `${reactId}-structured-helper`
  const FieldEditor = EditorComponent || form.EditorComponent || DefaultEditor

  useEffect(() => {
    const currentModelValue = modelValue(form, model)
    if (currentModelValue === undefined
      && value !== undefined
      && state.phase === 'clean'
      && state.canonicalValue !== undefined) {
      setDefault?.(form.key, model, form, state.canonicalValue)
    }
  }, [form, model, setDefault, state.canonicalValue, state.phase, value])

  useEffect(() => {
    setState((current) => receiveExternalStructuredValue(current, value, {
      codecOptions,
      schema,
    }))
  }, [codecOptions, schema, value])

  const selectFormat = (_event, format) => {
    if (hasDirtyDraft || !formats.includes(format)) return
    setState((current) => structuredDraftReducer(current, {
      format,
      type: 'SET_ACTIVE_FORMAT',
    }))
  }

  const changeDraft = (change) => {
    if (readOnly) return
    const text = typeof change === 'string' ? change : change?.target?.value ?? ''
    setState((current) => editStructuredDraft(current, current.activeFormat, text))
  }

  const applyDraft = () => {
    const next = applyStructuredDraft(state, {
      codecOptions,
      schema,
      validate: (nextValue) => utils.validateBySchema({ ...schema }, nextValue),
    })
    setState(next)
    if (next.phase === 'applied') {
      onChange(form.key, next.canonicalValue, schema.type, form)
    } else if (form.onDraftError) {
      form.onDraftError(next.error, { form, format: state.activeFormat })
    }
  }

  const resetDraft = () => {
    setState((current) => resetStructuredDraft(current, { codecOptions, schema }))
  }

  const reloadExternal = () => {
    setState((current) => reloadExternalStructuredValue(current, { codecOptions, schema }))
  }

  const keepDraft = () => {
    setState((current) => keepStructuredDraft(current))
  }

  const editorProps = {
    ariaDescribedBy: helperId,
    error: Boolean(visibleError),
    format: state.activeFormat,
    label: `${title || 'Structured data'} ${state.activeFormat.toUpperCase()} editor`,
    onChange: changeDraft,
    readOnly,
    rows: form.editorRows || 12,
    value: state.drafts[state.activeFormat],
  }

  return (
    <FormControl
      component="fieldset"
      error={Boolean(visibleError)}
      fullWidth
      required={form.required}
      style={form.style}
      className={form.htmlClass}
      {...form.otherProps}
    >
      {title ? <FormLabel component="legend">{title}</FormLabel> : null}
      <Tabs
        aria-label={`${title || 'Structured data'} format`}
        onChange={selectFormat}
        selectionFollowsFocus
        value={state.activeFormat}
      >
        {formats.map((format) => (
          <Tab
            aria-controls={`${reactId}-${format}-panel`}
            disabled={hasDirtyDraft && state.activeFormat !== format}
            id={`${reactId}-${format}-tab`}
            key={format}
            label={`${format.toUpperCase()}${state.dirty[format] ? ' *' : ''}`}
            value={format}
          />
        ))}
      </Tabs>
      {formats.map((format) => (
        <Box
          aria-labelledby={`${reactId}-${format}-tab`}
          hidden={state.activeFormat !== format}
          id={`${reactId}-${format}-panel`}
          key={format}
          role="tabpanel"
          sx={{ pt: 2 }}
        >
          {state.activeFormat === format
            ? (renderEditor || form.renderEditor
                ? (renderEditor || form.renderEditor)(editorProps)
                : <FieldEditor {...editorProps} />)
            : null}
        </Box>
      ))}
      {state.hasPendingExternalValue ? (
        <Alert severity="warning" sx={{ mt: 1 }}>
          The source value changed while this draft was being edited.
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Button onClick={reloadExternal} size="small">Reload</Button>
            <Button onClick={keepDraft} size="small">Keep Draft</Button>
          </Box>
        </Alert>
      ) : null}
      {state.errorSource === 'external' ? (
        <Alert severity="error" sx={{ mt: 1 }}>
          The source value could not be loaded. The last valid draft was preserved.
        </Alert>
      ) : null}
      {!readOnly ? (
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <Button disabled={!activeDirty} onClick={applyDraft} variant="contained">
            Apply
          </Button>
          <Button disabled={!activeDirty && !state.error} onClick={resetDraft}>
            Reset
          </Button>
        </Box>
      ) : null}
      <FormHelperText id={helperId} role={visibleError ? 'alert' : undefined}>
        {visibleError || (form.description && getLocalizedString(form.description))}
      </FormHelperText>
    </FormControl>
  )
}

export default StructuredDataField
