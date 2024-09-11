import { Grid, Stack } from '@mui/material';
import React from 'react';
import { Support } from '../index/Support';
import { FutureCourses } from '../profile/FutureCourses';
import { UserAvatar } from '../profile/UserAvatar';
import { useIsMobile } from '../../hook/useIsMobile';
import { Code } from '../invite/Code';
import { InvitedUsers } from '../invite/InvitedUsers';
import { TotalCoin } from '../profile/TotalCoin';
import { InvitedCoin } from '../profile/InvitedCoin';
import { WordScore } from './WordScore';
import { ScoreList } from './ScoreList';
import { Guide } from './Guide';
import { GetScoreGuide } from './GetScoreGuide';

export const MyScors = () => {
    const matches = useIsMobile();

    return (
        <Grid container rowSpacing={2}>
            <Grid item md={7.8} xs={12}>
                <Stack gap={3}>
                    <UserAvatar />
                    <Grid container spacing={3}>
                        <Grid item md={4} xs={12}>
                            <TotalCoin />
                        </Grid>
                        <Grid item md={8} xs={12}>
                            <WordScore />
                        </Grid>
                    </Grid>
                    <ScoreList />
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
                    <Guide />
                    <GetScoreGuide />
                </Stack>
            </Grid>
        </Grid>
    );
};
