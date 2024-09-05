import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { MyCourses } from './MyCourses';
import { TodayHint } from './TodayHint';
import { Services } from './Services';
import { UserInfo } from './UserInfo';
import { Support } from './Support';

export const DashboardIndex = () => {
    return (
        <Grid container>
            <Grid item md={7.8} xs={12}>
                <Stack gap={3}>
                    <TodayHint />
                    <MyCourses />
                    <Services />
                </Stack>
            </Grid>
            <Grid item md={0.2} xs={12}></Grid>
            <Grid item md={4} xs={12}>
                <Stack
                    sx={{
                        background: '#E1D0C3',
                        p: '20px 25px',
                        borderRadius: '20px 20px 20px 20px',
                        position: 'relative',
                    }}
                    gap={8}
                >
                    <UserInfo />
                    <Support />
                </Stack>
            </Grid>
        </Grid>
    );
};
