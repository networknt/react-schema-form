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
import StructuredFormView from './StructuredFormView'
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

const textFormats = ['json', 'yaml']
const defaultTabs = ['form', ...textFormats]

function uniqueTabs(tabs) {
  const requested = Array.isArray(tabs) ? tabs : defaultTabs
  const supported = requested.filter((tab) => defaultTabs.includes(tab))
  return [...new Set(supported.length > 0 ? supported : defaultTabs)]
}

function generatedFormAvailable(form) {
  const { schema } = form
  if (schema.items?.enum) return Array.isArray(form.titleMap) && form.titleMap.length > 0
  if (schema.type === 'array' || schema.type?.includes?.('array')) {
    return Array.isArray(form.items) && form.items.length > 0
  }
  return Array.isArray(form.items) && form.items.length > 0
}

function resolvedValueType(value) {
  if (value === null) return 'null'
  return Array.isArray(value) ? 'array' : 'object'
}

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
  const requestedTabs = uniqueTabs(form.tabs)
  const value = configuredValue(form, model)
  const initialFormAvailable = generatedFormAvailable(form)
    && value !== undefined
    && value !== null
  let initialEnabledTabs = requestedTabs.filter((tab) => tab !== 'form' || initialFormAvailable)
  if (initialEnabledTabs.length === 0) initialEnabledTabs = textFormats
  const initialTab = initialEnabledTabs.includes(form.defaultTab)
    ? form.defaultTab
    : initialEnabledTabs[0]
  const defaultFormat = textFormats.includes(initialTab)
    ? initialTab
    : requestedTabs.find((tab) => textFormats.includes(tab)) || 'json'
  const [state, setState] = useState(() => createStructuredDraftState({
    activeFormat: defaultFormat,
    codecOptions,
    schema,
    value,
  }))
  const [activeTab, setActiveTab] = useState(initialTab)
  const reactId = useId().replaceAll(':', '')
  const title = form.title && getLocalizedString(form.title)
  const readOnly = Boolean(form.readonly || form.readOnly || schema?.readonly || schema?.readOnly)
  const formAvailable = generatedFormAvailable(form)
    && state.canonicalValue !== undefined
    && state.canonicalValue !== null
  let enabledTabs = requestedTabs.filter((tab) => tab !== 'form' || formAvailable)
  let displayedTabs = requestedTabs
  if (enabledTabs.length === 0) {
    displayedTabs = [...new Set([...requestedTabs, ...textFormats])]
    enabledTabs = textFormats
  }
  const activeDirty = textFormats.includes(activeTab) && state.dirty[activeTab]
  const hasDirtyDraft = Object.values(state.dirty).some(Boolean)
  const visibleError = state.error?.message || (showErrors ? errorText : null)
  const helperId = `${reactId}-structured-helper`
  const FieldEditor = EditorComponent || form.EditorComponent || DefaultEditor

  useEffect(() => {
    if (!enabledTabs.includes(activeTab)) setActiveTab(enabledTabs[0])
  }, [activeTab, enabledTabs])

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

  const selectTab = (_event, tab) => {
    if (hasDirtyDraft || !enabledTabs.includes(tab)) return
    if (textFormats.includes(tab)) {
      setState((current) => structuredDraftReducer(current, {
        format: tab,
        type: 'SET_ACTIVE_FORMAT',
      }))
    }
    setActiveTab(tab)
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
      onChange(
        form.key,
        next.canonicalValue,
        resolvedValueType(next.canonicalValue),
        form,
      )
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
        onChange={selectTab}
        selectionFollowsFocus
        value={activeTab}
      >
        {displayedTabs.map((tab) => (
          <Tab
            aria-controls={`${reactId}-${tab}-panel`}
            disabled={(tab === 'form' && !formAvailable)
              || (hasDirtyDraft && activeTab !== tab)}
            id={`${reactId}-${tab}-tab`}
            key={tab}
            label={`${tab === 'form' ? 'Form' : tab.toUpperCase()}${state.dirty[tab] ? ' *' : ''}`}
            value={tab}
          />
        ))}
      </Tabs>
      {displayedTabs.map((tab) => (
        <Box
          aria-labelledby={`${reactId}-${tab}-tab`}
          hidden={activeTab !== tab}
          id={`${reactId}-${tab}-panel`}
          key={tab}
          role="tabpanel"
          sx={{ pt: 2 }}
        >
          {activeTab === tab && tab === 'form' && formAvailable
            ? <StructuredFormView {...props} form={form} />
            : null}
          {activeTab === tab && textFormats.includes(tab)
            ? (renderEditor || form.renderEditor
                ? (renderEditor || form.renderEditor)(editorProps)
                : <FieldEditor {...editorProps} />)
            : null}
        </Box>
      ))}
      {requestedTabs.includes('form') && !formAvailable ? (
        <Alert severity="info" sx={{ mt: 1 }}>
          Form view is unavailable until this schema provides generated controls and the value
          is an object or array. Use JSON or YAML to edit or initialize it.
        </Alert>
      ) : null}
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
      {!readOnly && textFormats.includes(activeTab) ? (
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
