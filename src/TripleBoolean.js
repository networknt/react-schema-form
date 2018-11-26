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
import ComposedComponent from "./ComposedComponent";

type Props = {
    model: any,
    form: any,
    value: any,
    setDefault: any,
    onChangeValidate: any
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
    state = {
        yesChecked: false,
        noChecked: false
    };

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

        const { model, form, value, setDefault } = this.props;
        const { key } = form;

        setDefault(key, model, form, value);
    }

    displaySwitch() {
        const { form, onChangeValidate, value } = this.props;
        const { yesChecked, noChecked } = this.state;
        return (
            <div style={this.divStyle}>
                {form.title}
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
                        label="Yes"
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
                        label="No"
                    />
                </FormGroup>
                {value === "yes" || value === "no" ? (
                    <Button
                        id="temp"
                        variant="text"
                        color="primary"
                        onClick={e => onChangeValidate(e, "unanswered")}
                    >
                        clear responce
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
