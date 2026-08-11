import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import SchemaForm from './SchemaForm'
import utils from './utils'

const noop = () => {}

function ControlledSchemaForm({ schema, initialModel, onModelChange, ...formProps }) {
  const [model, setModel] = React.useState(initialModel)
  const handleModelChange = (key, value) => {
    onModelChange(key, value)
    setModel((current) => {
      const next = structuredClone(current)
      utils.selectOrSet(key, next, value)
      return next
    })
  }

  return (
    <SchemaForm
      schema={schema}
      model={model}
      onModelChange={handleModelChange}
      {...formProps}
    />
  )
}

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

  it('applies defaults to absent values without replacing explicit null', () => {
    const onModelChange = vi.fn()
    render(
      <SchemaForm
        schema={{
          type: 'object',
          properties: {
            nullableName: {
              title: 'Nullable name',
              type: ['string', 'null'],
              default: 'fallback'
            },
            missingName: {
              title: 'Missing name',
              type: 'string',
              default: 'created'
            }
          }
        }}
        model={{ nullableName: null }}
        onModelChange={onModelChange}
      />
    )

    expect(screen.getByLabelText('Nullable name')).toHaveValue('')
    expect(screen.getByLabelText('Missing name')).toHaveValue('created')
    expect(onModelChange).toHaveBeenCalledWith(
      ['missingName'],
      'created',
      'text',
      expect.any(Object)
    )
    expect(onModelChange).not.toHaveBeenCalledWith(
      ['nullableName'],
      'fallback',
      expect.anything(),
      expect.anything()
    )
  })

  it('feeds nested controlled changes back into the matching model path', () => {
    const onModelChange = vi.fn()
    render(
      <ControlledSchemaForm
        schema={{
          type: 'object',
          properties: {
            limits: {
              title: 'Limits',
              type: 'object',
              properties: {
                requestLimit: {
                  title: 'Request limit',
                  type: ['integer', 'null']
                }
              }
            }
          }
        }}
        initialModel={{ limits: { requestLimit: 12 } }}
        onModelChange={onModelChange}
      />
    )

    const requestLimit = screen.getByLabelText('Request limit')
    fireEvent.change(requestLimit, { target: { value: '' } })

    expect(onModelChange).toHaveBeenLastCalledWith(
      ['limits', 'requestLimit'],
      null
    )
    expect(requestLimit).toHaveValue('')
  })

  it('parses and clears nullable integer and number fields', () => {
    const onModelChange = vi.fn()
    render(
      <ControlledSchemaForm
        schema={{
          type: 'object',
          properties: {
            tokenLimit: {
              title: 'Token limit',
              type: ['integer', 'null'],
              default: 5
            },
            samplingRate: {
              title: 'Sampling rate',
              type: ['null', 'number']
            },
            retryCount: {
              title: 'Retry count',
              type: 'integer'
            }
          }
        }}
        initialModel={{ tokenLimit: 5, samplingRate: null, retryCount: 7 }}
        onModelChange={onModelChange}
        showErrors
      />
    )

    const tokenLimit = screen.getByLabelText('Token limit')
    const samplingRate = screen.getByLabelText('Sampling rate')
    const retryCount = screen.getByLabelText('Retry count')

    fireEvent.change(tokenLimit, { target: { value: '4096' } })
    expect(onModelChange).toHaveBeenLastCalledWith(
      ['tokenLimit'],
      4096
    )
    expect(tokenLimit).toHaveValue('4096')

    fireEvent.change(samplingRate, { target: { value: '0.25' } })
    expect(onModelChange).toHaveBeenLastCalledWith(
      ['samplingRate'],
      0.25
    )
    expect(samplingRate).toHaveValue('0.25')

    fireEvent.change(tokenLimit, { target: { value: '' } })
    expect(onModelChange).toHaveBeenLastCalledWith(
      ['tokenLimit'],
      null
    )
    expect(tokenLimit).toHaveValue('')

    fireEvent.change(tokenLimit, { target: { value: '-' } })
    expect(onModelChange).toHaveBeenLastCalledWith(
      ['tokenLimit'],
      '-'
    )
    expect(tokenLimit).toHaveValue('-')
    expect(tokenLimit).toBeInvalid()

    fireEvent.change(tokenLimit, { target: { value: '-7' } })
    expect(onModelChange).toHaveBeenLastCalledWith(
      ['tokenLimit'],
      -7
    )
    expect(tokenLimit).toHaveValue('-7')
    expect(tokenLimit).toBeValid()

    fireEvent.change(samplingRate, { target: { value: ' ' } })
    expect(onModelChange).toHaveBeenLastCalledWith(
      ['samplingRate'],
      null
    )
    expect(samplingRate).toHaveValue('')

    fireEvent.change(samplingRate, { target: { value: ' 42 ' } })
    expect(onModelChange).toHaveBeenLastCalledWith(
      ['samplingRate'],
      42
    )
    expect(samplingRate).toHaveValue('42')
    expect(samplingRate).toBeValid()

    for (const invalid of ['abc', '0x10', 'Infinity']) {
      fireEvent.change(samplingRate, { target: { value: invalid } })
      expect(onModelChange).toHaveBeenLastCalledWith(
        ['samplingRate'],
        invalid
      )
      expect(samplingRate).toHaveValue(invalid)
      expect(samplingRate).toBeInvalid()
    }

    fireEvent.change(samplingRate, { target: { value: '-' } })
    expect(onModelChange).toHaveBeenLastCalledWith(
      ['samplingRate'],
      '-'
    )
    expect(samplingRate).toHaveValue('-')
    expect(samplingRate).toBeInvalid()

    fireEvent.change(samplingRate, { target: { value: '-0' } })
    expect(onModelChange.mock.calls.at(-1)[0]).toEqual(['samplingRate'])
    expect(Object.is(onModelChange.mock.calls.at(-1)[1], -0)).toBe(true)
    expect(samplingRate).toHaveValue('-0')

    fireEvent.change(samplingRate, { target: { value: '-0.' } })
    expect(onModelChange).toHaveBeenLastCalledWith(
      ['samplingRate'],
      '-0.'
    )
    expect(samplingRate).toHaveValue('-0.')

    fireEvent.change(samplingRate, { target: { value: '-0.2' } })
    expect(onModelChange).toHaveBeenLastCalledWith(
      ['samplingRate'],
      -0.2
    )
    expect(samplingRate).toHaveValue('-0.2')

    fireEvent.change(samplingRate, { target: { value: '-0.25' } })
    expect(onModelChange).toHaveBeenLastCalledWith(
      ['samplingRate'],
      -0.25
    )
    expect(samplingRate).toHaveValue('-0.25')
    expect(samplingRate).toBeValid()

    fireEvent.change(retryCount, { target: { value: '12345678901234567' } })
    expect(onModelChange).toHaveBeenLastCalledWith(
      ['retryCount'],
      '12345678901234567'
    )
    expect(retryCount).toHaveValue('12345678901234567')
    expect(retryCount).toBeInvalid()

    fireEvent.change(retryCount, { target: { value: '' } })
    expect(onModelChange).toHaveBeenLastCalledWith(
      ['retryCount'],
      null
    )
    expect(retryCount).toHaveValue('')
  })
})
