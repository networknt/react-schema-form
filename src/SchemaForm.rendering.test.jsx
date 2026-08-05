import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import SchemaForm from './SchemaForm'

const noop = () => {}

describe('SchemaForm rendering extension points', () => {
  it('renders nested object fieldsets without requiring injected style classes', () => {
    const schema = {
      type: 'object',
      properties: {
        profile: {
          title: 'Profile',
          type: 'object',
          properties: {
            displayName: { title: 'Display name', type: 'string' },
            preferences: {
              title: 'Preferences',
              type: 'object',
              properties: {
                theme: { title: 'Theme', type: 'string' }
              }
            }
          }
        }
      }
    }

    render(
      <SchemaForm
        schema={schema}
        model={{ profile: { displayName: 'Ada', preferences: { theme: 'dark' } } }}
        onModelChange={noop}
      />
    )

    expect(screen.getByRole('group', { name: 'Profile' })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Preferences' })).toBeInTheDocument()
    expect(screen.getByLabelText('Display name')).toHaveValue('Ada')
    expect(screen.getByLabelText('Theme')).toHaveValue('dark')
  })

  it('uses a caller-provided mapper for a custom field type', () => {
    function CustomField({ form, model }) {
      return <output data-testid="custom-field">{form.title}: {model[form.key[0]]}</output>
    }

    render(
      <SchemaForm
        schema={{
          type: 'object',
          properties: {
            name: { title: 'Custom name', type: 'string' }
          }
        }}
        form={[{ key: 'name', type: 'custom' }]}
        mapper={{ custom: CustomField }}
        model={{ name: 'mapped value' }}
        onModelChange={noop}
      />
    )

    expect(screen.getByTestId('custom-field')).toHaveTextContent('Custom name: mapped value')
  })

  it('does not retain a mapper override after the override is removed', () => {
    function CustomText() {
      return <output data-testid="custom-text">custom text</output>
    }
    const schema = {
      type: 'object',
      properties: {
        name: { title: 'Name', type: 'string' }
      }
    }

    const view = render(
      <SchemaForm
        schema={schema}
        mapper={{ text: CustomText }}
        model={{ name: 'Ada' }}
        onModelChange={noop}
      />
    )
    expect(screen.getByTestId('custom-text')).toBeInTheDocument()

    view.rerender(
      <SchemaForm schema={schema} model={{ name: 'Ada' }} onModelChange={noop} />
    )

    expect(screen.queryByTestId('custom-text')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Name')).toHaveValue('Ada')
  })

  it('renders arrays containing nested objects and arrays', () => {
    const schema = {
      type: 'object',
      properties: {
        rules: {
          title: 'Rules',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { title: 'Rule name', type: 'string' },
              targets: {
                title: 'Targets',
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    value: { title: 'Target value', type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    }
    const model = {
      rules: [{ name: 'allow', targets: [{ value: 'production' }] }]
    }

    render(<SchemaForm schema={schema} model={model} onModelChange={noop} />)

    expect(screen.getByLabelText('Rule name')).toHaveValue('allow')
    expect(screen.getByLabelText('Target value')).toHaveValue('production')
    expect(screen.getAllByRole('button', { name: 'Add' })).toHaveLength(2)
  })

  it('preserves readonly, default, and conditional behavior', () => {
    const onModelChange = vi.fn()
    const schema = {
      type: 'object',
      properties: {
        immutableId: { title: 'Immutable id', type: 'string', readOnly: true },
        role: { title: 'Role', type: 'string', default: 'guest' },
        level: { title: 'Level', type: 'integer' },
        details: { title: 'Advanced details', type: 'string' }
      }
    }
    const form = [
      'immutableId',
      'role',
      'level',
      { key: 'details', condition: 'model.level > 1' }
    ]
    const advancedModel = { immutableId: 'fixed', level: 2, details: 'visible' }

    const view = render(
      <SchemaForm
        schema={schema}
        form={form}
        model={advancedModel}
        onModelChange={onModelChange}
      />
    )

    expect(screen.getByLabelText('Immutable id')).toBeDisabled()
    expect(screen.getByLabelText('Role')).toHaveValue('guest')
    expect(onModelChange).toHaveBeenCalledWith(['role'], 'guest', 'text', expect.any(Object))
    expect(screen.getByLabelText('Advanced details')).toHaveValue('visible')

    view.rerender(
      <SchemaForm
        schema={schema}
        form={form}
        model={{ immutableId: 'fixed', level: 1 }}
        onModelChange={onModelChange}
      />
    )

    expect(screen.queryByLabelText('Advanced details')).not.toBeInTheDocument()
  })

  it('renders and validates required integer fields whose value is zero', () => {
    const schema = {
      type: 'object',
      properties: {
        inputMicrosPerMillion: {
          title: 'Input Micros Per Million Tokens',
          type: 'integer',
          minimum: 0
        },
        outputMicrosPerMillion: {
          title: 'Output Micros Per Million Tokens',
          type: 'integer',
          minimum: 0
        },
        cachedInputMicrosPerMillion: {
          title: 'Cached Input Micros Per Million Tokens',
          type: 'integer',
          minimum: 0
        }
      },
      required: [
        'inputMicrosPerMillion',
        'outputMicrosPerMillion',
        'cachedInputMicrosPerMillion'
      ]
    }
    const model = {
      inputMicrosPerMillion: 0,
      outputMicrosPerMillion: 0,
      cachedInputMicrosPerMillion: 0
    }

    render(
      <SchemaForm
        schema={schema}
        model={model}
        onModelChange={noop}
        showErrors
      />
    )

    for (const label of [
      'Input Micros Per Million Tokens',
      'Output Micros Per Million Tokens',
      'Cached Input Micros Per Million Tokens'
    ]) {
      const field = screen.getByLabelText(new RegExp(`^${label}`))
      expect(field).toHaveValue('0')
      expect(field).toBeValid()
    }
  })

  it('applies a numeric default whose value is zero', () => {
    render(
      <SchemaForm
        schema={{
          type: 'object',
          properties: {
            rate: { title: 'Rate', type: 'integer', default: 0 }
          }
        }}
        model={{}}
        onModelChange={noop}
      />
    )

    expect(screen.getByLabelText('Rate')).toHaveValue('0')
  })
})
