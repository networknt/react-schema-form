export default {
    form: ["firstName", "date"],
    schema: {
        type: "object",
        title: "Title",
        properties: {
            firstName: {
                title: "first.name",
                type: "string"
            },
            date: {
                title: "first.name",
                type: "date"
            }
        }
    },
    localization: {
        getLocalizedString: value =>
            value === "first.name" ? "First Name" : value
    }
};
