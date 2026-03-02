import React from 'react'
import { render, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SchemaForm from '../SchemaForm'
import utils from '../utils'

configure({ adapter: new Adapter() })

function onModelChange(key, val, type) {
    const newModel = {}
    utils.selectOrSet(key, newModel, val, type)
}

const cfg = {
    schema: {
        type: 'object',
        title: 'File Upload',
        properties: {
            fileUpload: {
                title: 'Document',
                type: 'string'
            }
        }
    },
    form: [
        {
            key: 'fileUpload',
            type: 'file',
            readonly: false
        }
    ],
    model: {}
}

describe('File widget component', () => {
    it('Should render file input and respect readonly attribute', () => {
        // 1. Render normal file widget
        cfg.form[0].readonly = false
        const result = render(
            <SchemaForm
                form={cfg.form}
                schema={cfg.schema}
                model={cfg.model}
                onModelChange={onModelChange}
            />
        )

        expect(result.find('input[type="file"]').length).toEqual(1)

        // 2. Render readonly file widget
        cfg.form[0].readonly = true
        const resultReadonly = render(
            <SchemaForm
                form={cfg.form}
                schema={cfg.schema}
                model={cfg.model}
                onModelChange={onModelChange}
            />
        )

        expect(resultReadonly.find('button')[0].attribs.disabled).toBeDefined()
        expect(resultReadonly.find('input[type="file"]')[0].attribs.disabled).toBeDefined()
    })
})
