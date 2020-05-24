import React, { Fragment, useState } from 'react';
// Components
import Results from '../presentational/Results';
// Utils
import applicationCheck from '../utils/utilities';
// 3rd Party
import { useForm } from "react-hook-form"; // form validation & submission
// Theme
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
    radioGroup: {
        flexDirection: 'row',
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
    inputBase: {
        '& legend': {
            fontSize: '1rem !important',
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: 'translate(14px, -6px)',
        }
    }
}));

const Form = () => {

    const { register, handleSubmit, setValue } = useForm();

    const   [fieldVisibility, setFieldVisibility] = useState('no'),
            [selectedDate, setSelectedDate] = useState({}),
            [applicationResults, setApplicationResults] = useState();

    const handleFieldVisibility = (event) => {
        setFieldVisibility(event.target.value);
    };

    const handleDebitMonthUpdate = (value) => {
        let monthValue = value ? value.month()+1 : null;
        setValue('DebitOrderStartMonth', monthValue);
        setSelectedDate({ ...selectedDate, 'DebitOrderStartMonth': value });
    }

    const handleLumpSumMonthUpdate = (value) => {
        let monthValue = value ? value.month()+1 : null;
        setValue('LumpSumInvestmentMonth', monthValue);
        setSelectedDate({ ...selectedDate, 'LumpSumInvestmentMonth': value });
    }

    const onSubmit = (formData) => {
        setApplicationResults(applicationCheck(formData));
    }
    
    React.useEffect(() => {
        register({ name: 'DebitOrderStartMonth', value: new Date().getMonth()+1 });
        register({ name: 'LumpSumInvestmentMonth', value: new Date().getMonth()+1 });
        register({ name: 'DebitOrderAmount', value: 2500 });
        register({ name: 'LumpSumInvestmentAmount', value: 0 });
    }, [register]);

    const classes = useStyles();

    return (
        <Fragment>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Box display="flex" flexWrap="wrap" m={1}>
                        <Box width="50%" px={2}>
                            <FormControl component="fieldset" fullWidth={true}>
                                <FormLabel component="legend">Investment Lump Sum</FormLabel>
                                <RadioGroup aria-label="Investment Lump Sum" name="investmentLumpSum" value={fieldVisibility} onChange={handleFieldVisibility}>
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                </RadioGroup>
                                <FormHelperText>Kick start your investment with a lump sum</FormHelperText>
                            </FormControl>
                        </Box>
                        <Box width="50%" px={2}>
                            <KeyboardDatePicker 
                                name="DebitOrderStartMonth"
                                className={classes.inputBase}
                                disableToolbar
                                fullWidth={true}
                                variant="inline"
                                views={["month"]}
                                format="MM"
                                disablePast={true}
                                margin="normal"
                                label="First debit month"
                                helperText="The first month your debit order will be taken"
                                inputVariant="outlined"
                                KeyboardButtonProps={{
                                    'aria-label': 'Change first debit month',
                                }}
                                value={selectedDate.DebitOrderStartMonth}
                                onChange={(value) => handleDebitMonthUpdate(value)}
                            />
                        </Box>
                    </Box>
                    {fieldVisibility === 'yes' && (
                        <Box display="flex" flexWrap="wrap" m={1}>
                            <Box width="50%" px={2}>
                                { /* TODO : separator and decimal formatting, input masks, and other input constraints (e.g: max length) */ }
                                <TextField 
                                    name="LumpSumInvestmentAmount"
                                    className={classes.inputBase}
                                    required 
                                    fullWidth={true}
                                    margin="normal"
                                    label="Lump Sum Amount" 
                                    aria-label="Lump Sum Amount" 
                                    variant="outlined" 
                                    helperText="Enter an amount no greater than R30,000"
                                    type="number"
                                    InputProps={{ // component props
                                        startAdornment: <InputAdornment position="start">R</InputAdornment>,
                                    }}
                                    inputProps={{ // input element props
                                        'max': '30000',
                                    }}
                                    inputRef={register({ required: true, max: 30000 })}
                                />
                            </Box>
                            <Box width="50%" px={2}>
                                <KeyboardDatePicker
                                    name="LumpSumInvestmentMonth"
                                    className={classes.inputBase}
                                    required 
                                    disableToolbar
                                    fullWidth={true}
                                    variant="inline"
                                    views={["month"]}
                                    format="MM"
                                    disablePast={true}
                                    margin="normal"
                                    label="Lump Sum Investment Month"
                                    helperText="The month your lump sum will be invested"
                                    inputVariant="outlined"
                                    KeyboardButtonProps={{
                                        'aria-label': 'Change lump sum investment month',
                                    }}
                                    value={selectedDate.LumpSumInvestmentMonth}
                                    onChange={(value) => handleLumpSumMonthUpdate(value)}
                                />
                            </Box>
                        </Box>
                    )}
                    <Box display="flex" flexWrap="wrap" flexDirection="column" m={1}>
                        <Box px={2}>
                            <Divider className={classes.divider} />
                            <Button variant="outlined" size="large" type="submit">Submit</Button>
                        </Box>
                    </Box>
                </MuiPickersUtilsProvider>
            </form>
            {applicationResults && <Results { ...applicationResults } />}
        </Fragment>
    );
}

export default Form;