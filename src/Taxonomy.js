import React, { useState, useEffect } from 'react'
import FormLabel from '@material-ui/core/FormLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import { makeStyles } from '@material-ui/styles'
import ComposedComponent from './ComposedComponent'

const useStyles = makeStyles({
  root: {
    '& .term': {
      margin: '5px 0'
    },
    '& .accordion': {
      backgroundColor: '#eee',
      color: '#000',
      cursor: 'pointer',
      padding: '18px',
      width: '100%',
      border: 'none',
      textAlign: 'left',
      outline: 'none',
      fontSize: '15px',
      transition: '0.4s',
      boxSizing: 'border-box',
      '& small': {
        display: 'block',
        marginLeft: '14px'
      },
      '&:before': {
        content: '"+"',
        color: '#777',
        fontWeight: 'bold',
        float: 'left',
        marginRight: '5px'
      },
      '&:hover': {
        backgroundColor: '#ccc'
      },

      '&.active': {
        backgroundColor: '#ccc',

        '&:before': {
          content: '"‒"'
        }
      }
    },

    '& .panel': {
      padding: '0 54px',
      display: 'none',
      color: '#000',
      backgroundColor: '#ddd',
      overflow: 'hidden',
      '& .term': {
        '& .panel': {
          display: 'block'
        }
      },
      '& .accordion': {
        padding: 0,
        backgroundColor: 'transparent',
        marginLeft: '-13px',
        '&:hover': {
          backgroundColor: 'transparent'
        },
        '&.active': {
          backgroundColor: 'transparent'
        }
      }
    }
  },
  tags: {
    padding: 0,
    margin: 0,
    '& li': {
      display: 'inline-flex',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignContent: 'center',
      alignItems: 'stretch',
      margin: '5px 2px',
      fontSize: '1em',
      height: '1.5em',
      padding: 0,
      listStyle: 'none',
      background: '#fff',
      fontFamily: 'sans-serif',
      '&.selected-term': {
        border: 'solid thin #333',
        borderRadius: 3
      },
      '&.message': {
        fontWeight: 'bold'
      },
      '& span.label': {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        flex: '1 1 auto',
        padding: [0, '1em'],
        color: 'black',
        whitespace: 'nowrap'
      },
      '& span.remove': {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        flex: '0 1 auto',
        padding: [0, '0.8em'],
        margin: 0,
        cursor: 'pointer',
        backgroundColor: '#e4e4e4',
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3
      }
    }
  }
})

function Taxonomy(props) {
  const classes = useStyles()
  const { model, form, value, error, setDefault, onChangeValidate } = props
  const { key, title, action } = form
  setDefault(key, model, form, value)
  const [assignedTaxo, setAssignedTaxo] = useState(value || []) // an array of codes
  const [terms, setTerms] = useState([]) // the entire category
  useEffect(() => {
    onChangeValidate(null, assignedTaxo)
  }, [assignedTaxo])

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
        // console.log(res);
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

  const parseTerms = (taxoTerms) => {
    // console.log(taxoTerms);
    const taxo = []
    for (let i = 0; i < taxoTerms.length; i++) {
      const value = taxoTerms[i]
      const terms = []

      const attr = {
        type: 'checkbox',
        value: value.code,
        name: value.label,
        onChange: (e) => handleChecked(e)
      }
      if (assignedTaxo) {
        for (let a = 0; a < assignedTaxo.length; a++) {
          if (assignedTaxo[a] === value.code) {
            attr.checked = true
          }
        }
      }

      if (Array.isArray(value.children) && value.children.length > 0) {
        var item = []
        var clss = 'accordion'
        if (value.type === 'volcabulary') {
          item.push(<strong>{value.label}</strong>)
          item.push(<small>{value.description}</small>)
        } else {
          item.push(<input {...attr} />)
          item.push(<label>{value.label}</label>)
          clss += ' active'
        }
        terms.push(
          <div key={value.code} className='term'>
            <div className={clss} onClick={(e) => handleAccordion(e)}>
              {item}
            </div>
            <div className='panel'>{parseTerms(value.children)}</div>
          </div>
        )
      } else {
        terms.push(
          <div key={value.code} className='term'>
            <input {...attr} />
            <label>{value.label}</label>
          </div>
        )
      }
      // console.log(terms);
      taxo.push(terms)
    }
    // console.log(taxo);
    return taxo
  }

  const handleChecked = (e) => {
    const checkboxElem = e.currentTarget
    var selectedTerms = assignedTaxo
    // console.log(selectedTerms);
    if (checkboxElem.checked) {
      selectedTerms = [...selectedTerms, checkboxElem.getAttribute('value')]
    } else {
      selectedTerms = selectedTerms.filter(
        (item) => item !== checkboxElem.getAttribute('value')
      )
    }
    // console.log(selectedTerms);
    setAssignedTaxo(selectedTerms)
  }

  const handleAccordion = (e) => {
    if (!e.target.type || e.target.type !== 'checkbox') {
      var target = e.currentTarget
      var panel = target.nextElementSibling
      target.classList.toggle('active')

      if (target.classList.contains('active')) {
        panel.style.display = 'block'
      } else {
        panel.style.display = 'none'
      }
    }
  }

  const parseAssignedTaxonomy = (taxoTerms) => {
    const tags = []

    if (Array.isArray(assignedTaxo)) {
      for (let a = 0; a < assignedTaxo.length; a++) {
        // console.log(assignedTaxo[a]);
        tags.push(
          <li key={a} className='selected-term'>
            <span className='label'>{assignedTaxo[a]}</span>
            <span
              className='remove'
              rel={assignedTaxo[a]}
              onClick={(e) => removeAssignedTaxonomy(e)}
            >
              x
            </span>
          </li>
        )
      }
    }

    return tags.length > 0 ? tags : null
  }

  const removeAssignedTaxonomy = (e) => {
    var taxCode = e.currentTarget.getAttribute('rel')

    var newAssignedTaxo = []
    for (let i = 0; i < assignedTaxo.length; i++) {
      if (assignedTaxo[i] !== taxCode) {
        newAssignedTaxo.push(assignedTaxo[i])
      }
    }
    setAssignedTaxo(newAssignedTaxo)
  }

  return (
    <React.Fragment>
      <FormLabel required={form.required}>{title}</FormLabel>
      <ul className={classes.tags}>
        {parseAssignedTaxonomy(terms) || (
          <li className='message'>No keywords selected</li>
        )}
      </ul>
      <div className='term-chooser'>{parseTerms(terms)}</div>
      {error ? <FormHelperText error>{error}</FormHelperText> : null}
    </React.Fragment>
  )
}

export default ComposedComponent(Taxonomy)
