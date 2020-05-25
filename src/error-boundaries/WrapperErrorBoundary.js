import React from 'react';
// Theme
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = (theme) => ({
    typography: {
        fontWeight: 300,
        marginBottom: theme.spacing(5),
    }
});

class WrapperErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error({error}, errorInfo);
    }

    render() {

    const classes = this.props;

    if (this.state.hasError) {
        return (
            <Typography className={classes.typography} variant="h5" align="center">Sorry, something went wrong :(</Typography>
        );
    }

        return this.props.children; 
    }
}

export default withStyles(useStyles)(WrapperErrorBoundary);