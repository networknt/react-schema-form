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

  const onChange = (event, newValue) => {
    let resultValue = null;
    if (type !== 'array') {
      if (multiple) {
        resultValue = newValue.map((v) => v.id).join(',');
      } else {
        resultValue = newValue ? newValue.id : '';
      }
    } else {
      if (multiple) {
        resultValue = newValue.map((v) => v.id);
      } else {
        resultValue = newValue ? [newValue.id] : [];
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
  let v = undefined;

  if (multiple) {
    if (Array.isArray(value)) {
      v = value ? options.filter(option => value.includes(option.id)) : [];
    } else {
      v = value ? options.filter(option => (value || '').split(',').includes(option.id)) : [];
    }
  } else {
    if (Array.isArray(value)) {
      v = value.length === 1 ? options.find((option) => option.id === value[0]) : null;
    } else {
      v = value ? options.find(option => option.id === value) : null;
    }
  }

  return (
    <div>
      <Autocomplete
        multiple={multiple}
        disabled={disabled}
        getOptionLabel={(option) => option.label || ''}
        value={v || (multiple ? [] : null)}
        onChange={onChange}
        options={options}
        renderInput={(params) => <TextField {...params} label={required ? title + ' *' : title} />}
      />
      {!valid ? <div style={{ color: 'red' }}>{error}</div> : null}
    </div>
  )
}

export default DynaSelect;
