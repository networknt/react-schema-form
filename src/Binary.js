/**
 * Created by XaviTorello on 30/05/18
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import RaisedButton from 'material-ui/RaisedButton';
import FileIcon from 'material-ui/svg-icons/editor/attach-file';


class Binary extends React.Component {

    handleUpdate(selectorFiles: FileList)
    {
        const {key, type} = this.props.form
        const file_attachment = selectorFiles[0];

        return this.props.onChange(key, file_attachment, type, this.props.form)
    }

    render() {
        // console.log('Binary', this.props);

        return (
            <div className={this.props.form.htmlClass}>
                <RaisedButton
                    containerElement='label'
                    disabled={this.props.form.readonly}
                    // errorText={this.props.error}
                    label={this.props.form.placeholder || "Puja un fitxer"}
                    style={this.props.form.style || {width: '100%'}}
                >
                    <FileIcon/>
                    <input
                        type="file"
                        // accept="image/*"
                        // style={{"display":"none"}}
                        onChange={ (e) => this.handleUpdate(e.target.files) }
                        label={this.props.form.title || "Upload a file"}
                    />
                </RaisedButton>

            </div>
        );
    }
}

export default ComposedComponent(Binary);
