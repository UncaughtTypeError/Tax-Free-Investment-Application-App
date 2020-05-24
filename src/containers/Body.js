import React from 'react';
// Theme
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(5, 2, 5, 2),
    },
}));

const Body = (props) => {

    const { children } = props;
    const classes = useStyles();

    return (
        <Container className={classes.root} maxWidth="lg">
            {children}
        </Container>
    );
}

export default Body;