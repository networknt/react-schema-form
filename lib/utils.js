"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isObject = _interopRequireDefault(require("lodash/isObject"));

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var _extend = _interopRequireDefault(require("lodash/extend"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _objectpath = _interopRequireDefault(require("objectpath"));

var _tv = _interopRequireDefault(require("tv4"));

var _notevil = _interopRequireDefault(require("notevil"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Evaluates an expression in a safe way
var safeEval = function safeEval(condition, scope) {
  try {
    var scopeSafe = (0, _cloneDeep["default"])(scope);
    return (0, _notevil["default"])(condition, scopeSafe);
  } catch (error) {
    return undefined;
  }
};

var stripNullType = function stripNullType(type) {
  if (Array.isArray(type) && type.length === 2) {
    if (type[0] === "null") return type[1];
    if (type[1] === "null") return type[0];
  }

  return type;
}; // Creates an default titleMap list from an enum, i.e. a list of strings.


var enumToTitleMap = function enumToTitleMap(enm) {
  var titleMap = []; // canonical titleMap format is a list.

  enm.forEach(function (name) {
    titleMap.push({
      name: name,
      value: name
    });
  });
  return titleMap;
}; // Takes a titleMap in either object or list format and returns one in
// in the list format.


var canonicalTitleMap = function canonicalTitleMap(titleMap, originalEnum) {
  if (!originalEnum) return titleMap;
  var canonical = [];
  var enumValues = Object.keys(titleMap).length === 0 ? originalEnum : titleMap;
  originalEnum.forEach(function (value, idx) {
    canonical.push({
      name: enumValues[idx],
      value: value
    });
  });
  return canonical;
}; // Creates a form object with all common properties


var stdFormObj = function stdFormObj(name, schema, options) {
  options = options || {};
  var f = options.global && options.global.formDefaults ? (0, _cloneDeep["default"])(options.global.formDefaults) : {};

  if (options.global && options.global.supressPropertyTitles === true) {
    f.title = schema.title;
  } else {
    f.title = schema.title || name;
  }

  if (schema.description) {
    f.description = schema.description;
  }

  if (options.required === true || schema.required === true) {
    f.required = true;
  }

  if (schema.maxLength) {
    f.maxlength = schema.maxLength;
  }

  if (schema.minLength) {
    f.minlength = schema.minLength;
  }

  if (schema.readOnly || schema.readonly) {
    f.readonly = true;
  }

  if (schema.minimum) {
    f.minimum = schema.minimum + (schema.exclusiveMinimum ? 1 : 0);
  }

  if (schema.maximum) {
    f.maximum = schema.maximum - (schema.exclusiveMaximum ? 1 : 0);
  } // Non standard attributes (DONT USE DEPRECATED)
  // If you must set stuff like this in the schema use the x-schema-form attribute


  if (schema.validationMessage) {
    f.validationMessage = schema.validationMessage;
  }

  if (schema.enumNames) {
    f.titleMap = canonicalTitleMap(schema.enumNames, schema["enum"]);
  }

  f.schema = schema;
  return f;
};

var tBoolean = function tBoolean(name, schema, options) {
  if (stripNullType(schema.type) === "tBoolean" && !schema["enum"]) {
    var f = stdFormObj(name, schema, options);
    f.key = options.path;
    f.type = "tBoolean";
    options.lookup[_objectpath["default"].stringify(options.path)] = f;
    return f;
  }

  return undefined;
};

var text = function text(name, schema, options) {
  if (stripNullType(schema.type) === "string" && !schema["enum"]) {
    var f = stdFormObj(name, schema, options);
    f.key = options.path;
    f.type = "text";
    options.lookup[_objectpath["default"].stringify(options.path)] = f;
    return f;
  }

  return undefined;
}; // default in json form for number and integer is a text field
// input type="number" would be more suitable don't ya think?


var number = function number(name, schema, options) {
  if (stripNullType(schema.type) === "number") {
    var f = stdFormObj(name, schema, options);
    f.key = options.path;
    f.type = "number";
    options.lookup[_objectpath["default"].stringify(options.path)] = f;
    return f;
  }

  return undefined;
};

var integer = function integer(name, schema, options) {
  if (stripNullType(schema.type) === "integer") {
    var f = stdFormObj(name, schema, options);
    f.key = options.path;
    f.type = "number";
    options.lookup[_objectpath["default"].stringify(options.path)] = f;
    return f;
  }

  return undefined;
};

var date = function date(name, schema, options) {
  if (stripNullType(schema.type) === "date") {
    var f = stdFormObj(name, schema, options);
    f.key = options.path;
    f.type = "date";
    options.lookup[_objectpath["default"].stringify(options.path)] = f;
    return f;
  }

  return undefined;
};

var checkbox = function checkbox(name, schema, options) {
  if (stripNullType(schema.type) === "boolean") {
    var f = stdFormObj(name, schema, options);
    f.key = options.path;
    f.type = "checkbox";
    options.lookup[_objectpath["default"].stringify(options.path)] = f;
    return f;
  }

  return undefined;
};

var select = function select(name, schema, options) {
  if (stripNullType(schema.type) === "string" && schema["enum"]) {
    var f = stdFormObj(name, schema, options);
    f.key = options.path;
    f.type = "select";

    if (!f.titleMap && !schema.isObject) {
      f.titleMap = enumToTitleMap(schema["enum"]);
    }

    options.lookup[_objectpath["default"].stringify(options.path)] = f;
    return f;
  }

  return undefined;
};

var removeEmpty = function removeEmpty(obj) {
  return Object.entries(obj).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];

    if (val && _typeof(val) === "object") removeEmpty(val); // eslint-disable-next-line no-param-reassign
    else if (!val || val === null || val === "") delete obj[key];
  });
};

var checkboxes = function checkboxes(name, schema, options) {
  if (stripNullType(schema.type) === "array" && schema.items && schema.items["enum"]) {
    var f = stdFormObj(name, schema, options);
    f.key = options.path;
    f.type = "checkboxes";

    if (!f.titleMap) {
      f.titleMap = enumToTitleMap(schema.items["enum"]);
    }

    options.lookup[_objectpath["default"].stringify(options.path)] = f;
    return f;
  }

  return undefined;
};

var defaultFormDefinition = function defaultFormDefinition(name, schema, options) {
  // eslint-disable-next-line no-use-before-define
  var rules = defaults[stripNullType(schema.type)];

  if (rules) {
    var def;

    for (var i = 0; i < rules.length; i += 1) {
      def = rules[i](name, schema, options); // first handler in list that actually returns something is our handler!

      if (def) {
        // Do we have form defaults in the schema under the x-schema-form-attribute?
        if (def.schema["x-schema-form"] && (0, _isObject["default"])(def.schema["x-schema-form"])) {
          def = (0, _extend["default"])(def, def.schema["x-schema-form"]);
        }

        return def;
      }
    }
  }

  return undefined;
};

var fieldset = function fieldset(name, schema, options) {
  if (stripNullType(schema.type) === "object") {
    var f = stdFormObj(name, schema, options);
    f.type = "fieldset";
    f.items = [];
    options.lookup[_objectpath["default"].stringify(options.path)] = f; // recurse down into properties

    if (schema.properties) {
      Object.keys(schema.properties).forEach(function (key) {
        if (Object.prototype.hasOwnProperty.call(schema.properties, key)) {
          var path = options.path.slice();
          path.push(key);

          if (options.ignore[_objectpath["default"].stringify(path)] !== true) {
            var required = schema.required && schema.required.indexOf(key) !== -1;
            var def = defaultFormDefinition(key, schema.properties[key], {
              path: path,
              required: required || false,
              lookup: options.lookup,
              ignore: options.ignore,
              global: options.global
            });

            if (def) {
              f.items.push(def);
            }
          }
        }
      });
    }

    return f;
  }

  return undefined;
};

var tuple = function tuple(name, schema, options) {
  if (stripNullType(schema.type) === "array") {
    var f = stdFormObj(name, schema, options);
    f.type = "tuple";
    f.key = options.path;
    options.lookup[_objectpath["default"].stringify(options.path)] = f;

    if (Array.isArray(schema.items)) {
      var required = schema.required && schema.required.indexOf(options.path[options.path.length - 1]);
      f.items = schema.items.reduce(function (items, item, index) {
        var arrPath = options.path.slice();
        arrPath.push(index);
        var def = defaultFormDefinition(name, item, {
          path: arrPath,
          required: required || false,
          lookup: options.lookup,
          ignore: options.ignore,
          global: options.global
        });

        if (def) {
          items.push(def);
        }

        return items;
      }, []);
      return f;
    }
  }

  return undefined;
};

var array = function array(name, schema, options) {
  if (stripNullType(schema.type) === "array") {
    var f = stdFormObj(name, schema, options);
    f.type = "array";
    f.key = options.path;
    options.lookup[_objectpath["default"].stringify(options.path)] = f; // don't do anything if items is not defined.

    if (typeof schema.items !== "undefined") {
      var required = schema.required && schema.required.indexOf(options.path[options.path.length - 1]) !== -1; // The default is to always just create one child. This works since if the
      // schemas items declaration is of type: "object" then we get a fieldset.
      // We also follow json form notatation, adding empty brackets "[]" to
      // signify arrays.

      var arrPath = options.path.slice();
      arrPath.push("");
      var def = defaultFormDefinition(name, schema.items, {
        path: arrPath,
        required: required || false,
        lookup: options.lookup,
        ignore: options.ignore,
        global: options.global
      });

      if (def) {
        f.items = [def];
      } else {
        // This is the case that item only contains key value pair for rc-select multipel
        f.items = schema.items;
      }
    }

    return f;
  }

  return undefined;
};

var defaults = {
  string: [select, text],
  object: [fieldset],
  number: [number],
  integer: [integer],
  "boolean": [checkbox],
  array: [checkboxes, tuple, array],
  date: [date],
  tBoolean: [tBoolean]
};

var getDefaults = function getDefaults(schema, ignore, globalOptions) {
  var form = [];
  var lookup = {}; // Map path => form obj for fast lookup in merging

  ignore = ignore || {};
  globalOptions = globalOptions || {};

  if (stripNullType(schema.type) === "object") {
    if (schema.properties) {
      Object.keys(schema.properties).forEach(function (key) {
        if (Object.prototype.hasOwnProperty.call(schema.properties, key)) {
          if (ignore[key] !== true) {
            var required = schema.required && schema.required.indexOf(key) !== -1;
            var def = defaultFormDefinition(key, schema.properties[key], {
              path: [key],
              // Path to this property in bracket notation.
              lookup: lookup,
              // Extra map to register with. Optimization for merger.
              ignore: ignore,
              // The ignore list of paths (sans root level name)
              required: required,
              // Is it required? (v4 json schema style)
              global: globalOptions // Global options, including form defaults

            });

            if (def) {
              form.push(def);
            }
          }
        }
      });
    }
  } else {
    throw new Error('Not implemented. Only type "object" allowed at root level of schema.');
  }

  return {
    form: form,
    lookup: lookup
  };
};

var postProcessFn = function postProcessFn(form) {
  return form;
};
/**
 * Append default form rule
 * @param {string}   type json schema type
 * @param {Function} rule a function(propertyName,propertySchema,options) that returns a form
 *                        definition or undefined
 */


var appendRule = function appendRule(type, rule) {
  if (!defaults[type]) {
    defaults[type] = [];
  }

  defaults[type].push(rule);
};
/**
 * Prepend default form rule
 * @param {string}   type json schema type
 * @param {Function} rule a function(propertyName,propertySchema,options) that returns a form
 *                        definition or undefined
 */


var prependRule = function prependRule(type, rule) {
  if (!defaults[type]) {
    defaults[type] = [];
  }

  defaults[type].unshift(rule);
}; // Utility functions

/**
 * Traverse a schema, applying a function(schema,path) on every sub schema
 * i.e. every property of an object.
 */


var traverseSchema = function traverseSchema(schema, fn, path, ignoreArrays) {
  ignoreArrays = typeof ignoreArrays !== "undefined" ? ignoreArrays : true;
  path = path || [];

  var traverse = function traverse(innerSchema, innerFunc, innerPath) {
    innerFunc(innerSchema, innerPath);

    if (innerSchema.properties) {
      Object.keys(innerSchema.properties).forEach(function (key) {
        if (Object.prototype.hasOwnProperty.call(innerSchema.properties, key)) {
          var currentPath = innerPath.slice();
          currentPath.push(key);
          traverse(innerSchema.properties[key], innerFunc, currentPath);
        }
      });
    } // Only support type "array" which have a schema as "items".


    if (!ignoreArrays && innerSchema.items) {
      var arrPath = innerPath.slice();
      arrPath.push("");
      traverse(innerSchema.items, innerFunc, arrPath);
    }
  };

  traverse(schema, fn, path || []);
};

var traverseForm = function traverseForm(form, fn) {
  fn(form);

  if (form.items) {
    form.items.forEach(function (f) {
      traverseForm(f, fn);
    });
  }

  if (form.tabs) {
    form.tabs.forEach(function (tab) {
      tab.items.forEach(function (f) {
        traverseForm(f, fn);
      });
    });
  }
};

var merge = function merge(schema, form, ignore, options, readonly) {
  form = form || ["*"];
  options = options || {}; // Get readonly from root object

  readonly = readonly || schema.readonly || schema.readOnly;
  var stdForm = getDefaults(schema, ignore, options); // simple case, we have a "*", just put the stdForm there

  var idx = form.indexOf("*");

  if (idx !== -1) {
    form = form.slice(0, idx).concat(stdForm.form).concat(form.slice(idx + 1));
  } // ok let's merge!
  // We look at the supplied form and extend it with schema standards


  var lookup = stdForm.lookup;
  return postProcessFn(form.map(function (obj) {
    // handle the shortcut with just a name
    if (typeof obj === "string") {
      obj = {
        key: obj
      };
    }

    if (obj.key) {
      if (typeof obj.key === "string") {
        obj.key = _objectpath["default"].parse(obj.key);
      }
    }

    if (obj.itemForm) {
      obj.items = [];

      var str = _objectpath["default"].stringify(obj.key);

      var foundForm = lookup[str];
      foundForm.items.forEach(function (item) {
        var o = (0, _cloneDeep["default"])(obj.itemForm);
        o.key = item.key;
        obj.items.push(o);
      });
    } // extend with std form from schema.


    if (obj.key) {
      var strid = _objectpath["default"].stringify(obj.key);

      if (lookup[strid]) {
        var schemaDefaults = lookup[strid];
        Object.keys(schemaDefaults).forEach(function (key) {
          if (Object.prototype.hasOwnProperty.call(schemaDefaults, key)) {
            if (obj[key] === undefined) {
              obj[key] = schemaDefaults[key];
            }
          }
        });
      }
    } // Are we inheriting readonly?


    if (readonly === true) {
      // Inheriting false is not cool.
      obj.readonly = true;
    } // if it's a type with items, merge 'em!


    if (obj.items && obj.items.length > 0) {
      obj.items = merge(schema, obj.items, ignore, options, obj.readonly);
    } // if its has tabs, merge them also!


    if (obj.tabs) {
      obj.tabs.forEach(function (tab) {
        tab.items = merge(schema, tab.items, ignore, options, obj.readonly);
      });
    } // Special case: checkbox
    // Since have to ternary state we need a default


    if (obj.type === "checkbox" && (0, _isUndefined["default"])(obj.schema["default"])) {
      obj.schema["default"] = false;
    }

    return obj;
  }));
};

function selectOrSet(projection, obj, valueToSet, type) {
  var numRe = /^\d+$/;

  if (!obj) {
    obj = this;
  } // Support [] array syntax


  var parts = typeof projection === "string" ? _objectpath["default"].parse(projection) : projection;

  if (typeof valueToSet !== "undefined" && parts.length === 1) {
    // special case, just setting one variable
    obj[parts[0]] = valueToSet;
    return obj;
  }

  if (typeof valueToSet !== "undefined" && typeof obj[parts[0]] === "undefined") {
    // We need to look ahead to check if array is appropriate
    obj[parts[0]] = parts.length >= 2 && numRe.test(parts[1]) ? [] : {};
  }

  if (typeof type !== "undefined" && ["number", "integer"].indexOf(type) > -1 && typeof valueToSet === "undefined") {
    // number or integer can undefined
    obj[parts[0]] = valueToSet;
    return obj;
  }

  var value = obj[parts[0]];

  for (var i = 1; i < parts.length; i += 1) {
    // Special case: We allow JSON Form syntax for arrays using empty brackets
    // These will of course not work here so we exit if they are found.
    if (parts[i] === "") {
      return undefined;
    }

    if (typeof valueToSet !== "undefined") {
      if (i === parts.length - 1) {
        // last step. Let's set the value
        value[parts[i]] = valueToSet;
        return valueToSet;
      } // Make sure to create new objects on the way if they are not there.
      // We need to look ahead to check if array is appropriate


      var tmp = value[parts[i]];

      if (typeof tmp === "undefined" || tmp === null) {
        tmp = numRe.test(parts[i + 1]) ? [] : {};
        value[parts[i]] = tmp;
      }

      value = tmp;
    } else if (value) {
      // Just get nex value.
      value = value[parts[i]];
    }
  }

  return value;
}

var validateBySchema = function validateBySchema(schema, value) {
  return _tv["default"].validateResult(value, schema);
};

var validate = function validate(form, value, getLocalizedString) {
  if (!form) {
    return {
      valid: true
    };
  }

  var schema = form.schema;

  if (!schema) {
    return {
      valid: true
    };
  } // Input of type text and textareas will give us a viewValue of ''
  // when empty, this is a valid value in a schema and does not count as something
  // that breaks validation of 'required'. But for our own sanity an empty field should
  // not validate if it's required.


  if (value === "") {
    value = undefined;
  } // Numbers fields will give a null value, which also means empty field


  if (form.type === "number" && value === null) {
    value = undefined;
  }

  if (form.type === "number" && Number.isNaN(parseFloat(value))) {
    value = undefined;
  } // Version 4 of JSON Schema has the required property not on the
  // property itself but on the wrapping object. Since we like to test
  // only this property we wrap it in a fake object.


  var wrap = {
    type: "object",
    properties: {}
  };
  var propName = form.key[form.key.length - 1];
  wrap.properties[propName] = schema;

  if (form.required) {
    wrap.required = [propName];
  }

  var valueWrap = {};

  if (typeof value !== "undefined") {
    valueWrap[propName] = value;
  }

  var tv4Result = _tv["default"].validateResult(valueWrap, wrap);

  if (tv4Result != null && !tv4Result.valid && form.validationMessage != null && typeof value !== "undefined") {
    tv4Result.error.message = getLocalizedString ? getLocalizedString(form.validationMessage) : form.validationMessage;
  }

  return tv4Result;
};

var getValueFromModel = function getValueFromModel(model, key) {
  var result;

  if (Array.isArray(key)) {
    key.reduce(function (cur, nxt) {
      return cur && cur[nxt];
    }, model);
    result = key.reduce(function (cur, nxt) {
      return cur && cur[nxt];
    }, model);
  } else {
    result = model[key];
  }

  return result;
};

var getTitleByValue = function getTitleByValue(titleMap, value) {
  for (var i = 0; i < titleMap.length; i += 1) {
    var item = titleMap[i];
    if (item.value === value) return item.name;
  }

  return undefined;
};

var _default = {
  traverseForm: traverseForm,
  traverseSchema: traverseSchema,
  prependRule: prependRule,
  appendRule: appendRule,
  postProcessFn: postProcessFn,
  getDefaults: getDefaults,
  defaultFormDefinition: defaultFormDefinition,
  defaults: defaults,
  array: array,
  fieldset: fieldset,
  checkboxes: checkboxes,
  select: select,
  checkbox: checkbox,
  integer: integer,
  number: number,
  text: text,
  stdFormObj: stdFormObj,
  canonicalTitleMap: canonicalTitleMap,
  enumToTitleMap: enumToTitleMap,
  stripNullType: stripNullType,
  merge: merge,
  validate: validate,
  validateBySchema: validateBySchema,
  safeEval: safeEval,
  selectOrSet: selectOrSet,
  getValueFromModel: getValueFromModel,
  getTitleByValue: getTitleByValue,
  removeEmpty: removeEmpty
};
exports["default"] = _default;