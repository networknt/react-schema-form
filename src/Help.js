// @flow
/**
 * Created by steve on 20/09/15.
 */
import React from "react";
import Typography from "@material-ui/core/Typography";

type Props = {
    form: any
};

const Help = ({ form: { description } }: Props) => (
    <Typography variant="body2">{description}</Typography>
);

export default Help;
