/**
 * Created by steve on 20/09/15.
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import Checkbox from 'material-ui/Checkbox';

class Checkbox2 extends React.Component {

    constructor (props) {
        super(props);
        const {model, form} = this.props;
        const {key} = form;

        const storedValue = (!_.isNil(this.props.value) && _.isBoolean(this.props.value) )? this.props.value : undefined;
        const defaultValue = (!_.isNil(form.schema.default) && _.isBoolean(form.schema.default))? form.schema.default : undefined;
        const value =  storedValue || defaultValue;

        this.props.setDefault(key, model, form, value)
        this.state = {
            currentValue: value,
        };
    }

    render() {

        console.log(this.state.currentValue);

        return (
            <div className={this.props.form.className}>
                <Checkbox
                    name={this.props.form.key.slice(-1)[0]}
                    value={this.props.form.key.slice(-1)[0]}
                    checked={this.state.currentValue}
                    label={this.props.form.title}
                    disabled={this.props.form.readonly}
                    onCheck={(e, checked) => {this.props.onChangeValidate(e)}}
                    />
             </div>
        );
    }
}

export default ComposedComponent(Checkbox2);
