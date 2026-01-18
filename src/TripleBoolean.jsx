import React, { useState, useEffect } from 'react'
import {
  Card,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup
} from '@mui/material'
import FormLabel from '@mui/material/FormLabel'
import useSchemaField from './useSchemaField'

const divStyle = {
  padding: '20px'
}

const TripleBoolean = (props) => {
  const {
    form: { title, yesLabel, noLabel, clearButtonLabel, required, key },
    model,
    setDefault,
    localization: { getLocalizedString }
  } = props
  const { value, onChangeValidate } = useSchemaField(props)

  useEffect(() => {
    setDefault(key, model, props.form, value)
  }, [])

  const yesChecked = value === 'yes'
  const noChecked = value === 'no'

  return (
    <Card>
      <div style={divStyle}>
        <FormLabel required={required}>
          {title && getLocalizedString(title)}
        </FormLabel>
        <br />
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onClick={(e) => {
                  onChangeValidate(e, 'yes')
                }}
                checked={yesChecked}
              />
            }
            label={yesLabel ? getLocalizedString(yesLabel) : 'Yes'}
          />
          <FormControlLabel
            control={
              <Checkbox
                onClick={(e) => {
                  onChangeValidate(e, 'no')
                }}
                checked={noChecked}
              />
            }
            label={noLabel ? getLocalizedString(noLabel) : 'No'}
          />
        </FormGroup>
        {value === 'yes' || value === 'no' ? (
          <Button
            id="temp"
            variant="text"
            color="primary"
            onClick={(e) => onChangeValidate(e, 'unanswered')}
          >
            {clearButtonLabel
              ? getLocalizedString(clearButtonLabel)
              : 'clear response'}
          </Button>
        ) : (
          ''
        )}
      </div>
    </Card>
  )
}

export default TripleBoolean
