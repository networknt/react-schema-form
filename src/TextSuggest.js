/**
 * Created by XaviTorello on 30/05/18
 */
import React from 'react';
import ComposedComponent from './ComposedComponent';

const dataSourceConfig = {
  text: 'name',
  value: 'value',
};

class TextSuggest extends React.Component {
    handleUpdate = (newValue, index) => {
      const {key} = this.props.form
      const {type} = this.props.form.schema
      return this.props.onChange(key, newValue[dataSourceConfig['value']], type, this.props.form)
    };

    handleInit = (init_value) => {
        if (!this.props.form.schema || !this.props.form.schema.enum)
            return init_value.toString()

        const names = this.props.form.schema.enumNames || this.props.form.schema.enum;
        const values = this.props.form.schema.enum;

        // console.log(names, values);
        // console.log("indexOf", values.indexOf(init_value));
        // console.log("names[values.indexOf(init_value)]", names[values.indexOf(init_value)]);
        const init_value_name = names[values.indexOf(init_value)];

        // this.handleUpdate({[dataSourceConfig['value']]: init_value, [dataSourceConfig['text']]: init_value_name})

        return init_value_name || init_value.toString()
    }

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

        // console.log("TEXTSUG", this.props);

        const value = this.props.value && this.handleInit(this.props.value);

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
                    openOnFocus
                    searchText={value}
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
