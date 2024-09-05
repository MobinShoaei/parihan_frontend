import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const MyCourses = () => {
    return (
        <Box
            sx={{
                background: '#E1D0C3',
                p: '20px 25px',
                borderRadius: '20px 20px 20px 20px',
                position: 'relative',
            }}
        >
            <Stack direction={'row'} alignItems={'center'}>
                <MoreVertIcon fontSize="small" color="primary" />
                <Typography variant="h2">دوره های آموزشی من</Typography>
            </Stack>
            <Grid container sx={{ background: '#fff', mt: 3, borderRadius: '20px' }}>
                <Grid item md={8} xs={12}>
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        padding={'15px 0px'}
                        justifyContent={'space-evenly'}
                    >
                        <img src="/images/general_english_icon.png" />
                        <Stack justifyContent={'center'} alignItems={'center'} gap={1}>
                            <Typography variant="h2">دوره عمومی زبان انگلیسی</Typography>
                            <Typography fontFamily={'mr-eaves-modern'} fontSize={25}>
                                General English Course
                            </Typography>
                            <Button variant="contained" fullWidth size="large">
                                شروع دوره
                            </Button>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid
                    item
                    md={4}
                    xs={12}
                    sx={{ background: '#751A29', borderRadius: '0px 20px 20px 0 ' }}
                >
                    <Stack
                        alignItems={'center'}
                        justifyContent={'center'}
                        height={'100%'}
                        padding="15px"
                        gap={2}
                    >
                        <Typography color="#fff" fontSize={20}>
                            بسته نقره ای
                        </Typography>
                        <Button
                            fullWidth
                            color="primary"
                            sx={{
                                background: '#E1D0C3',
                                '&:hover': {
                                    background: '#E1D0C3',
                                },
                            }}
                            size="large"
                        >
                            ارتقاع به بسته طلایی
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};
