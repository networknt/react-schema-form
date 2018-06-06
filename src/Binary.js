/**
 * Created by XaviTorello on 30/05/18
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import RaisedButton from 'material-ui/RaisedButton';


class Binary extends React.Component {
    handleUpdate(selectorFiles: FileList)
    {
        const {key} = this.props.form
        const {type} = this.props.form.schema

        console.log(key, type);

        const file_attachment = selectorFiles[0];
        console.log(file_attachment);

        // let data = new FormData();
        // data.append('file', file_attachment);
        // data.append('name', 'some value user types');
        // data.append('description', 'some value user types');
        // console.log(data.keys());
        // console.dir(data.values());

        return this.props.onChange(key, file_attachment, type)
    }

    render() {
        // console.log('Binary', this.props);
        // assign the filter, by default case insensitive

        return (
            <div className={this.props.form.htmlClass}>
                <RaisedButton
                    containerElement='label'
                    disabled={this.props.form.readonly}
                    // errorText={this.props.error}
                    label={this.props.form.placeholder || "Puja un fitxer"}
                    style={this.props.form.style || {width: '100%'}}
                >
                    <input
                        type="file"
                        // accept="image/*"
                        // style={{"display":"none"}}
                        onChange={ (e) => this.handleUpdate(e.target.files) }
                        label={this.props.form.title || "Selecciona una factura"}
                    />
                </RaisedButton>

            </div>
        );
    }
}

export default ComposedComponent(Binary);
