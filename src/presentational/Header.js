import React from 'react';
// Theme
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    typography: {
        fontWeight: 300,
        marginBottom: theme.spacing(5),
    }
}));

const Header = (props) => {

    const classes = useStyles();

    return (
        <Typography className={classes.typography} variant="h4" align="center">Tax Free Investment Application</Typography>
    );
}

export default Header;