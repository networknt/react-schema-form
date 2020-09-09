// @flow
import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SchemaForm from '../SchemaForm'

configure({ adapter: new Adapter() })

jest.dontMock('../ComposedComponent')
jest.dontMock('../utils')
jest.dontMock('lodash')

const getLocalizedString = (value) => {
  switch (value) {
    case 'first.name':
      return 'First Name'
    case 'last.name':
      return 'Last Name'
    case 'number.field':
      return 'Number Field'
    case 'integer.field':
      return 'Integer Field'
    case 'boolean.field':
      return 'Boolean Field'
    case 'array.field':
      return 'Array Field'
    case 'date.field':
      return 'Date Field'
    case 'tBoolean.field':
      return 'T Boolean Field'
    default:
      return value
  }
}

const localization = {
  getLocalizedString
}

const config = {
  form: [
    'firstName',
    'lastName',
    'numberField',
    'integerField',
    'booleanField',
    'dateField',
    'tBooleanField',
    'arrayField'
  ],
  schema: {
    type: 'object',
    title: 'Title',
    properties: {
      firstName: {
        title: 'first.name',
        type: 'string'
      },
      lastName: {
        title: 'last.name',
        type: 'string'
      },
      numberField: {
        title: 'number.field',
        type: 'string'
      },
      integerField: {
        title: 'integer.field',
        type: 'integer'
      },
      booleanField: {
        title: 'boolean.field',
        type: 'boolean'
      },
      dateField: {
        title: 'date.field',
        type: 'date'
      },
      tBooleanField: {
        title: 'tBoolean.field',
        type: 'date'
      },
      arrayField: {
        title: 'array.field',
        type: 'boolean',
        items: ['test1', 'test2']
      }
    }
  }
}

describe('Localizer test', () => {
  it('Schema that has localizer should render labels properly', () => {
    const wrapper = mount(
      <SchemaForm
        form={config.form}
        schema={config.schema}
        localization={localization}
      />
    )
    const labels = wrapper.find('label')
    expect(wrapper.find('label').length).toBe(8)
    labels.forEach((each, index) => {
      if (index === 0) expect(each.text()).toBe('First Name')
      if (index === 1) expect(each.text()).toBe('Last Name')
      if (index === 2) expect(each.text()).toBe('Number Field')
      if (index === 3) expect(each.text()).toBe('Integer Field')
      if (index === 4) expect(each.text()).toBe('Boolean Field')
      if (index === 5) expect(each.text()).toBe('Date Field')
      if (index === 6) expect(each.text()).toBe('T Boolean Field')
      if (index === 7)
        expect(each.find('ForwardRef(Typography) > span').text()).toBe(
          'Array Field'
        )
    })
  })

  it('Schema that has not localizer should render labels properly', () => {
    const wrapper = mount(
      <SchemaForm form={config.form} schema={config.schema} />
    )
    const labels = wrapper.find('label')
    expect(wrapper.find('label').length).toBe(8)
    labels.forEach((each, index) => {
      if (index === 0) expect(each.text()).toBe('first.name')
      if (index === 1) expect(each.text()).toBe('last.name')
      if (index === 2) expect(each.text()).toBe('number.field')
      if (index === 3) expect(each.text()).toBe('integer.field')
      if (index === 4) expect(each.text()).toBe('boolean.field')
      if (index === 5) expect(each.text()).toBe('date.field')
      if (index === 6) expect(each.text()).toBe('tBoolean.field')
      if (index === 7)
        expect(each.find('ForwardRef(Typography) > span').text()).toBe(
          'array.field'
        )
    })
  })
})
