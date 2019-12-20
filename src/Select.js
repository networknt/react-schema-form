// @flow
import React, { Component } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import MuiSelect from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import ComposedComponent from "./ComposedComponent";
import utils from "./utils";
import type { Localization } from "./types";

type Props = {
    model: any,
    form: any,
    onChangeValidate: any,
    localization: Localization,
    onChange: any,
    error: any
};

type State = {
    currentValue: any
};

class Select extends Component<Props, State> {
    constructor(props) {
        super(props);
        const { model, form } = this.props;
        const defaultValue =
            form && form.selectProps && form.selectProps.multiple ? [] : "";
        this.state = {
            currentValue:
                utils.getValueFromModel(model, form.key) || defaultValue
        };
    }

    static getDerivedStateFromProps(props: Props) {
        const { form, model } = props;
        if (model && form.key) {
            return {
                currentValue: utils.getValueFromModel(model, form.key)
            };
        }
        return null;
    }

    onSelected = event => {
        const {
            onChangeValidate,
            onChange,
            form: {
                key,
                schema: { isObject, enum: values, findFn }
            }
        } = this.props;
        const currentValue = event.target.value;
        this.setState({ currentValue });
        if (isObject) {
            const item = values.find(each =>
                findFn ? findFn(each, currentValue) : each === currentValue
            );
            onChange(key, item);
        } else {
            onChangeValidate(event);
        }
    };

    getLabel = each => {
        const {
            form: {
                schema: { displayFn, noLocalization }
            },
            localization: { getLocalizedString }
        } = this.props;
        if (displayFn) {
            return displayFn(each);
        }
        if (noLocalization) return each.name;
        return getLocalizedString(each.name);
    };

    render() {
        const {
            form,
            error,
            localization: { getLocalizedString }
        } = this.props;
        const { currentValue } = this.state;
        let menuItems = [];
        if (form.schema.isObject) {
            menuItems = form.schema.enum.map((item, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <MenuItem key={idx} value={item}>
                    {this.getLabel(item)}
                </MenuItem>
            ));
        } else {
            menuItems = form.titleMap.map((item, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <MenuItem key={idx} value={item.value}>
                    {this.getLabel(item)}
                </MenuItem>
            ));
        }

        return (
            <FormControl fullWidth error={!!error} {...form.otherProps}>
                <InputLabel required={form.required} {...form.labelProps}>
                    {form.title && getLocalizedString(form.title)}
                </InputLabel>
                <MuiSelect
                    value={currentValue || ""}
                    placeholder={
                        form.placeholder && getLocalizedString(form.placeholder)
                    }
                    disabled={form.readonly}
                    onChange={this.onSelected}
                    {...form.selectProps}
                >
                    {menuItems}
                </MuiSelect>
                <FormHelperText {...form.helperTextProps}>
                    {(error || form.description) &&
                        getLocalizedString(error || form.description)}
                </FormHelperText>
            </FormControl>
        );
    }
}

export default ComposedComponent(Select);
