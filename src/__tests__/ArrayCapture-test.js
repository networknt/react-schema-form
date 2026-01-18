import React from 'react'
import { render, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import utils from '../utils'
import SchemaForm from '../SchemaForm'

configure({ adapter: new Adapter() })

jest.dontMock('../utils')
jest.dontMock('../utils')
jest.dontMock('lodash')

function onModelChange(key, val, type) {
  const { model } = this.state
  const newModel = model
  utils.selectOrSet(key, newModel, val, type)
  this.setState({ model: newModel })
}

describe('Composed component test', () => {
  it('Output from model with 3 comps must have length 3: ', () => {
    const cfg = {
      form: [
        {
          key: 'comments',
          add: 'New',
          style: {
            add: 'btn-success'
          },
          items: ['comments[].name']
        }
      ],
      schema: {
        type: 'object',
        title: 'Comment',
        required: ['comments'],
        properties: {
          comments: {
            type: 'array',
            maxItems: 2,
            items: {
              type: 'object',
              properties: {
                name: {
                  title: 'Name',
                  type: 'string'
                }
              },
              required: ['name']
            }
          }
        }
      },
      model: {
        comments: [
          {
            name: 'some value'
          },
          {
            name: 'some next value'
          },
          {
            name: 'some other value'
          }
        ]
      }
    }

    const display = render(
      <SchemaForm
        form={cfg.form}
        schema={cfg.schema}
        model={cfg.model}
        onModelChange={onModelChange}
      />
    )

    expect(display.find('input').length).toEqual(3)
  })
})
