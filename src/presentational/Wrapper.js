import React from 'react';
// Components
import WrapperErrorBoundary from '../error-boundaries/WrapperErrorBoundary';
import Form from '../containers/Form';
// Theme
import Grid from '@material-ui/core/Grid';

const Wrapper = () => {

    return (
        <WrapperErrorBoundary>
            <Grid container alignItems="center" justify="center">
                <Grid item xs={10} sm={8} md={8} lg={8} xl={8}>
                    <Form />
                </Grid>
            </Grid>
        </WrapperErrorBoundary>
    );
}

export default Wrapper;