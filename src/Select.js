// @flow
import React, { Component } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import MuiSelect from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import ComposedComponent from "./ComposedComponent";
import utils from "./utils";
import type { Localization } from "./types";

type Props = {
    model: any,
    form: any,
    onChangeValidate: any,
    localization: Localization
};

type State = {
    currentValue: any
};

class Select extends Component<Props, State> {
    constructor(props) {
        super(props);
        const { model, form } = this.props;
        this.state = {
            currentValue: utils.getValueFromModel(model, form.key) || ""
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
        const { onChangeValidate } = this.props;
        const currentValue = event.target.value;
        this.setState({ currentValue });
        onChangeValidate(event);
    };

    render() {
        const {
            form,
            localization: { getLocalizedString }
        } = this.props;
        const { currentValue } = this.state;
        const menuItems = form.titleMap.map((item, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <MenuItem key={idx} value={item.value}>
                {item.name && getLocalizedString(item.name)}
            </MenuItem>
        ));
        return (
            <FormControl fullWidth>
                <InputLabel required={form.required}>
                    {form.title && getLocalizedString(form.title)}
                </InputLabel>
                <MuiSelect
                    value={currentValue || ""}
                    placeholder={
                        form.placeholder && getLocalizedString(form.placeholder)
                    }
                    disabled={form.readonly}
                    onChange={this.onSelected}
                >
                    {menuItems}
                </MuiSelect>
            </FormControl>
        );
    }
}

export default ComposedComponent(Select);
