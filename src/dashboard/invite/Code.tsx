import { Grid, Link, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';

export const Code = () => {
    return (
        <Stack
            sx={{
                background: '#fff',
                borderRadius: '20px',
                p: '20px 20px',
                border: '1px solid #751A298F',
            }}
            gap={3}
        >
            <Stack direction={'row'} alignItems={'center'}>
                <MoreVertIcon fontSize="small" color="primary" />
                <Typography variant="h2"> کد معرف شما</Typography>
            </Stack>
            <Grid container rowSpacing={2}>
                <Grid item md={6} xs={12}>
                    <TextField disabled value={'zwer9m'} fullWidth />
                </Grid>
                <Grid item md={6} xs={12} justifyContent={'center'}>
                    <Link
                        href="#"
                        variant="body2"
                        fontSize={'20px'}
                        align="center"
                        width={'100% '}
                        display={'block'}
                        height={'100%'}
                    >
                        <ShareIcon fontSize="small" />
                        به اشتراک بگذارید
                    </Link>
                </Grid>
            </Grid>
        </Stack>
    );
};
