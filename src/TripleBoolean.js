/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import Button from 'material-ui/RaisedButton';

/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */
class TripleBoolean extends React.Component {

    constructor(props) {
        super(props);

        const {model, form, value} = this.props;
        const {key} = form;

        this.props.setDefault(key, model, form, value)
    }

    displaySwitch() {
        let renderBlock = null;

        if(this.props.value === 'unanswered') renderBlock = (<div>
            <Button onClick={(e) => this.props.onChangeValidate(e,'yes')}>{'yes'}</Button>
            <Button onClick={(e) => this.props.onChangeValidate(e,'no')}>{'no'}</Button>
        </div>);
        else renderBlock = (<div>
            <Button>{this.props.value}</Button>
            <Button onClick={(e) => this.props.onChangeValidate(e,'unanswered')}>{'X'}</Button>
        </div>);

        return renderBlock;
    }

    render() {
        return  (
            <div className={this.props.form.htmlClass}>
                {this.props.form.title}:<br/>
                {this.displaySwitch()}
            </div>
        );
    }
}

export default ComposedComponent(TripleBoolean);
