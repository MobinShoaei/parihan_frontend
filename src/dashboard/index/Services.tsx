import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';

export const Services = () => {
    return (
        <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
                <Stack
                    sx={{
                        background: '#fff',
                        border: '1px solid #751A29',
                        borderRadius: '20px',
                        boxShadow: 2,
                    }}
                    height="100%"
                    justifyContent={'center'}
                    alignItems={'center'}
                    pb={'30px'}
                    gap={2}
                >
                    <img src="/images/Dashboard_icon_03.png" />
                    <Typography variant="h2" fontSize="20px">
                        گروه مکالمه تلگرامی
                    </Typography>
                </Stack>
            </Grid>
            <Grid item md={4} xs={12}>
                <Stack
                    sx={{
                        background: '#fff',
                        border: '1px solid #751A29',
                        borderRadius: '20px',
                        boxShadow: 2,
                    }}
                    height="100%"
                    justifyContent={'center'}
                    alignItems={'center'}
                    pb={'30px'}
                    gap={2}
                >
                    <img src="/images/Dashboard_icon_02.png" />
                    <Typography variant="h2" fontSize="20px">
                        تماس با مدرس
                    </Typography>
                </Stack>
            </Grid>
            <Grid item md={4} xs={12}>
                <Stack
                    sx={{
                        background: '#fff',
                        border: '1px solid #751A29',
                        borderRadius: '20px',
                        boxShadow: 2,
                    }}
                    height="100%"
                    justifyContent={'center'}
                    alignItems={'center'}
                    pb={'30px'}
                    gap={2}
                >
                    <img src="/images/Dashboard_icon_01.png" />
                    <Typography variant="h2" fontSize="20px">
                        شرکت در وبینار پریناز روحانی
                    </Typography>
                </Stack>
            </Grid>
        </Grid>
    );
};
