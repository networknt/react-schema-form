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
    constructor(props) {
        super(props);

        const {model, form} = this.props;
        const {key} = form;

        const storedValue = model && this.getModelKey(model, key) || undefined;
        const defaultValue = form.schema.default || undefined;
        const value = !(_.isEmpty(storedValue)) && storedValue || defaultValue;

        this.props.setDefault(key, model, form, value)
        this.state = {
            currentValue: value,
        };
    }

    getModelKey(model, key) {
        if (Array.isArray(key)) {
            return key.reduce((cur, nxt) => (cur[nxt] || {}), model);
        } else {
            return model[key];
        }
    }

    handleUpdate = (newValue, index) => {
      const {key} = this.props.form
      const {type} = this.props.form.schema
      return this.props.onChange(key, newValue[dataSourceConfig['value']], type, this.props.form)
    };

    /*
    Try to reach the related enum title, if not return the ID as an string

    Useful to show the title (enumName) instead of the code (enum)
    */
    reachTitle = (init_value) => {
        if (!this.props.form.schema || !this.props.form.schema.enum)
            return init_value.toString()

        const names = this.props.form.schema.enumNames || this.props.form.schema.enum;
        const values = this.props.form.schema.enum;

        const init_value_name = names[values.indexOf(init_value)];

        return init_value_name || init_value.toString()
    }

    render() {
        // console.log('TextSuggest', this.props);

        // assign the filter, by default case insensitive
        const filter = (this.props.form.filter == "fuzzy")?
            AutoComplete.fuzzyFilter
            :
            AutoComplete.caseInsensitiveFilter

        const value = this.props.value && this.reachTitle(this.props.value);

        return (
            <div className={this.props.form.htmlClass}>
                <AutoComplete
                    type={this.props.form.type}
                    floatingLabelText={this.props.form.title}
                    hintText={this.props.form.placeholder}
                    errorText={this.props.error || this.props.errorText}
                    onNewRequest={this.handleUpdate}
                    disabled={this.props.form.readonly}
                    style={this.props.form.style || {width: '100%'}}
                    openOnFocus={true}
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
