import React, { useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import SchemaForm from './SchemaForm'
import StructuredDataField from './StructuredDataField'
import utils from './utils'

function ControlledForm({ form, initialModel, mapper, onModelChange, schema }) {
  const [model, setModel] = useState(initialModel)
  const changeModel = (key, value, type, changedForm) => {
    const next = JSON.parse(JSON.stringify(model))
    utils.selectOrSet(key, next, value, type)
    onModelChange?.(key, value, type, changedForm)
    setModel(next)
  }
  return (
    <SchemaForm
      form={form}
      mapper={mapper}
      model={model}
      onModelChange={changeModel}
      schema={schema}
    />
  )
}

const settingsSchema = {
  type: 'object',
  properties: {
    settings: {
      title: 'Settings',
      type: 'object',
      properties: {
        name: { title: 'Name', type: 'string' },
        mode: { enum: ['safe', 'fast'], title: 'Mode', type: 'string' },
        nested: {
          title: 'Nested',
          type: 'object',
          properties: {
            note: { title: 'Note', type: 'string' },
          },
        },
        immutable: { readOnly: true, title: 'Immutable', type: 'string' },
      },
      required: ['name'],
    },
  },
}

describe('StructuredDataField Form tab', () => {
  it('renders generated object controls and synchronizes Form edits into JSON and YAML', async () => {
    const user = userEvent.setup()
    const onModelChange = vi.fn()
    const validate = vi.spyOn(utils, 'validate')
    render(
      <ControlledForm
        form={[{ key: 'settings', type: 'structured' }]}
        initialModel={{
          settings: {
            immutable: 'fixed',
            mode: 'safe',
            name: 'initial',
            nested: { note: 'before' },
          },
        }}
        onModelChange={onModelChange}
        schema={settingsSchema}
      />,
    )

    expect(screen.getByRole('tab', { name: 'Form' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByLabelText(/^Name/)).toHaveValue('initial')
    expect(screen.getByLabelText('Note')).toHaveValue('before')
    expect(screen.getByLabelText('Immutable')).toBeDisabled()

    fireEvent.change(screen.getByLabelText(/^Name/), { target: { value: 'from form' } })
    expect(validate).toHaveBeenCalledWith(
      expect.objectContaining({ key: ['settings', 'name'] }),
      'from form',
    )
    expect(onModelChange.mock.calls.at(-1).slice(0, 2))
      .toEqual([['settings', 'name'], 'from form'])
    await user.click(screen.getByRole('tab', { name: 'JSON' }))
    const jsonValue = JSON.parse(screen.getByRole('textbox', { name: 'Settings JSON editor' }).value)
    expect(jsonValue).toMatchObject({ name: 'from form', nested: { note: 'before' } })
    await user.click(screen.getByRole('tab', { name: 'YAML' }))
    expect(screen.getByRole('textbox', { name: 'Settings YAML editor' }).value)
      .toContain('name: from form')
  })

  it('synchronizes an applied text edit back into generated controls', async () => {
    const user = userEvent.setup()
    render(
      <ControlledForm
        form={[{ key: 'settings', type: 'structured' }]}
        initialModel={{
          settings: {
            immutable: 'fixed',
            mode: 'safe',
            name: 'initial',
            nested: { note: 'before' },
          },
        }}
        schema={settingsSchema}
      />,
    )

    await user.click(screen.getByRole('tab', { name: 'JSON' }))
    fireEvent.change(screen.getByRole('textbox', { name: 'Settings JSON editor' }), {
      target: {
        value: JSON.stringify({
          immutable: 'fixed',
          mode: 'fast',
          name: 'from json',
          nested: { note: 'after' },
        }),
      },
    })
    await user.click(screen.getByRole('button', { name: 'Apply' }))
    await user.click(screen.getByRole('tab', { name: 'Form' }))

    expect(screen.getByLabelText(/^Name/)).toHaveValue('from json')
    expect(screen.getByLabelText('Note')).toHaveValue('after')
  })

  it('preserves custom mapper overrides inside the Form tab', () => {
    function CustomText({ form, model }) {
      return <output data-testid="custom-text">{form.title}: {utils.selectOrSet(form.key, model)}</output>
    }
    render(
      <ControlledForm
        form={[{ key: 'settings', type: 'structured' }]}
        initialModel={{
          settings: {
            immutable: 'fixed',
            mode: 'safe',
            name: 'custom value',
            nested: { note: 'nested custom' },
          },
        }}
        mapper={{ text: CustomText }}
        schema={settingsSchema}
      />,
    )

    expect(screen.getAllByTestId('custom-text').map((item) => item.textContent))
      .toEqual(expect.arrayContaining(['Name: custom value', 'Note: nested custom']))
  })

  it('does not append an item merely by opening an empty array Form tab', () => {
    const onModelChange = vi.fn()
    render(
      <ControlledForm
        form={[{ key: 'operations', type: 'structured' }]}
        initialModel={{ operations: [] }}
        onModelChange={onModelChange}
        schema={{
          type: 'object',
          properties: {
            operations: {
              items: { title: 'Operation', type: 'string' },
              title: 'Operations',
              type: 'array',
            },
          },
        }}
      />,
    )

    expect(screen.getByRole('tab', { name: 'Form' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
    expect(screen.queryByLabelText('Operation')).not.toBeInTheDocument()
    expect(onModelChange).not.toHaveBeenCalled()
  })

  it('preserves nested empty arrays when opening an object Form tab', () => {
    const onModelChange = vi.fn()
    render(
      <ControlledForm
        form={[{ key: 'settings', type: 'structured' }]}
        initialModel={{ settings: { groups: [] } }}
        onModelChange={onModelChange}
        schema={{
          type: 'object',
          properties: {
            settings: {
              title: 'Settings',
              type: 'object',
              properties: {
                groups: {
                  title: 'Groups',
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      name: { title: 'Group name', type: 'string' },
                    },
                  },
                },
              },
            },
          },
        }}
      />,
    )

    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
    expect(screen.queryByLabelText('Group name')).not.toBeInTheDocument()
    expect(onModelChange).not.toHaveBeenCalled()
  })

  it('disables Form with guidance for open objects without generated controls', () => {
    render(
      <ControlledForm
        form={[{ key: 'metadata', type: 'structured' }]}
        initialModel={{ metadata: {} }}
        schema={{
          type: 'object',
          properties: {
            metadata: {
              additionalProperties: true,
              title: 'Metadata',
              type: 'object',
            },
          },
        }}
      />,
    )

    expect(screen.getByRole('tab', { name: 'Form' })).toBeDisabled()
    expect(screen.getByRole('tab', { name: 'JSON' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText(/Form view is unavailable/i)).toHaveTextContent(/Use JSON or YAML/)
  })

  it('preserves nested object-array focus and order across controlled updates', () => {
    render(
      <ControlledForm
        form={[{ key: 'settings', type: 'structured' }]}
        initialModel={{
          settings: {
            endpoints: [{ name: 'first' }, { name: 'second' }],
          },
        }}
        schema={{
          type: 'object',
          properties: {
            settings: {
              title: 'Settings',
              type: 'object',
              properties: {
                endpoints: {
                  title: 'Endpoints',
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      name: { title: 'Endpoint name', type: 'string' },
                    },
                  },
                },
              },
            },
          },
        }}
      />,
    )

    const inputs = screen.getAllByLabelText('Endpoint name')
    inputs[0].focus()
    fireEvent.change(inputs[0], { target: { value: 'first edited' } })

    const updated = screen.getAllByLabelText('Endpoint name')
    expect(updated.map((input) => input.value)).toEqual(['first edited', 'second'])
    expect(document.activeElement).toBe(updated[0])
  })

  it('renders tuple arrays and enum arrays through existing mapper controls', () => {
    const schema = {
      type: 'object',
      properties: {
        coordinate: {
          title: 'Coordinate',
          type: 'array',
          items: [
            { title: 'Label', type: 'string' },
            { title: 'Position', type: 'integer' },
          ],
        },
        capabilities: {
          items: { enum: ['chat', 'embedding'], type: 'string' },
          title: 'Capabilities',
          type: 'array',
        },
      },
    }

    const first = render(
      <ControlledForm
        form={[{ key: 'coordinate', type: 'structured' }]}
        initialModel={{ coordinate: ['north', 2] }}
        schema={schema}
      />,
    )
    expect(screen.getByLabelText('Label')).toHaveValue('north')
    expect(screen.getByLabelText('Position')).toHaveValue('2')
    first.unmount()

    render(
      <ControlledForm
        form={[{ key: 'capabilities', type: 'structured' }]}
        initialModel={{ capabilities: ['chat'] }}
        schema={schema}
      />,
    )
    expect(screen.getByRole('combobox')).toHaveTextContent('chat')
  })

  it('supports schema-local configuration, defaults, and conditionals', async () => {
    const user = userEvent.setup()
    render(
      <ControlledForm
        form={[{
          key: 'settings',
          items: [
            { key: 'settings.mode' },
            {
              condition: "model.settings.mode === 'advanced'",
              key: 'settings.detail',
            },
            { key: 'settings.region' },
          ],
          type: 'structured',
        }]}
        initialModel={{ settings: { mode: 'advanced' } }}
        schema={{
          type: 'object',
          properties: {
            settings: {
              title: 'Settings',
              type: 'object',
              'x-schema-form': {
                defaultTab: 'form',
                type: 'structured',
              },
              properties: {
                mode: { title: 'Mode', type: 'string' },
                detail: { title: 'Detail', type: 'string' },
                region: { default: 'us-east', title: 'Region', type: 'string' },
              },
            },
          },
        }}
      />,
    )

    expect(screen.getByLabelText('Detail')).toBeInTheDocument()
    expect(screen.getByLabelText('Region')).toHaveValue('us-east')
    fireEvent.change(screen.getByLabelText('Mode'), { target: { value: 'basic' } })
    expect(screen.queryByLabelText('Detail')).not.toBeInTheDocument()
    await user.click(screen.getByRole('tab', { name: 'JSON' }))
    expect(JSON.parse(screen.getByRole('textbox', { name: 'Settings JSON editor' }).value))
      .toMatchObject({ mode: 'basic', region: 'us-east' })
  })

  it('honors x-schema-form structured configuration without an explicit form entry', () => {
    const schema = {
      type: 'object',
      properties: {
        settings: {
          title: 'Settings',
          type: 'object',
          'x-schema-form': { tabs: ['form', 'json', 'yaml'], type: 'structured' },
          properties: {
            name: { title: 'Name', type: 'string' },
          },
        },
      },
    }
    let capturedForm
    function Capture({ form, ...props }) {
      capturedForm = form
      return <StructuredDataField {...props} form={form} />
    }
    render(
      <ControlledForm
        initialModel={{ settings: { name: 'schema configured' } }}
        mapper={{ structured: Capture }}
        schema={schema}
      />,
    )
    expect(capturedForm).toMatchObject({ type: 'structured' })
    expect(capturedForm.key).toEqual(['settings'])
    expect(capturedForm.schema).toBe(schema.properties.settings)
    expect(Array.isArray(capturedForm.items)).toBe(true)
    expect(capturedForm.items).toHaveLength(1)
    expect(screen.queryByText(/source value could not be loaded/i)).not.toBeInTheDocument()

    const formTab = screen.getByRole('tab', { name: 'Form' })
    const jsonTab = screen.getByRole('tab', { name: 'JSON' })
    expect({
      formDisabled: formTab.disabled,
      formSelected: formTab.getAttribute('aria-selected'),
      jsonSelected: jsonTab.getAttribute('aria-selected'),
    }).toEqual({
      formDisabled: false,
      formSelected: 'true',
      jsonSelected: 'false',
    })
    expect(screen.getByLabelText('Name')).toHaveValue('schema configured')
  })

  it('disables Form for null and enables it after explicit initialization', async () => {
    const user = userEvent.setup()
    render(
      <ControlledForm
        form={[{ key: 'settings', type: 'structured' }]}
        initialModel={{ settings: null }}
        schema={{
          type: 'object',
          properties: {
            settings: {
              title: 'Settings',
              type: ['object', 'null'],
              properties: {
                name: { title: 'Name', type: 'string' },
              },
            },
          },
        }}
      />,
    )

    expect(screen.getByRole('tab', { name: 'Form' })).toBeDisabled()
    const editor = screen.getByRole('textbox', { name: 'Settings JSON editor' })
    expect(editor).toHaveValue('null')
    fireEvent.change(editor, { target: { value: '{"name":"initialized"}' } })
    await user.click(screen.getByRole('button', { name: 'Apply' }))

    expect(screen.getByRole('tab', { name: 'Form' })).not.toBeDisabled()
    await user.click(screen.getByRole('tab', { name: 'Form' }))
    expect(screen.getByLabelText('Name')).toHaveValue('initialized')
  })
})
