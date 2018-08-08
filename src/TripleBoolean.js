/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import {Card, 
        Button, 
        Checkbox,
        FormControlLabel,
        FormGroup } from '@material-ui/core';
// import { withStyles } from 'material-ui/styles';
// import Typography from 'material-ui/styles/typography';

/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */
class TripleBoolean extends React.Component {

    state = {
        yesChecked: false,
        noChecked: false,
    }

    constructor(props) {
        super(props);

        const {model, form, value} = this.props;
        const {key} = form;

        console.log(React.version);

        this.props.setDefault(key, model, form, value);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            yesChecked: nextProps.value === "yes",
            noChecked: nextProps.value === "no",
        });
    }

    divStyle = {
        padding: "20px",
    }

    butStyle = {
        color: "#07f",
    }

    displaySwitch() {
        let renderBlock = null;

        renderBlock = <div style={this.divStyle}>
            {this.props.form.title}<br/>
            <FormGroup >
                <FormControlLabel control={
                        <Checkbox onClick={(e) => {this.props.onChangeValidate(e,'yes')}}
                            checked={this.state.yesChecked}
                        />}
                        label='Yes'
                />
                <FormControlLabel control={
                        <Checkbox onClick={(e) => {this.props.onChangeValidate(e,'no')}}
                            checked={this.state.noChecked}
                        />}
                        label='No'
                />
            </FormGroup>
             {this.props.value === 'yes' || this.props.value === 'no' ? 
                <Button variant='raised' color='primary'
                    onClick={(e) => this.props.onChangeValidate(e,'unanswered')}>clear responce</Button> : ''}
        </div>;

        return renderBlock;
    }

    render() {
        return  (
            <Card>
                {this.displaySwitch()}
            </Card>
        );
    }
}

export default ComposedComponent(TripleBoolean);
