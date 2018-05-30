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
    handleUpdate = (newValue, index) => {
      const {key} = this.props.form
      const {type} = this.props.form.schema
      this.props.onChange(key, newValue[dataSourceConfig['value']], type)
    };

    render() {
        // console.log('TextSuggest', this.props);
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
                    onNewRequest={this.handleUpdate}
                    disabled={this.props.form.readonly}
                    style={this.props.form.style || {width: '100%'}}
                    openOnFocus={true}
                    dataSource={this.props.form.titleMap || ['Loading...']}
                    filter={filter}
                    maxSearchResults={this.props.form.maxSearchResults || 5}
                    dataSourceConfig={dataSourceConfig}
                />
            </div>
        );
    }
}

export default ComposedComponent(TextSuggest);
