import React from "react";
import { render, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SchemaForm from "../SchemaForm";

configure({ adapter: new Adapter() });

const cfg = {
    form: [
        "name",
        {
            key: "date",
            type: "date",
            condition: 'model.name !== "" && model.name !== undefined'
        }
    ],
    schema: {
        type: "object",
        title: "Types",
        properties: {
            name: {
                type: "string",
                minLength: 3
            },
            date: {
                title: "Date",
                type: "object"
            },
            array: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        switch: {
                            "type": "boolean"
                        },
                        conditional: {
                            "type": "string"
                        }
                    }
                }
            }
        },
        required: ["name", "date"]
    },
    model: {
        name: "some value"
    }
};

describe("Composed component test", () => {
    it("The simple condition :", () => {
        const display = render(
            <SchemaForm form={cfg.form} schema={cfg.schema} model={cfg.model} />
        );

        // Output must have two inputs
        expect(display.find("input").length).toEqual(2);
        // And secont inputs type have to be of type 'date'
        expect(display.find("input")[1].attribs.type).toEqual("date");
    });

    it("The complex condition :", () => {
        const newForm = [
            "name",
            {
                key: "date",
                type: "date",
                condition:
                    'model.name !== "" && (2 > 1 && (model.name === "some" || model.name === "value"))'
            }
        ];

        let model = { name: "some" };

        let display = render(
            <SchemaForm form={newForm} schema={cfg.schema} model={model} />
        );
        // this case expected to have addictional date input
        expect(display.find("input").length).toEqual(2);

        model = { name: "value" };
        display = render(
            <SchemaForm form={newForm} schema={cfg.schema} model={model} />
        );
        // and this one too
        expect(display.find("input").length).toEqual(2);

        model = { name: "some other value" };
        display = render(
            <SchemaForm form={newForm} schema={cfg.schema} model={model} />
        );
        // here a date input is not expected cause condition is falsy
        expect(display.find("input").length).toEqual(1);
    });
    it("The arrays with condition :", () => {
        const newForm = [
            "name",
            {
                key: "array",
                type: "array",
                items: [
                    "array[].switch",
                    {
                        key: "array[].conditional",
                        condition: "model.array[form.key[1]].switch"
                    }
                ]
            }
        ];

        let model = {
            name: "some",
            array: [
                {
                    switch: true
                },
                {
                    switch: false
                }
            ]
        };

        let display = render(
            <SchemaForm form={newForm} schema={cfg.schema} model={model} />
        );
        // Should show 'conditional' field in only one element of the array
        expect(display.find("input").length).toEqual(4);

        model.array[1].switch = true;

        display = render(
            <SchemaForm form={newForm} schema={cfg.schema} model={model} />
        );
        // Should show 'conditional' field in both elements of the array
        expect(display.find("input").length).toEqual(5);

        model.array[0].switch = false;
        model.array[1].switch = false;

        display = render(
            <SchemaForm form={newForm} schema={cfg.schema} model={model} />
        );
        // Should not show 'conditional' field in either elements of the array
        expect(display.find("input").length).toEqual(3);
    });
});
