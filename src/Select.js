import React, {Component} from 'react'
import ComposedComponent from './ComposedComponent'
import MenuItem from '@material-ui/core/MenuItem'
import MuiSelect from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'


const getInitialValue = (model, {key, titleMap}) => {
    let result
    if (Array.isArray(key)) {
        key.reduce((cur, nxt) => cur && cur[nxt], model)
        result = key.reduce((cur, nxt) => cur && cur[nxt], model)
    } else {
        result = model[key]
    }
    return result || (titleMap != null ? titleMap[0].value : '')
}

class Select extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentValue: getInitialValue(this.props.model, this.props.form)
        }
    }

    static getDerivedStateFromProps(props) {
        if (props.model && props.form.key) {
            return {
                currentValue: getInitialValue(props.model, props.form)
            }
        }
    }

    onSelected = (event) => {
        let currentValue = event.target.value
        this.setState({currentValue})
        this.props.onChangeValidate(event)
    }

    render() {
        const {form} = this.props
        const menuItems = form.titleMap.map((item, idx) => (
            <MenuItem key={idx} value={item.value}>{item.name}</MenuItem>
        ))
        return (
            <FormControl fullWidth>
                <InputLabel>{form.title}</InputLabel>
                <MuiSelect
                    value={this.state.currentValue || ''}
                    placeholder={form.title}
                    disabled={form.readonly}
                    onChange={this.onSelected}>
                    {menuItems}
                </MuiSelect>
            </FormControl>
        )
    }
}

export default ComposedComponent(Select)
