const React = require("react");
const Shalow = require("react-test-renderer/shallow");
const Text = require("../Text").default;
const Composed = require("../ComposedComponent").default;

test("Composed component test", () => {
    const renderer = new Shalow();
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

    const TestText = Composed(Text);
    renderer.render(
        <TestText form={cfg.form} model={cfg.model} mapper={cfg.mapper} />
    );

    const result = renderer.getRenderOutput();

    expect(result.props.value).toEqual("steeve");
});
