import React, { useEffect } from 'react';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Close';
import cloneDeep from 'lodash/cloneDeep';
import FormLabel from '@mui/material/FormLabel';
import utils from './utils';
import useSchemaField from './useSchemaField';

const PREFIX = 'ArrayComponent';

const classes = {
  arrayItem: `${PREFIX}-arrayItem`,
  deleteItemButton: `${PREFIX}-deleteItemButton`,
  addButton: `${PREFIX}-addButton`,
  elementsContainer: `${PREFIX}-elementsContainer`,
  title: `${PREFIX}-title`,
};

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.arrayItem}`]: {
    position: 'relative',
    padding: theme.spacing(),
    marginTop: theme.spacing(),
    display: 'flex',
  },
  [`& .${classes.deleteItemButton}`]: {
    margin: [[theme.spacing(-1), theme.spacing(-1), 'auto', 'auto']],
  },
  [`& .${classes.addButton}`]: {
    marginLeft: theme.spacing(),
  },
  [`& .${classes.elementsContainer}`]: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  [`& .${classes.title}`]: {
    margin: 'auto 0',
  },
}));

let SEQUENCE = 1;
const ITEM_ID = Symbol('_SCHEMAFORM_ITEM_ID');

const assignItemId = (item) => {
  let newItem = null;
  if (item && typeof item === 'object' && Array.isArray(item)) {
    newItem = [...item];
  } else if (item && typeof item === 'object' && !item[ITEM_ID]) {
    newItem = { ...item };
  }

  if (newItem) {
    // define hidden property with internal id
    Object.defineProperty(newItem, ITEM_ID, {
      enumerable: false,
      writable: true,
    });
    SEQUENCE += 1;
    newItem[ITEM_ID] = SEQUENCE;
    return newItem;
  }

  return item;
};

const setIndex = (index) => (form) => {
  if (form.key) {
    // eslint-disable-next-line no-param-reassign
    form.key[form.key.indexOf('')] = index;
  }
};

const copyWithIndex = (form, index) => {
  const copy = cloneDeep(form);
  copy.arrayIndex = index;
  utils.traverseForm(copy, setIndex(index));
  return copy;
};

const ArrayComponent = (props) => {
  const {
    form,
    builder,
    model,
    mapper,
    onChange,
    setDefault,
    options,
    localization: { getLocalizedString },
  } = props;

  const { value, onChangeValidate } = useSchemaField(props);
  const arrayModel = (value || []).map(assignItemId);

  useEffect(() => {
    setDefault(form.key, model, form, value);
  }, []);

  useEffect(() => {
    // Always start with one empty form unless configured otherwise.
    if (form.startEmpty !== true && arrayModel.length === 0) {
      onAppend();
    }
  }, []);

  const onAppend = () => {
    let empty;
    if (form && form.schema && form.schema.items) {
      const { items } = form.schema;
      if (items.type && items.type.indexOf('object') !== -1) {
        empty = {};

        // Check for possible defaults
        if (!options || options.setSchemaDefaults !== false) {
          empty = typeof items.default !== 'undefined' ? items.default : empty;

          // Check for defaults further down in the schema.
          if (empty) {
            utils.traverseSchema(items, (prop, path) => {
              if (typeof prop.default !== 'undefined') {
                utils.selectOrSet(path, empty, prop.default);
              }
            });
          }
        }
      } else if (items.type && items.type.indexOf('array') !== -1) {
        empty = [];
        if (!options || options.setSchemaDefaults !== false) {
          empty = items.default || empty;
        }
      } else if (!options || options.setSchemaDefaults !== false) {
        // No type? could still have defaults.
        empty = items.default || empty;
      }
    }
    const newModel = [...arrayModel];
    assignItemId(empty);
    newModel.push(empty);
    onChangeValidate(null, newModel);
  };

  const onDelete = (index) => () => {
    const newModel = [...arrayModel];
    newModel.splice(index, 1);
    onChangeValidate(null, newModel);
  };

  const getAddButton = () => {
    const AddButton =
      form.AddButton ||
      ((buttonProps) => (
        <Button
          className={classes.addButton}
          variant="contained"
          color="primary"
          {...buttonProps}
        />
      ));
    return (
      <AddButton onClick={onAppend}>{form.add || 'Add'}</AddButton>
    );
  };

  const arrays = [];
  for (let i = 0; i < arrayModel.length; i += 1) {
    const item = arrayModel[i];
    const forms = form.items.map((eachForm, index) => {
      const copy = copyWithIndex(eachForm, i);
      return builder(copy, model, index, mapper, onChange, builder, {
        arrayIndex: i,
      });
    });
    arrays.push(
      <Card
        className={classes.arrayItem}
        key={(item && item[ITEM_ID]) || i}
      >
        <div className={classes.elementsContainer}>{forms}</div>
        <IconButton
          onClick={onDelete(i)}
          className={classes.deleteItemButton}
          size="large"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Card>
    );
  }

  return (
    <Root>
      <div style={{ display: 'flex' }}>
        <FormLabel required={form.required} className={classes.title}>
          {form.title && getLocalizedString(form.title)}
        </FormLabel>
        {getAddButton()}
      </div>
      <div>{arrays}</div>
    </Root>
  );
};

export default ArrayComponent;
