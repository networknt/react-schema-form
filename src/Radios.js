import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import ComposedComponent from './ComposedComponent';

const styles = theme => ({
    formControl: {
      marginTop: theme.spacing.unit
    },
    group: {
      margin: `${theme.spacing.unit}px 0`,
    },
  });
  

class Radios extends React.Component {

    renderItems(form) {
        return form.titleMap.map(function(item, index) {
            return (
                <FormControlLabel
                    key={index}
                    control={<Radio />}
                    label={item.name}
                    value={item.value}
                    disabled={form.readonly}                    
                />
            )
        });
    }

    render() {
        let {classes} = this.props
        return (
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">{this.props.form.title}</FormLabel>
                <RadioGroup 
                    value={this.props.value} 
                    name={this.props.form.title} 
                    onChange={this.props.onChangeValidate}
                    className={classes.group}>
                  {this.renderItems(this.props.form)}
                </RadioGroup>
            </FormControl>
        );
    }
}

export default ComposedComponent(withStyles(styles)(Radios));
