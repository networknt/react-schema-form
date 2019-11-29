// @flow
/**
 * Created by steve on 15/09/15.
 */
import React, { Component } from "react";
import {
    Card,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup
} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import ComposedComponent from "./ComposedComponent";
import type { Localization } from "./types";

type Props = {
    model: any,
    form: {
        title: string,
        yesLabel: string,
        noLabel: string,
        clearButtonLabel: string,
        key: any,
        required?: boolean
    },
    value: any,
    setDefault: any,
    onChangeValidate: any,
    localization: Localization
};

type State = {
    yesChecked: boolean,
    noChecked: boolean
};

/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */
class TripleBoolean extends Component<Props, State> {
    static getDerivedStateFromProps(nextProps) {
        return {
            yesChecked: nextProps.value === "yes",
            noChecked: nextProps.value === "no"
        };
    }

    divStyle = {
        padding: "20px"
    };

    constructor(props) {
        super(props);
        this.state = {
            yesChecked: false,
            noChecked: false
        };

        const { model, form, value, setDefault } = this.props;
        const { key } = form;

        setDefault(key, model, form, value);
    }

    displaySwitch() {
        const {
            form: { title, yesLabel, noLabel, clearButtonLabel, required },
            onChangeValidate,
            value,
            localization: { getLocalizedString }
        } = this.props;
        const { yesChecked, noChecked } = this.state;
        return (
            <div style={this.divStyle}>
                <FormLabel required={required}>
                    {title && getLocalizedString(title)}
                </FormLabel>
                <br />
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onClick={e => {
                                    onChangeValidate(e, "yes");
                                }}
                                checked={yesChecked}
                            />
                        }
                        label={yesLabel ? getLocalizedString(yesLabel) : "Yes"}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                onClick={e => {
                                    onChangeValidate(e, "no");
                                }}
                                checked={noChecked}
                            />
                        }
                        label={noLabel ? getLocalizedString(noLabel) : "No"}
                    />
                </FormGroup>
                {value === "yes" || value === "no" ? (
                    <Button
                        id="temp"
                        variant="text"
                        color="primary"
                        onClick={e => onChangeValidate(e, "unanswered")}
                    >
                        {clearButtonLabel
                            ? getLocalizedString(clearButtonLabel)
                            : "clear response"}
                    </Button>
                ) : (
                    ""
                )}
            </div>
        );
    }

    render() {
        return <Card>{this.displaySwitch()}</Card>;
    }
}

export default ComposedComponent(TripleBoolean);
