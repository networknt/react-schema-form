import React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import SchemaForm from './SchemaForm'
import StructuredDataField from './StructuredDataField'
import {
  StructuredDataField as ExportedStructuredDataField,
  parseStructuredText,
} from './index'

const objectSchema = {
  type: 'object',
  properties: {
    settings: {
      description: 'Provider settings',
      title: 'Settings',
      type: 'object',
      properties: {
        enabled: { type: 'boolean' },
        retries: { minimum: 1, type: 'integer' },
      },
      required: ['enabled'],
    },
  },
}

const structuredForm = [{ key: 'settings', tabs: ['json', 'yaml'], type: 'structured' }]

function renderStructured({
  form = structuredForm,
  mapper,
  model = { settings: { enabled: true, retries: 2 } },
  onModelChange = vi.fn(),
} = {}) {
  const view = render(
    <SchemaForm
      form={form}
      mapper={mapper}
      model={model}
      onModelChange={onModelChange}
      schema={objectSchema}
    />,
  )
  return { ...view, onModelChange }
}

describe('StructuredDataField', () => {
  it('renders accessible JSON and YAML tabs with a controlled JSON editor', () => {
    renderStructured()

    expect(screen.getByRole('tablist', { name: 'Settings format' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'JSON' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'YAML' })).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByRole('textbox', { name: 'Settings JSON editor' }).value)
      .toContain('"enabled": true')
    expect(screen.getByText('Provider settings')).toBeInTheDocument()
  })

  it('applies JSON as typed data and never commits editor text', async () => {
    const user = userEvent.setup()
    const { onModelChange } = renderStructured()
    const editor = screen.getByRole('textbox', { name: 'Settings JSON editor' })

    fireEvent.change(editor, { target: { value: '{"enabled":false,"retries":4}' } })
    expect(screen.getByRole('tab', { name: 'JSON *' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'YAML' })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'Apply' }))

    expect(onModelChange).toHaveBeenCalledTimes(1)
    expect(onModelChange).toHaveBeenCalledWith(
      ['settings'],
      { enabled: false, retries: 4 },
      'object',
      expect.objectContaining({ type: 'structured' }),
    )
    expect(typeof onModelChange.mock.calls[0][1]).toBe('object')
    expect(screen.getByRole('tab', { name: 'YAML' })).not.toBeDisabled()
  })

  it('applies YAML and regenerates semantically equivalent JSON', async () => {
    const user = userEvent.setup()
    const { onModelChange } = renderStructured()

    await user.click(screen.getByRole('tab', { name: 'YAML' }))
    const yamlEditor = screen.getByRole('textbox', { name: 'Settings YAML editor' })
    fireEvent.change(yamlEditor, {
      target: { value: 'enabled: false\nretries: 5\n' },
    })
    await user.click(screen.getByRole('button', { name: 'Apply' }))
    await user.click(screen.getByRole('tab', { name: 'JSON' }))

    expect(onModelChange).toHaveBeenCalledWith(
      ['settings'],
      { enabled: false, retries: 5 },
      'object',
      expect.any(Object),
    )
    expect(JSON.parse(screen.getByRole('textbox', { name: 'Settings JSON editor' }).value))
      .toEqual({ enabled: false, retries: 5 })
  })

  it('commits array roots as arrays', async () => {
    const user = userEvent.setup()
    const onModelChange = vi.fn()
    render(
      <SchemaForm
        form={[{ key: 'operations', tabs: ['json', 'yaml'], type: 'structured' }]}
        model={{ operations: ['chat'] }}
        onModelChange={onModelChange}
        schema={{
          properties: {
            operations: {
              items: { type: 'string' },
              title: 'Operations',
              type: 'array',
            },
          },
          type: 'object',
        }}
      />,
    )

    fireEvent.change(screen.getByRole('textbox', { name: 'Operations JSON editor' }), {
      target: { value: '["chat","embeddings"]' },
    })
    await user.click(screen.getByRole('button', { name: 'Apply' }))

    expect(onModelChange).toHaveBeenCalledWith(
      ['operations'],
      ['chat', 'embeddings'],
      'array',
      expect.any(Object),
    )
    expect(Array.isArray(onModelChange.mock.calls[0][1])).toBe(true)
  })

  it('initializes an undefined optional value only through an explicit apply', async () => {
    const user = userEvent.setup()
    const { onModelChange } = renderStructured({ model: {} })
    const editor = screen.getByRole('textbox', { name: 'Settings JSON editor' })

    expect(editor).toHaveValue('')
    expect(onModelChange).not.toHaveBeenCalled()
    fireEvent.change(editor, { target: { value: '{"enabled":true}' } })
    await user.click(screen.getByRole('button', { name: 'Apply' }))

    expect(onModelChange).toHaveBeenCalledTimes(1)
    expect(onModelChange.mock.calls[0][1]).toEqual({ enabled: true })
  })

  it.each([
    [['object', 'null'], {}, '{"value":1}', { value: 1 }, 'object'],
    [['array', 'null'], [], '["value"]', ['value'], 'array'],
    [['object', 'null'], {}, 'null', null, 'null'],
  ])('reports the resolved committed type for nullable schema %j', async (
    type,
    initialValue,
    text,
    expectedValue,
    expectedType,
  ) => {
    const user = userEvent.setup()
    const onModelChange = vi.fn()
    render(
      <SchemaForm
        form={[{ key: 'data', tabs: ['json', 'yaml'], type: 'structured' }]}
        model={{ data: initialValue }}
        onModelChange={onModelChange}
        schema={{
          type: 'object',
          properties: {
            data: { title: 'Data', type },
          },
        }}
      />,
    )

    fireEvent.change(screen.getByRole('textbox', { name: 'Data JSON editor' }), {
      target: { value: text },
    })
    await user.click(screen.getByRole('button', { name: 'Apply' }))

    expect(onModelChange).toHaveBeenCalledWith(
      ['data'],
      expectedValue,
      expectedType,
      expect.any(Object),
    )
  })

  it('keeps syntax-invalid and schema-invalid drafts out of the model', async () => {
    const user = userEvent.setup()
    const { onModelChange } = renderStructured()
    const editor = screen.getByRole('textbox', { name: 'Settings JSON editor' })

    fireEvent.change(editor, { target: { value: '{"enabled":' } })
    await user.click(screen.getByRole('button', { name: 'Apply' }))
    expect(screen.getByRole('alert')).toHaveTextContent('JSON')
    expect(onModelChange).not.toHaveBeenCalled()
    expect(editor).toHaveValue('{"enabled":')

    fireEvent.change(editor, { target: { value: '{"retries":0}' } })
    await user.click(screen.getByRole('button', { name: 'Apply' }))
    expect(screen.getByRole('alert')).toHaveTextContent(/required property 'enabled'|must have required property 'enabled'/)
    expect(onModelChange).not.toHaveBeenCalled()

    await user.click(screen.getByRole('button', { name: 'Reset' }))
    expect(JSON.parse(editor.value)).toEqual({ enabled: true, retries: 2 })
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('refreshes clean drafts and protects dirty drafts from external changes', async () => {
    const user = userEvent.setup()
    const { rerender, onModelChange } = renderStructured()
    const renderWithModel = (model) => rerender(
      <SchemaForm
        form={structuredForm}
        model={model}
        onModelChange={onModelChange}
        schema={objectSchema}
      />,
    )

    renderWithModel({ settings: { enabled: false, retries: 3 } })
    expect(JSON.parse(screen.getByRole('textbox', { name: 'Settings JSON editor' }).value))
      .toEqual({ enabled: false, retries: 3 })

    const editor = screen.getByRole('textbox', { name: 'Settings JSON editor' })
    fireEvent.change(editor, { target: { value: '{"enabled":true,"retries":9}' } })
    renderWithModel({ settings: { enabled: false, retries: 4 } })

    const warning = screen.getByText(/source value changed/i).closest('[role="alert"]')
    expect(warning).not.toBeNull()
    expect(editor).toHaveValue('{"enabled":true,"retries":9}')
    await user.click(within(warning).getByRole('button', { name: 'Reload' }))
    expect(JSON.parse(editor.value)).toEqual({ enabled: false, retries: 4 })

    fireEvent.change(editor, { target: { value: '{"enabled":true,"retries":8}' } })
    renderWithModel({ settings: { enabled: false, retries: 5 } })
    await user.click(screen.getByRole('button', { name: 'Keep Draft' }))
    expect(editor).toHaveValue('{"enabled":true,"retries":8}')
    expect(screen.queryByText(/source value changed/i)).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Apply' }))
    expect(onModelChange).toHaveBeenLastCalledWith(
      ['settings'],
      { enabled: true, retries: 8 },
      'object',
      expect.any(Object),
    )
  })

  it('contains malformed external values and recovers when the parent value is valid', () => {
    const { rerender, onModelChange } = renderStructured({ model: { settings: [] } })

    expect(screen.getByText(/source value could not be loaded/i)).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Settings JSON editor' })).toHaveValue('')

    rerender(
      <SchemaForm
        form={structuredForm}
        model={{ settings: { enabled: true } }}
        onModelChange={onModelChange}
        schema={objectSchema}
      />,
    )
    expect(JSON.parse(screen.getByRole('textbox', { name: 'Settings JSON editor' }).value))
      .toEqual({ enabled: true })
    expect(screen.queryByText(/source value could not be loaded/i)).not.toBeInTheDocument()
  })

  it('supports keyboard tab navigation and read-only copying', async () => {
    const user = userEvent.setup()
    renderStructured({
      form: [{ key: 'settings', tabs: ['json', 'yaml'], type: 'structured', readonly: true }],
    })

    const jsonTab = screen.getByRole('tab', { name: 'JSON' })
    jsonTab.focus()
    await user.keyboard('{ArrowRight}')

    expect(screen.getByRole('tab', { name: 'YAML' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('textbox', { name: 'Settings YAML editor' })).toHaveAttribute('readonly')
    expect(screen.queryByRole('button', { name: 'Apply' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Reset' })).not.toBeInTheDocument()
  })

  it('supports custom editor adapters and mapper overrides', () => {
    function Editor({ label, onChange, value }) {
      return <textarea aria-label={`Custom ${label}`} onChange={onChange} value={value} />
    }
    const form = [{
      key: 'settings',
      tabs: ['json', 'yaml'],
      type: 'structured',
      EditorComponent: Editor,
    }]
    const first = renderStructured({ form })
    expect(screen.getByRole('textbox', { name: 'Custom Settings JSON editor' }))
      .toBeInTheDocument()
    first.unmount()

    function Replacement() {
      return <output data-testid="replacement">replacement structured field</output>
    }
    renderStructured({ mapper: { structured: Replacement } })
    expect(screen.getByTestId('replacement')).toHaveTextContent('replacement structured field')
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument()
  })

  it('is exported as a standalone component', () => {
    expect(StructuredDataField).toBeTypeOf('function')
    expect(ExportedStructuredDataField).toBe(StructuredDataField)
    expect(parseStructuredText('json', '{}')).toEqual({})
  })
})
