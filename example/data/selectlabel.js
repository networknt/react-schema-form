export default {
    schema: {
        type: "object",
        required: ["name", "region"],
        title: "Create Wallet",
        properties: {
            name: {
                title: "Name",
                type: "string"
            },
            region: {
                title: "Region",
                type: "string",
                enum: ["0000", "0001", "0002"]
            },
            bank: {
                title: "Bank",
                type: "string",
                enum: [
                    { id: 1, name: "First" },
                    { id: 2, name: "Second" },
                    { id: 3, name: "Third" }
                ],
                isObject: true,
                displayFn: each => each.name
            }
        }
    },
    form: [
        "name",
        {
            key: "region",
            type: "select",
            titleMap: [
                {
                    value: "0000",
                    name: "Americas"
                },
                {
                    value: "0001",
                    name: "Asia, Oceania"
                },
                {
                    value: "0002",
                    name: "Europe, Africa"
                }
            ]
        },
        "bank"
    ]
};
