/**
 * Created by steve on 11/09/15.
 */
import React from 'react';
import utils from './utils';
import Number from './Number';
import Text from './Text';
import TextArea from './TextArea';
import Select from './Select';
import Radios from './Radios';
import Date from './Date';
import Checkbox from './Checkbox';
import Help from './Help';
import RaisedButton from 'material-ui/lib/raised-button';
import _ from 'lodash';

class FieldSet extends React.Component {

    render() {
        //console.log('FieldSet.render', this.props);
        // now render all the items in the fieldset
        let forms = this.props.form.items.map(function(form, index){
            return this.props.builder(form, this.props.model, index, this.props.onChange, this.props.mapper, this.props.builder);
        }.bind(this));

        return (
            <div>
                <div>
                    <strong>{this.props.form.title}</strong>
                </div>
                <div>
                    {forms}
                </div>
            </div>
        );
    }
}

export default FieldSet;
