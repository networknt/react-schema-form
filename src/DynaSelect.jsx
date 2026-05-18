import React, { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Cookies from 'universal-cookie';
import ObjectPath from 'object-path';
import useSchemaField from './useSchemaField';

String.prototype.format = function () {
  var formatted = this;
  for (var i = 0; i < arguments.length; i++) {
    var regexp = new RegExp('\\{' + i + '\\}', 'gi');
    formatted = formatted.replace(regexp, arguments[i]);
  }
  return formatted;
};

function DynaSelect(props) {
  const {
    form: {
      schema: { type },
      action,
      title,
      required,
      multiple,
      disabled,
      options: propOptions,
      groupByKey,
      groupFallbackLabel,
      groupSortKey,
      optionSortKey,
      optionValueKey,
      optionLabelKey,
      key
    },
    model,
    setDefault
  } = props;

  const { value, valid, error, onChangeValidate } = useSchemaField(props);

  useEffect(() => {
    setDefault(key, model, props.form, value)
  }, [])

  const [menuItems, setMenuItems] = useState([]);
  const { url, params } = action || {};
  const paramValues =
    params && params.some((e) => e != null)
      ? params.map((x) => ObjectPath.get(model, x))
      : [];

  useEffect(() => {
    const fetchUrl = params
      ? paramValues.length > 0
        ? url.format(...paramValues)
        : ''
      : url;
    if (fetchUrl) {
      fetchFromUrl(fetchUrl);
    }
  }, paramValues);

  const getOptionValue = (option, path) => path ? ObjectPath.get(option, path) : undefined;
  const valueKey = optionValueKey || 'id';
  const labelKey = optionLabelKey || 'label';
  const getOptionStoredValue = (option) => getOptionValue(option, valueKey);
  const getOptionDisplayLabel = (option) => {
    const label = getOptionValue(option, labelKey);
    return label !== undefined && label !== null ? String(label) : '';
  };
  const optionMatches = (option, selectedValue) => String(getOptionStoredValue(option)) === String(selectedValue);
  const uniqueValues = (values) => {
    const seenValues = new Set();
    return values.filter((value) => {
      const normalizedValue = String(value);
      if (seenValues.has(normalizedValue)) {
        return false;
      }
      seenValues.add(normalizedValue);
      return true;
    });
  };

  const onChange = (event, newValue) => {
    let resultValue = null;
    const selectedValues = Array.isArray(newValue)
      ? uniqueValues(newValue.map(getOptionStoredValue).filter((v) => v !== undefined && v !== null))
      : [];
    if (type !== 'array') {
      if (multiple) {
        resultValue = selectedValues.join(',');
      } else {
        resultValue = newValue ? getOptionStoredValue(newValue) : '';
      }
    } else {
      if (multiple) {
        resultValue = selectedValues;
      } else {
        resultValue = newValue ? [getOptionStoredValue(newValue)] : [];
      }
    }
    onChangeValidate(null, resultValue);
  };

  const fetchFromUrl = (newUrl) => {
    // Check if newUrl contains '=undefined'
    if (newUrl.includes('=undefined') || newUrl.includes('=&') || newUrl.endsWith('=')) {
      return;
    }

    const cookies = new Cookies();
    const headers = { 'Content-Type': 'application/json' };
    if (cookies.get('csrf'))
      Object.assign(headers, { 'X-CSRF-TOKEN': cookies.get('csrf') });
    fetch(newUrl, { headers, credentials: 'include' })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.text().then((text) => {
          throw new Error(text);
        })
      })
      .then((res) => {
        setMenuItems(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const options = (propOptions && propOptions.length > 0) ? propOptions : menuItems;
  const hasGroupValues = groupByKey && options.some((option) => {
    const group = getOptionValue(option, groupByKey);
    return group !== undefined && group !== null && group !== '';
  });
  const getGroupLabel = (option) => {
    const group = getOptionValue(option, groupByKey);
    return group !== undefined && group !== null && group !== '' ? String(group) : (groupFallbackLabel || 'Ungrouped');
  };
  const compareValues = (a, b) => {
    if (a === b) return 0;
    if (a === undefined || a === null || a === '') return 1;
    if (b === undefined || b === null || b === '') return -1;
    if (typeof a === 'number' && typeof b === 'number') return a - b;
    return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });
  };
  const sortedOptions = hasGroupValues ? [...options].sort((a, b) => {
    if (groupSortKey) {
      const groupSortCompare = compareValues(getOptionValue(a, groupSortKey), getOptionValue(b, groupSortKey));
      if (groupSortCompare !== 0) return groupSortCompare;
    }
    const groupLabelCompare = compareValues(getGroupLabel(a), getGroupLabel(b));
    if (groupLabelCompare !== 0) return groupLabelCompare;
    return compareValues(
      getOptionValue(a, optionSortKey) ?? getOptionDisplayLabel(a),
      getOptionValue(b, optionSortKey) ?? getOptionDisplayLabel(b)
    );
  }) : options;
  const getSelectedOptions = (selectedValues) => {
    const seenValues = new Set();
    return selectedValues.reduce((selectedOptions, selectedValue) => {
      const normalizedValue = String(selectedValue);
      if (seenValues.has(normalizedValue)) {
        return selectedOptions;
      }
      seenValues.add(normalizedValue);
      const option = sortedOptions.find(candidate => optionMatches(candidate, selectedValue));
      return option ? [...selectedOptions, option] : selectedOptions;
    }, []);
  };
  let v = undefined;

  if (multiple) {
    if (Array.isArray(value)) {
      v = value ? getSelectedOptions(value) : [];
    } else {
      const selectedValues = (value || '').split(',');
      v = value ? getSelectedOptions(selectedValues) : [];
    }
  } else {
    if (Array.isArray(value)) {
      v = value.length === 1 ? sortedOptions.find((option) => optionMatches(option, value[0])) : null;
    } else {
      v = value ? sortedOptions.find(option => optionMatches(option, value)) : null;
    }
  }

  const { style, className, otherProps } = props.form;

  return (
    <div style={style} className={className}>
      <Autocomplete
        multiple={multiple}
        disabled={disabled}
        getOptionLabel={getOptionDisplayLabel}
        value={v || (multiple ? [] : null)}
        onChange={onChange}
        options={sortedOptions}
        groupBy={hasGroupValues ? getGroupLabel : undefined}
        fullWidth
        {...otherProps}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            label={required ? title + ' *' : title}
          />
        )}
      />
      {!valid ? <div style={{ color: 'red' }}>{error}</div> : null}
    </div>
  )
}

export default DynaSelect;
