import React from 'react';
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
        '& small': {
            fontSize: 12,
        }
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
}));

const Results = (props) => {

    const { EarliestPermissibleDebitOrderStartMonth, TotalContributions, ExcessContributions } = props;
    //console.log(EarliestPermissibleDebitOrderStartMonth, TotalContributions, ExcessContributions, props);

    const classes = useStyles();

    return (
        <Paper className={classes.paper} my={5} px={2}>
            <Box display="flex" flexWrap="wrap" flexDirection="column" m={1}>
                <Box flexGrow={1}>
                    {EarliestPermissibleDebitOrderStartMonth && (
                        <Typography className={classes.typography} variant="h6" color="textSecondary">Debit Order Start Month: &nbsp;
                            <Typography display="inline" color="textPrimary">{EarliestPermissibleDebitOrderStartMonth}</Typography> &nbsp;
                            <Typography display="inline" color="textSecondary"><sup>(2,500 pm)</sup></Typography>
                        </Typography>
                    )}
                </Box>
                <Divider light className={classes.divider} />
                <Box flexGrow={1}>
                    {TotalContributions && (
                        <Typography className={classes.typography} variant="h6" color="textSecondary">Total Contributions: &nbsp;
                            <Typography display="inline" color="textPrimary">{TotalContributions}</Typography>
                            {(Number(ExcessContributions) > 0) && (
                                <Typography className={classes.typography} variant="subtitle1">
                                    Your contributions are in excess of: &nbsp;
                                    <Typography display="inline" color="error">{ExcessContributions}</Typography> *<br/>
                                    <Typography display="inline" component="small" color="textSecondary">* Consider adjusting your first debit month to the suggested start month above or reducing the investment amount</Typography>
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