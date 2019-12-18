"use strict";

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = _interopRequireDefault(require("../utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by steve on 11/09/15.
 */
jest.dontMock("../utils");
jest.dontMock("lodash");
describe("utils", function () {
  it("gets defaults from schema and form", function () {
    var schema = {
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
          "enum": ["undefined", "null", "NaN"]
        },
        overEighteen: {
          title: "Are you over 18 years old?",
          type: "boolean",
          "default": false
        },
        attributes: {
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
        }
      }
    };
    var form = [{
      title: "Name",
      description: "Gimme yea name lad",
      schema: {
        title: "Name",
        description: "Gimme yea name lad",
        type: "string"
      },
      key: ["name"],
      type: "text"
    }, {
      title: "Choose",
      schema: {
        title: "Choose",
        type: "string",
        "enum": ["undefined", "null", "NaN"]
      },
      key: ["gender"],
      type: "select",
      titleMap: [{
        name: "undefined",
        value: "undefined"
      }, {
        name: "null",
        value: "null"
      }, {
        name: "NaN",
        value: "NaN"
      }]
    }, {
      title: "Are you over 18 years old?",
      schema: {
        title: "Are you over 18 years old?",
        type: "boolean",
        "default": false
      },
      key: ["overEighteen"],
      type: "checkbox"
    }, {
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
      items: [{
        title: "Eye color",
        required: true,
        schema: {
          type: "string",
          title: "Eye color"
        },
        key: ["attributes", "eyecolor"],
        type: "text"
      }, {
        title: "Hair color",
        schema: {
          type: "string",
          title: "Hair color"
        },
        key: ["attributes", "haircolor"],
        type: "text"
      }, {
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
        items: [{
          title: "left",
          schema: {
            type: "string"
          },
          key: ["attributes", "shoulders", "left"],
          type: "text"
        }, {
          title: "right",
          schema: {
            type: "string"
          },
          key: ["attributes", "shoulders", "right"],
          type: "text"
        }]
      }]
    }];

    var f = _utils["default"].getDefaults(schema);

    expect(f.form).toEqual(form);
  });
  it("should handle global defaults", function () {
    var schema = {
      type: "object",
      properties: {
        name: {
          title: "Name",
          description: "Gimme yea name lad",
          type: "string"
        }
      }
    };
    var form = [{
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
    }];

    var f = _utils["default"].getDefaults(schema, {}, {
      formDefaults: {
        foo: "bar"
      }
    });

    expect(f.form).toEqual(form);
  });
  it("should handle x-schema-form defaults", function () {
    var schema = {
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

    var f = _utils["default"].getDefaults(schema, {});

    expect(f.form[0].type).toEqual("textarea");
  });
  it("should ignore parts of schema in ignore list", function () {
    var schema = {
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
          "enum": ["undefined", "null", "NaN"]
        }
      }
    }; // no form is implicitly ['*']

    var defaults = _utils["default"].getDefaults(schema).form;

    expect(_utils["default"].merge(schema, ["*"], {
      gender: true
    })).toEqual([defaults[0]]);
  });
  it("merges schema with different forms", function () {
    var schema = {
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
          "enum": ["undefined", "null", "NaN"]
        }
      }
    }; // no form is implicitly ['*']

    var defaults = _utils["default"].getDefaults(schema).form;

    expect(_utils["default"].merge(schema)).toEqual(defaults);
    expect(_utils["default"].merge(schema, ["*"])).toEqual(defaults);
    expect(_utils["default"].merge(schema, ["*", {
      type: "fieldset"
    }])).toEqual(defaults.concat([{
      type: "fieldset"
    }])); // simple form

    expect(_utils["default"].merge(schema, ["gender"])).toEqual([defaults[1]]);
    expect(_utils["default"].merge(schema, ["gender", "name"])).toEqual([defaults[1], defaults[0]]); // change it up

    var f = _lodash["default"].cloneDeep(defaults[0]);

    f.title = "Foobar";
    f.type = "password";
    expect(_utils["default"].merge(schema, [{
      key: "name",
      title: "Foobar",
      type: "password"
    }])).toEqual([f]);
  });
  it("should translate readOnly in schema to readonly on the merged form defintion", function () {
    var schema = {
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
          "enum": ["undefined", "null", "NaN"]
        }
      }
    };

    var merged = _utils["default"].merge(schema, ["gender"]);

    expect(merged[0].readonly).toEqual(true);
  });
  it("should push readOnly in schema down into objects and arrays", function () {
    var schema = {
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

    var merged = _utils["default"].merge(schema, ["*"]); // sub


    expect(merged[0].readonly).toEqual(true); // array

    expect(merged[0].items[0].readonly).toEqual(true); // array items

    expect(merged[0].items[0].items[0].readonly).toEqual(true);
  });
  it("should push readonly in form def down into objects and arrays", function () {
    var schema = {
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

    var merged = _utils["default"].merge(schema, [{
      key: "sub",
      readonly: true
    }]); // sub


    expect(merged[0].readonly).toEqual(true); // array

    expect(merged[0].items[0].readonly).toEqual(true); // array items

    expect(merged[0].items[0].items[0].readonly).toEqual(true);
  });
  xit("should select and set into objects and arrays", function () {
    var schema = {
      key: ["comments"],
      add: "New",
      style: {
        add: "btn-success"
      },
      items: [{
        key: ["comments", "", "name"],
        title: "Name",
        required: true,
        schema: {
          title: "Name",
          type: "string"
        },
        type: "text"
      }, {
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
      }, {
        key: ["comments", "", "spam"],
        type: "checkbox",
        title: "Yes I want spam.",
        condition: "model.comments[arrayIndex].email",
        schema: {
          title: "Spam",
          type: "boolean",
          "default": true
        }
      }, {
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
      }],
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
              "default": true
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
    }; // var list = utils.selectOrSet(schema, [{key: 'sub', readonly: true}]);

    var merged = _utils["default"].merge(schema, [{
      key: "sub",
      readonly: true
    }]); // sub


    expect(merged[0].readonly).toEqual(true); // array

    expect(merged[0].items[0].readonly).toEqual(true); // array items

    expect(merged[0].items[0].items[0].readonly).toEqual(true);
  });
  it("selectOrSet test", function () {
    var result = {};

    _utils["default"].selectOrSet(["test", "tt"], result, "HI");

    expect(result.test.tt).toBe("HI");
    expect(_utils["default"].selectOrSet("test.tt", result)).toBe("HI");
    expect(_utils["default"].selectOrSet(["test", "tt"], result)).toBe("HI");

    _utils["default"].selectOrSet("my.test.fn", result, "Value");

    expect(result.my.test.fn).toBe("Value");
    expect(_utils["default"].selectOrSet("my.test.fn", result)).toBe("Value");
    expect(_utils["default"].selectOrSet(["my", "test", "fn"], result)).toBe("Value");

    _utils["default"].selectOrSet("number.is", result, 1326);

    expect(result.number.is).toBe(1326);
    expect(_utils["default"].selectOrSet("number.is", result)).toBe(1326);
    expect(_utils["default"].selectOrSet(["number", "is"], result)).toBe(1326);

    _utils["default"].selectOrSet("number.is", result, 1272);

    expect(result.number.is).toBe(1272);
    expect(_utils["default"].selectOrSet("number.is", result)).toBe(1272);
    expect(_utils["default"].selectOrSet(["number", "is"], result)).toBe(1272);
  });
  it("removeEmpty test", function () {
    var result = {
      test: undefined,
      value: null,
      str: "",
      nonEmptyStr: "test",
      obj: {
        test: undefined,
        str: "",
        value: null,
        obj: {}
      }
    };

    _utils["default"].removeEmpty(result);

    expect(result).toMatchObject({
      obj: {
        obj: {}
      },
      nonEmptyStr: "test"
    });
  });
});