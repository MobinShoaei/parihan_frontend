import {Box, Divider, Grid, Skeleton, Tabs} from '@mui/material';
import React from 'react';

export const FormSkeleton = () => {
    return (
        <Grid item md={6} xs={12}>
            <Skeleton height={'150px'}/>
        </Grid>
    );
};

export const DashboardSkeleton: React.FC = () => {
    const style = {
        height: 'calc(100vh - 135px)',
        background: '#FFFFFF',
        border: '1px solid',
        borderColor: 'secondary.light',
        borderRadius: '6px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'none',
        '& .MuiTableContainer-root': {
            borderRadius: '6px',
        },
        width: '100%',
        overflow: 'auto',

    };

    const Header = () => {
        return (
            <React.Fragment>
                <Box sx={{padding: '10px 20px', display: 'flex', gap: 1}}>
                    <Skeleton width={'15%'}/>
                    <Skeleton width={'15%'}/>
                </Box>
                <Divider/>
            </React.Fragment>
        );
    };

    return (
        <Grid container spacing={'20px'} sx={{height: '100%'}}>
            <Grid item md={4.2} xs={12}>
                <Box sx={style}>
                    <Header/>

                    <Box sx={{padding: '10px 20px'}}>
                        {[...Array(10)].map((item, key) => {
                            return <Skeleton height={'100px'} key={key}/>;
                        })}
                    </Box>
                </Box>
            </Grid>
            <Grid item md={7.6} xs={12}>
                <Box sx={style}>
                    <Header/>
                    <Grid container sx={{padding: '10px 20px'}} columnSpacing={4}>
                        {[...Array(8)].map((item, key) => {
                            return <FormSkeleton key={key}/>;
                        })}
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};
