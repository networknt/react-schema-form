import React, { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Cookies from 'universal-cookie';
import ObjectPath from 'object-path';
import ComposedComponent from './ComposedComponent';

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
    value,
    error,
    onChangeValidate,
    form: {
      schema: { type },
      action,
      title,
      required,
      multiple,
      disabled,
      options: propOptions,
    },
    model,
  } = props;
  const emptyValue = type === 'array' ? [] : '';
  const [currentValue, setCurrentValue] = useState(value || emptyValue);
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
      // console.log("fetchUrl is called", fetchUrl);
      fetchFromUrl(fetchUrl);
    }
  }, paramValues);

  useEffect(() => {
    if (type === 'array') {
      // console.log('onChangeValidate is called for array type', currentValue);
      onChangeValidate(currentValue);
    } else {
      // console.log('onChangeValidate is called for string type', currentValue);
      // don't set the value if the currentValue is null
      if (currentValue !== null) {
        onChangeValidate({ target: { value: currentValue } });
      }
    }
  }, [currentValue]);

  const onChange = (event, value) => {
    if (type !== 'array') {
      if (multiple) {
        // concat all the ids as a string
        const newValue = value.map((v) => v.id).join(',');
        setCurrentValue(newValue);
      } else {
        setCurrentValue(value.id);
      }
    } else {
      // this is an array of strings.
      if (multiple) {
        setCurrentValue(value.map((v) => v.id));
      } else {
        setCurrentValue([value.id]);
      }
    }
  };

  const fetchFromUrl = (newUrl) => {
    // Check if newUrl contains '=undefined'
    if (newUrl.includes('=undefined')) {
      // console.warn('fetchFromUrl: URL contains =undefined, fetch aborted:', newUrl);
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

  let err = '';
  if (error) {
    err = <div style={{ color: 'red' }}>{error}</div>;
  }
  let v = undefined;
  const options = (propOptions && propOptions.length > 0) ? propOptions : menuItems;
  // console.log("value = ", value);
  if (multiple) {
    // multiple select
    if (Array.isArray(value)) {
      v = value ? options.filter(option => value.includes(option.id)) : [];
    } else {
      v = value ? options.filter(option => value.split(',').includes(option.id)) : [];
    }
  } else {
    // single select
    if (Array.isArray(value)) {
      v = value.length === 1 ? options.find((option) => option.id === value[0]) : null;
    } else {
      v = value ? options.find(option => option.id === value) : null;
    }
  }
  // console.log("options = ", options, "menuItems = ", menuItems);		
  return (
    <div>
      <Autocomplete
        multiple={multiple}
        disabled={disabled}
        getOptionLabel={(option) => option.label || ''}
        value={v || (multiple ? [] : '')}
        onChange={onChange}
        options={options}
        renderInput={(params) => <TextField {...params} label={required ? title + ' *' : title} />}
      />
      {err}
    </div>
  )
}

export default ComposedComponent(DynaSelect)
