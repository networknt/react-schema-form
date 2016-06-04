/**
 * Created by steve on 20/09/15.
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import {Checkbox as Switch} from 'material-ui/Checkbox';

class Checkbox extends React.Component {
    render() {
        return (
            <Switch
                name={this.props.form.key.slice(-1)[0]}
                value={this.props.form.key.slice(-1)[0]}
                defaultChecked={this.props.value || false}
                label={this.props.form.title}
                disabled={this.props.form.readonly}
                onCheck={(e, checked) => {this.props.onChangeValidate(e)}}
                />
        );
    }
}

export default ComposedComponent(Checkbox);
