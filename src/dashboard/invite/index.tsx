import { Grid, Stack } from '@mui/material';
import React from 'react';
import { Support } from '../index/Support';
import { FutureCourses } from '../profile/FutureCourses';
import { UserAvatar } from '../profile/UserAvatar';
import { Code } from './Code';
import { InvitedUsers } from './InvitedUsers';
import { useIsMobile } from '../../hook/useIsMobile';

export const Invite = () => {
    const matches = useIsMobile();

    return (
        <Grid container rowSpacing={2}>
            <Grid item md={7.8} xs={12}>
                <Stack gap={3}>
                    <UserAvatar />
                    <Code />
                    <InvitedUsers />
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
                    gap={matches ? 2 : 8}
                >
                    <FutureCourses />
                    <Support />
                </Stack>
            </Grid>
        </Grid>
    );
};
