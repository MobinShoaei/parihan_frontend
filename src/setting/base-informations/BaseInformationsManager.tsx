import {Grid} from '@mui/material';
import React from 'react';
import {BaseInformations} from './BaseInformations';

export const BaseInformationsManager = () => {
    return (
        <Grid container spacing={'20px'}>
            <Grid item md={3.9} xs={12}/>
            <Grid item md={4.2} xs={12}>
                <BaseInformations/>
            </Grid>
            <Grid item md={3.9} xs={12}/>
        </Grid>
    );
};
