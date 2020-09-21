import React, { useState, useEffect } from 'react'
import FormLabel from '@material-ui/core/FormLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import AddBoxIcon from '@material-ui/icons/AddBox'
import FolderIcon from '@material-ui/icons/Folder'
import FolderOpenIcon from '@material-ui/icons/FolderOpen'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'
import ComposedComponent from './ComposedComponent'

function Taxonomy(props) {
  const { model, form, value, error, setDefault, onChangeValidate } = props
  const { key, title, action } = form
  setDefault(key, model, form, value)
  const [taxonomies, setTaxonomies] = useState(value || []) // an array of values
  const [expanded, setExpended] = useState([])
  const [terms, setTerms] = useState([]) // the entire category
  useEffect(() => {
    onChangeValidate(taxonomies)
  }, [taxonomies])

  const fetchCateogry = (url) => {
    fetch(url)
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
    const { url } = action
    fetchCateogry(url)
  }, [])

  const icons = {
    check: <CheckBoxIcon className='rct-icon rct-icon-check' />,
    uncheck: <CheckBoxOutlineBlankIcon className='rct-icon rct-icon-uncheck' />,
    halfCheck: (
      <IndeterminateCheckBoxIcon className='rct-icon rct-icon-half-check' />
    ),
    expandClose: (
      <ChevronRightIcon className='rct-icon rct-icon-expand-close' />
    ),
    expandOpen: (
      <KeyboardArrowDownIcon className='rct-icon rct-icon-expand-open' />
    ),
    expandAll: <AddBoxIcon className='rct-icon rct-icon-expand-all' />,
    collapseAll: (
      <IndeterminateCheckBoxIcon className='rct-icon rct-icon-collapse-all' />
    ),
    parentClose: <FolderIcon className='rct-icon rct-icon-parent-close' />,
    parentOpen: <FolderOpenIcon className='rct-icon rct-icon-parent-open' />,
    leaf: <InsertDriveFileIcon className='rct-icon rct-icon-leaf-close' />
  }

  return (
    <React.Fragment>
      <FormLabel required={form.required}>{title}</FormLabel>
      <CheckboxTree
        nodes={terms}
        checked={taxonomies}
        expanded={expanded}
        onCheck={(checked) => setTaxonomies(checked)}
        onExpand={(expanded) => setExpended(expanded)}
        icons={icons}
        noCascade
      />
      {error ? <FormHelperText error>{error}</FormHelperText> : null}
    </React.Fragment>
  )
}

export default ComposedComponent(Taxonomy)
