// @flow
import React, { Component } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import MuiSelect from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import ComposedComponent from "./ComposedComponent";
import { getValueFromModel } from "./utils";

type Props = {
    model: any,
    form: any,
    onChangeValidate: any
};

type State = {
    currentValue: any
};

class Select extends Component<Props, State> {
    constructor(props) {
        super(props);
        const { model, form } = this.props;
        this.state = {
            currentValue: getValueFromModel(model, form.key) || ""
        };
    }

    static getDerivedStateFromProps(props) {
        if (props.model && props.form.key) {
            return {
                currentValue: getValueFromModel(props.model, props.form.key)
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
        const { form } = this.props;
        const { currentValue } = this.state;
        const menuItems = form.titleMap.map((item, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <MenuItem key={idx} value={item.value}>
                {item.name}
            </MenuItem>
        ));
        return (
            <FormControl fullWidth>
                <InputLabel>{form.title}</InputLabel>
                <MuiSelect
                    value={currentValue || ""}
                    placeholder={form.title}
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
