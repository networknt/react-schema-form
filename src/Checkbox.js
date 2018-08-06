/**
 * Created by steve on 20/09/15.
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import Checkbox from 'material-ui/Checkbox';

const styles = {
    error: {
        color: 'rgb(244, 67, 54)',
        fontSize: '12px',
        lineHeight: '12px',
    },
    checkbox: {
        marginTop: '14px',
        marginBottom: '0px',
        height: '72px',
    },
};

class Checkbox2 extends React.Component {

    constructor (props) {
        super(props);
        const {model, form} = this.props;
        const {key} = form;
        //If a boolean is stored, use it; if not, if a boolean is defined as schema's default, use it.
        const value = _.isBoolean(this.props.value)? this.props.value : (_.isBoolean(form.schema.default)? form.schema.default : undefined);
        this.props.setDefault(key, model, form, value)
    }

    render() {
        return (
            <div className={this.props.form.className} style={styles.checkbox}>
                <Checkbox
                    name={this.props.form.key.slice(-1)[0]}
                    value={this.props.form.key.slice(-1)[0]}
                    checked={this.props.value}
                    label={this.props.form.title}
                    disabled={this.props.form.readonly}
                    onCheck={(e, checked) => {this.props.onChangeValidate(e)}}
                    />
                <span style={styles.error}>{this.props.errorText}</span>
             </div>
        );
    }
}

export default ComposedComponent(Checkbox2);
