/**
 * Created by steve on 15/09/15.
 */
import React from 'react';
var utils = require('../utils');
var classNames = require('classnames');
import ValidationMixin from '../ValidationMixin';
const DatePicker = require('material-ui/lib/date-picker/date-picker');

/**
 * There is no default number picker as part of Material-UI.
 * Instead, use a TextField and validate.
 */
class MuiDate extends React.Component {

    constructor(props) {
        super(props);
    }


    onDatePicked(empty, date) {
        console.log("onDatePicked", empty, date);
    }

    render() {
        return (
            <div style={{width: '100%', display: 'block'}}>
                <DatePicker
                    mode={"landscape"}
                    autoOk={true}
                    hintText={this.props.form.title}
                    onChange={this.onDatePicked}
                    onShow={null}
                    onDismiss={null}
                    style={{width: '100%'}}/>

            </div>
        );
    }
}

export default ValidationMixin(MuiDate);
