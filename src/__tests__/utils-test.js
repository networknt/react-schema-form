import _ from "lodash";
import utils from "../utils";
/**
 * Created by steve on 11/09/15.
 */
jest.dontMock("../utils");
jest.dontMock("lodash");

describe("utils", () => {
    it("gets defaults from schema and form", () => {
        const schema = {
            type: "object",
            properties: {
                name: {
                    title: "Name",
                    description: "Gimme yea name lad",
                    type: "string"
                },
                gender: {
                    title: "Choose",
                    type: "string",
                    enum: ["undefined", "null", "NaN"]
                },
                overEighteen: {
                    title: "Are you over 18 years old?",
                    type: "boolean",
                    default: false
                },
                attributes: {
                    type: "object",
                    required: ["eyecolor"],
                    properties: {
                        eyecolor: { type: "string", title: "Eye color" },
                        haircolor: { type: "string", title: "Hair color" },
                        shoulders: {
                            type: "object",
                            title: "Shoulders",
                            properties: {
                                left: { type: "string" },
                                right: { type: "string" }
                            }
                        }
                    }
                }
            }
        };

        const form = [
            {
                title: "Name",
                description: "Gimme yea name lad",
                schema: {
                    title: "Name",
                    description: "Gimme yea name lad",
                    type: "string"
                },
                key: ["name"],
                type: "text"
            },
            {
                title: "Choose",
                schema: {
                    title: "Choose",
                    type: "string",
                    enum: ["undefined", "null", "NaN"]
                },
                key: ["gender"],
                type: "select",
                titleMap: [
                    {
                        name: "undefined",
                        value: "undefined"
                    },
                    {
                        name: "null",
                        value: "null"
                    },
                    {
                        name: "NaN",
                        value: "NaN"
                    }
                ]
            },
            {
                title: "Are you over 18 years old?",
                schema: {
                    title: "Are you over 18 years old?",
                    type: "boolean",
                    default: false
                },
                key: ["overEighteen"],
                type: "checkbox"
            },
            {
                title: "attributes",
                schema: {
                    type: "object",
                    required: ["eyecolor"],
                    properties: {
                        eyecolor: {
                            type: "string",
                            title: "Eye color"
                        },
                        haircolor: {
                            type: "string",
                            title: "Hair color"
                        },
                        shoulders: {
                            type: "object",
                            title: "Shoulders",
                            properties: {
                                left: {
                                    type: "string"
                                },
                                right: {
                                    type: "string"
                                }
                            }
                        }
                    }
                },
                type: "fieldset",
                items: [
                    {
                        title: "Eye color",
                        required: true,
                        schema: {
                            type: "string",
                            title: "Eye color"
                        },
                        key: ["attributes", "eyecolor"],
                        type: "text"
                    },
                    {
                        title: "Hair color",
                        schema: {
                            type: "string",
                            title: "Hair color"
                        },
                        key: ["attributes", "haircolor"],
                        type: "text"
                    },
                    {
                        title: "Shoulders",
                        schema: {
                            type: "object",
                            title: "Shoulders",
                            properties: {
                                left: {
                                    type: "string"
                                },
                                right: {
                                    type: "string"
                                }
                            }
                        },
                        type: "fieldset",
                        items: [
                            {
                                title: "left",
                                schema: {
                                    type: "string"
                                },
                                key: ["attributes", "shoulders", "left"],
                                type: "text"
                            },
                            {
                                title: "right",
                                schema: {
                                    type: "string"
                                },
                                key: ["attributes", "shoulders", "right"],
                                type: "text"
                            }
                        ]
                    }
                ]
            }
        ];
        const f = utils.getDefaults(schema);
        expect(f.form).toEqual(form);
    });

    it("should handle global defaults", () => {
        const schema = {
            type: "object",
            properties: {
                name: {
                    title: "Name",
                    description: "Gimme yea name lad",
                    type: "string"
                }
            }
        };

        const form = [
            {
                title: "Name",
                description: "Gimme yea name lad",
                schema: {
                    title: "Name",
                    description: "Gimme yea name lad",
                    type: "string"
                },
                foo: "bar",
                key: ["name"],
                type: "text"
            }
        ];

        const f = utils.getDefaults(
            schema,
            {},
            { formDefaults: { foo: "bar" } }
        );
        expect(f.form).toEqual(form);
    });

    it("should handle x-schema-form defaults", () => {
        const schema = {
            type: "object",
            properties: {
                name: {
                    title: "Name",
                    description: "Gimme yea name lad",
                    type: "string",
                    "x-schema-form": {
                        type: "textarea"
                    }
                }
            }
        };
        const f = utils.getDefaults(schema, {});
        expect(f.form[0].type).toEqual("textarea");
    });

    it("should ignore parts of schema in ignore list", () => {
        const schema = {
            type: "object",
            properties: {
                name: {
                    title: "Name",
                    description: "Gimme yea name lad",
                    type: "string"
                },
                gender: {
                    title: "Choose",
                    type: "string",
                    enum: ["undefined", "null", "NaN"]
                }
            }
        };

        // no form is implicitly ['*']
        const defaults = utils.getDefaults(schema).form;
        expect(utils.merge(schema, ["*"], { gender: true })).toEqual([
            defaults[0]
        ]);
    });

    it("merges schema with different forms", () => {
        const schema = {
            type: "object",
            properties: {
                name: {
                    title: "Name",
                    description: "Gimme yea name lad",
                    type: "string"
                },
                gender: {
                    title: "Choose",
                    type: "string",
                    enum: ["undefined", "null", "NaN"]
                }
            }
        };

        // no form is implicitly ['*']
        const defaults = utils.getDefaults(schema).form;
        expect(utils.merge(schema)).toEqual(defaults);
        expect(utils.merge(schema, ["*"])).toEqual(defaults);
        expect(utils.merge(schema, ["*", { type: "fieldset" }])).toEqual(
            defaults.concat([{ type: "fieldset" }])
        );

        // simple form
        expect(utils.merge(schema, ["gender"])).toEqual([defaults[1]]);
        expect(utils.merge(schema, ["gender", "name"])).toEqual([
            defaults[1],
            defaults[0]
        ]);

        // change it up
        const f = _.cloneDeep(defaults[0]);
        f.title = "Foobar";
        f.type = "password";
        expect(
            utils.merge(schema, [
                { key: "name", title: "Foobar", type: "password" }
            ])
        ).toEqual([f]);
    });

    it("should translate readOnly in schema to readonly on the merged form defintion", () => {
        const schema = {
            type: "object",
            properties: {
                name: {
                    title: "Name",
                    description: "Gimme yea name lad",
                    type: "string"
                },
                gender: {
                    readOnly: true,
                    title: "Choose",
                    type: "string",
                    enum: ["undefined", "null", "NaN"]
                }
            }
        };

        const merged = utils.merge(schema, ["gender"]);
        expect(merged[0].readonly).toEqual(true);
    });

    it("should push readOnly in schema down into objects and arrays", () => {
        const schema = {
            type: "object",
            readOnly: true,
            properties: {
                sub: {
                    type: "object",
                    properties: {
                        array: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    foo: {
                                        type: "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };

        const merged = utils.merge(schema, ["*"]);

        // sub
        expect(merged[0].readonly).toEqual(true);

        // array
        expect(merged[0].items[0].readonly).toEqual(true);

        // array items
        expect(merged[0].items[0].items[0].readonly).toEqual(true);
    });

    it("should push readonly in form def down into objects and arrays", () => {
        const schema = {
            type: "object",
            properties: {
                sub: {
                    type: "object",
                    properties: {
                        array: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    foo: {
                                        type: "string"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };

        const merged = utils.merge(schema, [{ key: "sub", readonly: true }]);

        // sub
        expect(merged[0].readonly).toEqual(true);

        // array
        expect(merged[0].items[0].readonly).toEqual(true);

        // array items
        expect(merged[0].items[0].items[0].readonly).toEqual(true);
    });

    xit("should select and set into objects and arrays", () => {
        const schema = {
            key: ["comments"],
            add: "New",
            style: {
                add: "btn-success"
            },
            items: [
                {
                    key: ["comments", "", "name"],
                    title: "Name",
                    required: true,
                    schema: {
                        title: "Name",
                        type: "string"
                    },
                    type: "text"
                },
                {
                    key: ["comments", "", "email"],
                    title: "Email",
                    description: "Email will be used for evil.",
                    schema: {
                        title: "Email",
                        type: "string",
                        pattern: "^\\S+@\\S+$",
                        description: "Email will be used for evil."
                    },
                    type: "text"
                },
                {
                    key: ["comments", "", "spam"],
                    type: "checkbox",
                    title: "Yes I want spam.",
                    condition: "model.comments[arrayIndex].email",
                    schema: {
                        title: "Spam",
                        type: "boolean",
                        default: true
                    }
                },
                {
                    key: ["comments", "", "comment"],
                    type: "textarea",
                    title: "Comment",
                    required: true,
                    maxlength: 20,
                    validationMessage: "Don't be greedy!",
                    schema: {
                        title: "Comment",
                        type: "string",
                        maxLength: 20,
                        validationMessage: "Don't be greedy!"
                    }
                }
            ],
            title: "comments",
            required: true,
            schema: {
                type: "array",
                maxItems: 2,
                items: {
                    type: "object",
                    properties: {
                        name: {
                            title: "Name",
                            type: "string"
                        },
                        email: {
                            title: "Email",
                            type: "string",
                            pattern: "^\\S+@\\S+$",
                            description: "Email will be used for evil."
                        },
                        spam: {
                            title: "Spam",
                            type: "boolean",
                            default: true
                        },
                        comment: {
                            title: "Comment",
                            type: "string",
                            maxLength: 20,
                            validationMessage: "Don't be greedy!"
                        }
                    },
                    required: ["name", "comment"]
                }
            },
            type: "array"
        };

        // var list = utils.selectOrSet(schema, [{key: 'sub', readonly: true}]);
        const merged = utils.merge(schema, [{ key: "sub", readonly: true }]);
        // sub
        expect(merged[0].readonly).toEqual(true);

        // array
        expect(merged[0].items[0].readonly).toEqual(true);

        // array items
        expect(merged[0].items[0].items[0].readonly).toEqual(true);
    });

    it("selectOrSet test", () => {
        const result = {};
        utils.selectOrSet(["test", "tt"], result, "HI");
        expect(result.test.tt).toBe("HI");
        expect(utils.selectOrSet("test.tt", result)).toBe("HI");
        expect(utils.selectOrSet(["test", "tt"], result)).toBe("HI");

        utils.selectOrSet("my.test.fn", result, "Value");
        expect(result.my.test.fn).toBe("Value");
        expect(utils.selectOrSet("my.test.fn", result)).toBe("Value");
        expect(utils.selectOrSet(["my", "test", "fn"], result)).toBe("Value");

        utils.selectOrSet("number.is", result, 1326);
        expect(result.number.is).toBe(1326);
        expect(utils.selectOrSet("number.is", result)).toBe(1326);
        expect(utils.selectOrSet(["number", "is"], result)).toBe(1326);

        utils.selectOrSet("number.is", result, 1272);
        expect(result.number.is).toBe(1272);
        expect(utils.selectOrSet("number.is", result)).toBe(1272);
        expect(utils.selectOrSet(["number", "is"], result)).toBe(1272);
    });

    it("removeEmpty test", () => {
        const result = {
            test: undefined,
            value: null,
            str: "",
            nonEmptyStr: "test",
            obj: { test: undefined, str: "", value: null, obj: {} }
        };
        utils.removeEmpty(result);
        expect(result).toMatchObject({ obj: { obj: {} }, nonEmptyStr: "test" });
    });
});
