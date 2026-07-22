import React from 'react'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SchemaForm from './SchemaForm'

const examples = [
  ['closed object', 'closed-object.json'],
  ['open object', 'open-object.json'],
  ['primitive array', 'primitive-array.json'],
  ['object array', 'object-array.json'],
  ['invalid draft', 'invalid-draft.json'],
  ['read only', 'read-only.json'],
]

function loadExample(filename) {
  return JSON.parse(readFileSync(
    resolve(`example/public/data/structured/${filename}`),
    'utf8',
  ))
}

describe('structured-data examples', () => {
  it.each(examples)('renders the %s fixture', (_name, filename) => {
    const { form, model, schema } = loadExample(filename)
    render(
      <SchemaForm
        form={form}
        model={model}
        onModelChange={() => {}}
        schema={schema}
      />,
    )

    expect(screen.getByRole('tab', { name: 'Form' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'JSON' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'YAML' })).toBeInTheDocument()
  })

  it('documents the Form fallback for the open-object fixture', () => {
    const { form, model, schema } = loadExample('open-object.json')
    render(
      <SchemaForm
        form={form}
        model={model}
        onModelChange={() => {}}
        schema={schema}
      />,
    )

    expect(screen.getByRole('tab', { name: 'Form' })).toBeDisabled()
    expect(screen.getByRole('tab', { name: 'JSON' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText(/Form view is unavailable/i)).toBeInTheDocument()
  })
})
