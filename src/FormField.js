/**
 * Created by steve on 12/09/15.
 */
var React = require('react');
var utils = require('./utils');

var FormField = React.createClass({

    render: function() {

        var field;
        if (this.props.schema.type === 'text' || this.props.schema.type === 'number') {
            field = (
                <div className="form-group">
                    <label className="control-label">{this.props.schema.title}</label>
                    <input type="{{form.type}}"
                           step="any"
                           sf-changed="form"
                           placeholder={this.props.schema.placeholder}
                           className="form-control"
                           id={this.props.schema.key.slice(-1)[0]}
                           name={this.props.schema.key.slice(-1)[0]}/>
                </div>
            )
        } else if (this.props.schema.type === 'textarea') {
            field = (
                <div className="form-group schema-form-textarea">
                    <label>{this.props.schema.title}</label>
                    <textarea className="form-control"
                        id={this.props.schema.key.slice(-1)[0]}
                        sf-changed="form"
                        placeholder={this.props.schema.placeholder}
                        name={this.props.schema.key.slice(-1)[0]}></textarea>
                </div>
            )
        } else if (this.props.schema.type === 'checkbox') {
            field = (
                <div className="checkbox schema-form-checkbox">
                    <label>
                        <input type="checkbox"
                               sf-changed="form"
                               name={this.props.schema.key.slice(-1)[0]}/>
                            <span>{this.props.schema.title}</span>
                    </label>
                </div>
            )
        } else if (this.props.schema.type === 'help') {
            field = (
                <div className="helpvalue schema-form-helpvalue" dangerouslySetInnerHTML={{__html: this.props.schema.helpvalue}} ></div>
            )
        } else if (this.props.schema.type === 'section') {
            field =
                React.DOM.div( {className:"schema-form-section"},
                    this.props.schema.items.map(function(item) {
                        return <FormField key={item.key} schema ={item} />
                    }.bind(this))
                )
        } else if (this.props.schema.type === 'array') {
            field =
                React.createElement("div", {className: "schema-form-array"},
                    React.createElement("h3", null, this.props.schema.title),
                    React.createElement("ol", {className: "list-group"},
                        React.createElement("li", {className: "list-group-item"},
                            this.props.schema.items.map(function(item){
                                React.createElement("button", {type: "button", className: "close pull-right"},
                                    React.createElement("span", {"aria-hidden": "true"}, "×"), React.createElement("span", {class: "sr-only"}, "Close")
                                )
                            })
                        )
                    ),
                    React.createElement("div", {className: "clearfix"},
                        React.createElement("button", {type: "button",
                                className: "btn btn-default pull-right"},
                            React.createElement("i", {class: "glyphicon glyphicon-plus"}),
                            "Add"
                        )
                    )
                )
        } else if (this.props.schema.type === 'submit') {
            field = (
                <div className="form-group schema-form-submit">
                    <input type="submit"
                           className="btn btn-primary"
                           value={this.props.schema.title}/>
                </div>
            )
        } else {
            field = (
                <div className="form-group">Not implemented yet</div>
            )
        }

        return (
            <div>{field}</div>
        );
    }
});

module.exports = FormField;
