/**
 * Created by steve on 20/09/15.
 */
import React from 'react';
import classNames from 'classnames';

class Help extends React.Component{
    render() {
        let classes = classNames(this.props.form.htmlClass);
        //console.log('Help:', this.props);
        return (
            <div className={classes} dangerouslySetInnerHTML={{__html: this.props.form.description}}  />
        )
    }
}

export default Help;
