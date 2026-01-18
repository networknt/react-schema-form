import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useSchemaField from './useSchemaField';

const TextSuggest = (props) => {
    const {
        model,
        form,
        setDefault,
        localization: { getLocalizedString },
    } = props;
    const { value, valid, error, onChangeValidate } = useSchemaField(props);
    const { key, title, placeholder, readonly, titleMap } = form;

    useEffect(() => {
        setDefault(key, model, form, value);
    }, []);

    const options = titleMap || [];

    const handleChange = (event, newValue) => {
        // newValue will be an item from titleMap: { name: '...', value: '...' }
        // or just a string if it's a simple array.
        const val = newValue && typeof newValue === 'object' ? newValue.value : newValue;
        onChangeValidate(null, val);
    };

    const getOptionLabel = (option) => {
        if (typeof option === 'object' && option !== null) {
            return getLocalizedString(option.name || option.value || '');
        }
        return getLocalizedString(option || '');
    };

    // Find the current selected option object from titleMap based on value
    const selectedOption = options.find((opt) => {
        if (typeof opt === 'object' && opt !== null) {
            return opt.value === value;
        }
        return opt === value;
    }) || null;

    return (
        <div className={form.htmlClass}>
            <Autocomplete
                options={options}
                getOptionLabel={getOptionLabel}
                value={selectedOption}
                onChange={handleChange}
                disabled={readonly}
                fullWidth
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={title && getLocalizedString(title)}
                        placeholder={placeholder && getLocalizedString(placeholder)}
                        helperText={(error || form.description) && getLocalizedString(error || form.description)}
                        error={!valid}
                        required={form.required}
                        style={form.style || { width: '100%' }}
                        {...form.otherProps}
                    />
                )}
                {...form.otherProps}
            />
        </div>
    );
};

export default TextSuggest;
