/**
 * Created by steve on 20/09/15.
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import Checkbox from 'material-ui/Checkbox';

class Checkbox2 extends React.Component {
    render() {
        return (
            <div className={this.props.form.className}>
                <Checkbox
                    name={this.props.form.key.slice(-1)[0]}
                    value={this.props.form.key.slice(-1)[0]}
                    checked={this.props.value || false}
                    label={this.props.form.title}
                    disabled={this.props.form.readonly}
                    onCheck={(e, checked) => {this.props.onChangeValidate(e)}}
                    />
             </div>
        );
    }
}

export default ComposedComponent(Checkbox2);
