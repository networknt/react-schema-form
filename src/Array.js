// @flow
/**
 * Created by steve on 11/09/15.
 */
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import cloneDeep from "lodash/cloneDeep";
import utils from "./utils";
import ComposedComponent from "./ComposedComponent";

const styles = theme => ({
    arrayItem: {
        position: "relative",
        padding: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        display: "flex"
    },
    deleteItemButton: {
        margin: [[-theme.spacing.unit, -theme.spacing.unit, "auto", "auto"]]
    },
    addButton: {
        marginTop: theme.spacing.unit
    }
});

type Props = {
    form: any,
    model: any,
    classes: any,
    builder: any,
    mapper: any,
    options: any,
    onChangeValidate: any,
    onChange: any
};

type State = {
    model: any
};

class Array extends Component<Props, State> {
    static ITEM_ID = "_SCHEMAFORM_ITEM_ID";

    static SEQUENCE = 1;

    static assignItemId(item) {
        if (item && typeof item === "object" && !item[Array.ITEM_ID]) {
            const newItem = Object.assign({}, item);
            // define hidden property with internal id
            Object.defineProperty(newItem, Array.ITEM_ID, {
                enumerable: false,
                writable: true
            });
            Array.SEQUENCE += 1;
            newItem[Array.ITEM_ID] = Array.SEQUENCE;
            return newItem;
        }
        return item;
    }

    static setIndex = index => form => {
        if (form.key) {
            // todo fix mutable object
            // eslint-disable-next-line no-param-reassign
            form.key[form.key.indexOf("")] = index;
        }
    };

    static copyWithIndex = (form, index) => {
        const copy = cloneDeep(form);
        copy.arrayIndex = index;
        utils.traverseForm(copy, Array.setIndex(index));
        return copy;
    };

    constructor(props) {
        super(props);
        const { form, model } = this.props;
        // we have the model here for the entire form, get the model for this array only
        // and add to the state. if is empty, add an entry by calling onAppend directly.
        this.state = {
            model: utils.selectOrSet(form.key, model) || []
        };
    }

    static getDerivedStateFromProps(props, state) {
        const propsKey = props.form.key;
        if (
            props.form &&
            propsKey === state.formKey &&
            props.model &&
            props.model[propsKey] === state.model
        ) {
            return null; // nothing changed
        }
        const model = utils.selectOrSet(propsKey, props.model) || [];
        return {
            formKey: propsKey,
            model: model.map(Array.assignItemId)
        };
    }

    componentDidMount() {
        const { form, model } = this.props;
        // Always start with one empty form unless configured otherwise.
        if (form.startEmpty !== true && model.length === 0) {
            this.onAppend();
        }
    }

    onAppend = () => {
        const { form, options, onChangeValidate } = this.props;
        const { model } = this.state;
        let empty;
        if (form && form.schema && form.schema.items) {
            const { items } = form.schema;
            if (items.type && items.type.indexOf("object") !== -1) {
                empty = {};

                // Check for possible defaults
                if (!options || options.setSchemaDefaults !== false) {
                    empty =
                        typeof items.default !== "undefined"
                            ? items.default
                            : empty;

                    // Check for defaults further down in the schema.
                    // If the default instance sets the new array item to something falsy, i.e. null
                    // then there is no need to go further down.
                    if (empty) {
                        utils.traverseSchema(items, (prop, path) => {
                            if (typeof prop.default !== "undefined") {
                                utils.selectOrSet(path, empty, prop.default);
                            }
                        });
                    }
                }
            } else if (items.type && items.type.indexOf("array") !== -1) {
                empty = [];
                if (!options || options.setSchemaDefaults !== false) {
                    empty = items.default || empty;
                }
            } else if (!options || options.setSchemaDefaults !== false) {
                // No type? could still have defaults.
                empty = items.default || empty;
            }
        }
        const newModel = model;
        Array.assignItemId(empty);
        newModel.push(empty);
        this.setState({
            model: newModel
        });
        onChangeValidate(model);
    };

    onDelete = index => () => {
        const { model } = this.state;
        const { onChangeValidate } = this.props;
        const newModel = model;
        newModel.splice(index, 1);
        this.setState({
            model: newModel
        });
        onChangeValidate(model);
    };

    render() {
        const { classes, form, builder, model, mapper, onChange } = this.props;
        const { model: stateModel } = this.state;
        const arrays = [];
        for (let i = 0; i < stateModel.length; i += 1) {
            const item = stateModel[i];
            const forms = form.items.map((eachForm, index) => {
                const copy = Array.copyWithIndex(eachForm, i);
                return builder(copy, model, index, mapper, onChange, builder);
            });
            arrays.push(
                <Card
                    className={classes.arrayItem}
                    key={(item && item[Array.ITEM_ID]) || i}
                >
                    <div>{forms}</div>
                    <IconButton
                        onClick={this.onDelete(i)}
                        className={classes.deleteItemButton}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Card>
            );
        }
        return (
            <div>
                <div>
                    <Typography variant="h6">{form.title}</Typography>
                    <div>{arrays}</div>
                </div>
                <Button
                    className={classes.addButton}
                    variant="contained"
                    color="primary"
                    onClick={this.onAppend}
                >
                    {form.add || "Add"}
                </Button>
            </div>
        );
    }
}

export default ComposedComponent(withStyles(styles)(Array));
