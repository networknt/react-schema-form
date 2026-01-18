import React, { useState, useEffect } from 'react'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import AddBoxIcon from '@mui/icons-material/AddBox'
import FolderIcon from '@mui/icons-material/Folder'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import Cookies from 'universal-cookie'
import useSchemaField from './useSchemaField'

function Taxonomy(props) {
  const { model, form, setDefault, localization: { getLocalizedString } } = props
  const { value, valid, error, onChangeValidate } = useSchemaField(props)
  const { key, title, action } = form

  useEffect(() => {
    setDefault(key, model, form, value)
  }, [])

  const [expanded, setExpended] = useState([])
  const [terms, setTerms] = useState([]) // the entire category

  const fetchCateogry = (url) => {
    const cookies = new Cookies()
    const headers = { 'Content-Type': 'application/json' }
    if (cookies.get('csrf'))
      Object.assign(headers, { 'X-CSRF-TOKEN': cookies.get('csrf') })
    fetch(url, { headers, credentials: 'include' })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return res.text().then((text) => {
          throw new Error(text)
        })
      })
      .then((res) => {
        setTerms(res)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    if (action && action.url) {
      fetchCateogry(action.url)
    }
  }, [])

  const icons = {
    check: <CheckBoxIcon className="rct-icon rct-icon-check" />,
    uncheck: <CheckBoxOutlineBlankIcon className="rct-icon rct-icon-uncheck" />,
    halfCheck: (
      <IndeterminateCheckBoxIcon className="rct-icon rct-icon-half-check" />
    ),
    expandClose: (
      <ChevronRightIcon className="rct-icon rct-icon-expand-close" />
    ),
    expandOpen: (
      <KeyboardArrowDownIcon className="rct-icon rct-icon-expand-open" />
    ),
    expandAll: <AddBoxIcon className="rct-icon rct-icon-expand-all" />,
    collapseAll: (
      <IndeterminateCheckBoxIcon className="rct-icon rct-icon-collapse-all" />
    ),
    parentClose: <FolderIcon className="rct-icon rct-icon-parent-close" />,
    parentOpen: <FolderOpenIcon className="rct-icon rct-icon-parent-open" />,
    leaf: <InsertDriveFileIcon className="rct-icon rct-icon-leaf-close" />
  }

  return (
    <React.Fragment>
      <FormLabel required={form.required}>
        {title && getLocalizedString(title)}
      </FormLabel>
      <CheckboxTree
        nodes={terms}
        checked={value || []}
        expanded={expanded}
        onCheck={(checked) => onChangeValidate(null, checked)}
        onExpand={(expanded) => setExpended(expanded)}
        icons={icons}
        noCascade
      />
      {!valid ? <FormHelperText error>{error}</FormHelperText> : null}
    </React.Fragment>
  )
}

export default Taxonomy
