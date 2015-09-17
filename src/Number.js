/**
 * Created by steve on 15/09/15.
 */
var React = require('react');
var utils = require('./utils');

var Number = React.createClass({

    render: function() {

        return (
            <div className="form-group">
                <label className="control-label">{this.props.form.title}</label>
                <input type={this.props.form.type}
                       onChange={this.props.onChange}
                       step={this.props.form.step}
                       className="form-control"
                       id={this.props.form.key.slice(-1)[0]}
                       name={this.props.form.key.slice(-1)[0]}/>
            </div>
        );
    }
});

module.exports = Number;
