import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import SchemaForm from '../SchemaForm'

describe('SchemaForm test', () => {
  it('shows SchemaForm', () => {
    const shallowRenderer = new ShallowRenderer()
    const cfg = {
      form: {},
      schema: {
        type: 'object'
      },
      model: {},
      mapper: {}
    }
    shallowRenderer.render(
      <SchemaForm schema={cfg.schema} mapper={cfg.mapper} />
    )
    const result = shallowRenderer.getRenderOutput()
    expect(result.type).toEqual('div')
    expect(result.props.children).toEqual([])
  })
})
