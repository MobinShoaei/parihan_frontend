import { Grid } from '@mui/material';
import React from 'react';
import { CallText } from './CallText';

export const CallTextManager = () => {
    return (
        <Grid container spacing={'20px'}>
            <Grid item md={3.9} xs={12} />
            <Grid item md={4.2} xs={12}>
                <CallText />
            </Grid>
            <Grid item md={3.9} xs={12} />
        </Grid>
    );
};
