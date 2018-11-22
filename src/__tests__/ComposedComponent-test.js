import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import ComposedComponent from "../ComposedComponent";
import Text from "../Text";

jest.dontMock("../ComposedComponent");
jest.dontMock("../utils");
jest.dontMock("lodash");

describe("ComposedComponent", () => {
    it("shows default value at text field", () => {
        const renderer = new ShallowRenderer();
        const cfg = {
            form: {
                key: ["name"],
                schema: {
                    default: "steeve",
                    title: "name",
                    type: "String"
                },
                type: "text",
                title: "name"
            },
            model: { name: "steeve" },
            mapper: {}
        };

        const Composed = ComposedComponent(Text);

        renderer.render(
            <Composed form={cfg.form} model={cfg.model} mapper={cfg.mapper} />
        );

        const result = renderer.getRenderOutput();

        expect(result.props.value).toEqual("steeve");
    });
});
