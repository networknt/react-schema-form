/**
 * Created by steve on 20/09/15.
 */
import React from 'react';
import Typography from '@material-ui/core/Typography';

class Help extends React.Component{
    render() {
        let {description} = this.props.form
        return (
            <Typography variant="body2">{description}</Typography>
        )
    }
}

export default Help;
