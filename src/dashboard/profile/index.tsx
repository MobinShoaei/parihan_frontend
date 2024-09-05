import { Grid, Stack } from '@mui/material';
import React from 'react';
import { Support } from '../index/Support';
import { UserAvatar } from './UserAvatar';
import { UserForm } from './UserForm';
import { TotalCoin } from './TotalCoin';
import { InvitedCoin } from './InvitedCoin';
import { FutureCourses } from './FutureCourses';

export const Profile = () => {
    return (
        <Grid container>
            <Grid item md={7.8} xs={12}>
                <Stack gap={3}>
                    <UserAvatar />
                    <UserForm />
                    <Grid container spacing={3}>
                        <Grid item md={4} xs={12}>
                            <TotalCoin />
                        </Grid>
                        <Grid item md={8} xs={12}>
                            <InvitedCoin />
                        </Grid>
                    </Grid>
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
                    <FutureCourses />
                    <Support />
                </Stack>
            </Grid>
        </Grid>
    );
};
