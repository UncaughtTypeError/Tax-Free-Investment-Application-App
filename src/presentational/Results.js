import React, { Fragment } from 'react';
// Theme
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    paper: {
        margin: theme.spacing(5,3),
        padding: theme.spacing(2),
    },
    typography: {
        fontWeight: 300,
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
}));

const Results = (props) => {

    const { EarliestPermissibleDebitOrderStartMonth, TotalContributions, ExcessContributions } = props;
    console.log(EarliestPermissibleDebitOrderStartMonth, TotalContributions, ExcessContributions, props);

    const classes = useStyles();

    return (
        <Paper className={classes.paper} my={5} px={2}>
            <Box display="flex" flexWrap="wrap" flexDirection="column" m={1}>
                <Box flexGrow={1}>
                    {EarliestPermissibleDebitOrderStartMonth && (
                        <Typography className={classes.typography} variant="h6" color="textSecondary">Debit Order Start Month: &nbsp;
                            <Typography display="inline" color="textPrimary">{EarliestPermissibleDebitOrderStartMonth}</Typography>
                        </Typography>
                    )}
                </Box>
                <Divider light className={classes.divider} />
                <Box flexGrow={1}>
                    {TotalContributions && (
                        <Typography className={classes.typography} variant="h6" color="textSecondary">Total Contributions: &nbsp;
                            <Typography display="inline" color="textPrimary">{TotalContributions}</Typography>
                            {ExcessContributions && (
                                <Typography className={classes.typography} variant="subtitle1">
                                    Your contributions are in excess of: &nbsp;
                                    <Typography display="inline" color="error">{ExcessContributions}</Typography>
                                </Typography>
                            )}
                        </Typography>
                    )}
                </Box>
            </Box>
        </Paper>
    );
}

export default Results;