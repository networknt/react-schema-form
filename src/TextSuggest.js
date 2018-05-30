/**
 * Created by XaviTorello on 30/05/18
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';
import AutoComplete from 'material-ui/AutoComplete';

const dataSourceConfig = {
  text: 'name',
  value: 'value',
};

class TextSuggest extends React.Component {
    render() {
        // console.log('TextSuggest', this.props.form);

        // assign the source list to autocomplete
        const datasource = this.props.form.schema.enumNames || this.props.form.schema.enum || ['Loading...'];

        // assign the filter, by default case insensitive
        const filter = ((filter) => {
            switch (filter) {
                case 'fuzzy':
                    return AutoComplete.fuzzyFilter;
                    break;
                default:
                    return AutoComplete.caseInsensitiveFilter;
                    break;
            }
        })(this.props.form.filter)

        return (
            <div className={this.props.form.htmlClass}>
                <AutoComplete
                    type={this.props.form.type}
                    floatingLabelText={this.props.form.title}
                    hintText={this.props.form.placeholder}
                    errorText={this.props.error}
                    onChange={this.props.onChangeValidate}
                    defaultValue={this.props.value}
                    disabled={this.props.form.readonly}
                    style={this.props.form.style || {width: '100%'}}
                    dataSource={datasource}
                    openOnFocus={true}
                    filter={filter}
                    maxSearchResults={this.props.form.maxSearchResults || 5}
                />
            </div>
        );
    }
}

export default ComposedComponent(TextSuggest);
