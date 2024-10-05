import { Box, Button, Divider, Drawer, Grid, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { BsFillMenuButtonWideFill } from 'react-icons/bs';
import { VscClose } from 'react-icons/vsc';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useIsMobile } from '../../../../hook/useIsMobile';
import { useRouter } from 'next/router';
import { PartMenu } from '../Video/PartMenu';

export const Quiz = () => {
    const [open, setOpen] = useState<boolean>(false);
    const matches = useIsMobile();
    const router = useRouter();

    return (
        <Grid container minHeight="calc(100vh - 250px)">
            {matches && (
                <BsFillMenuButtonWideFill
                    style={{
                        position: 'absolute',
                        top: 25,
                        left: 25,
                        fontSize: '22px',
                        color: '#751A29',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        console.log('sad');

                        setOpen(true);
                    }}
                />
            )}
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                sx={{ '.MuiDrawer-paper': { width: '100%' } }}
                anchor="right"
            >
                <Box sx={{ background: '#e0d0c3', padding: '15px', height: '100%' }}>
                    <Box
                        sx={{
                            background: '#fff',
                            padding: '15px',
                            boxShadow: 3,
                            borderRadius: '30px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            position: 'relative',
                            transition: 'width 0.4s',
                            height: '100%',
                        }}
                    >
                        <Stack>
                            <Stack
                                direction={'row'}
                                justifyContent={'space-between'}
                                alignItems={'start'}
                            >
                                <img src="/images/logo.svg" width={'140px'} />
                                <VscClose
                                    size={50}
                                    color="#751A29"
                                    cursor={'pointer'}
                                    onClick={() => setOpen(false)}
                                />
                            </Stack>

                            <Divider sx={{ height: '1px', width: '100%' }} />

                            <PartMenu open={open} setOpen={setOpen} />
                        </Stack>
                    </Box>
                </Box>
            </Drawer>
            <Grid item md={7.8} xs={12}>
                <Stack gap={3}>
                    <Box
                        sx={{
                            background: '#FFF',
                            p: '20px 25px',
                            borderRadius: '20px 20px 20px 20px',
                            position: 'relative',
                            border: '1px solid #751A298F',
                        }}
                        height={550}
                        overflow={'auto'}
                    >
                        <Stack mb={3} direction={'row'} alignItems={'center'}>
                            <MoreVertIcon fontSize="small" color="primary" />
                            <Typography variant="h2">سوالات جلسه اول</Typography>
                        </Stack>
                        <Typography>برای مشاهده جزئیات روی کلمات کلیک نمائید.</Typography>
                        <Divider sx={{ mt: 1 }} />
                        <Typography
                            variant="button"
                            fontFamily={'mr-eaves-modern'}
                            sx={{ direction: 'rtl' }}
                            textAlign={'left'}
                            display={'flex'}
                            mt={2}
                        >
                            Listen to the voice message and put the words in the right order.
                        </Typography>
                        <Typography
                            sx={{ direction: 'rtl' }}
                            variant="button"
                            textAlign={'left'}
                            display={'flex'}
                        >
                            به ویس گوش بدید و کلمات را در ترتیب درست قرار دهید.
                        </Typography>
                        <Divider sx={{ mt: 2 }} />

                        <Box>
                            <Stack
                                direction={matches ? 'column' : 'row'}
                                justifyContent={'space-between'}
                                mt={2}
                                mb={2}
                            >
                                <div>
                                    <audio controls>
                                        <source src="sample.mp3" type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                                <Typography
                                    variant="button"
                                    fontFamily={'mr-eaves-modern'}
                                    sx={{ direction: 'rtl' }}
                                    textAlign={'left'}
                                    display={'flex'}
                                    alignItems={'center'}
                                >
                                    1. Is/a/kind/very/she/mother
                                </Typography>
                            </Stack>
                            <Grid container spacing={[2, 1]}>
                                <Grid item md={4} xs={12}>
                                    <Stack direction={'row'} gap={1} width={'100%'}>
                                        <Button variant="outlined">مشاهده پاسخ</Button>
                                        <Button variant="contained" size="large">
                                            ثبت پاسخ
                                        </Button>
                                    </Stack>
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <TextField
                                        InputProps={{
                                            inputProps: {
                                                dir: 'ltr', // Force the text input to be LTR
                                            },
                                        }}
                                        name="1"
                                        // label="Type your answer"
                                        fullWidth
                                        placeholder="Type your answer"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Divider sx={{ m: '20px 0' }} />
                        <Box>
                            <Stack
                                direction={matches ? 'column' : 'row'}
                                justifyContent={'space-between'}
                                mt={2}
                                mb={2}
                            >
                                <div>
                                    <audio controls>
                                        <source src="sample.mp3" type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                                <Typography
                                    variant="button"
                                    fontFamily={'mr-eaves-modern'}
                                    sx={{ direction: 'rtl' }}
                                    textAlign={'left'}
                                    display={'flex'}
                                    alignItems={'center'}
                                >
                                    1. Is/a/kind/very/she/mother
                                </Typography>
                            </Stack>
                            <Grid container spacing={[2, 1]}>
                                <Grid item md={4} xs={12}>
                                    <Stack direction={'row'} gap={1} width={'100%'}>
                                        <Button variant="outlined">مشاهده پاسخ</Button>
                                        <Button variant="contained" size="large">
                                            ثبت پاسخ
                                        </Button>
                                    </Stack>
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <TextField
                                        InputProps={{
                                            inputProps: {
                                                dir: 'ltr', // Force the text input to be LTR
                                            },
                                        }}
                                        name="1"
                                        // label="Type your answer"
                                        fullWidth
                                        placeholder="Type your answer"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Divider sx={{ m: '20px 0' }} />
                        <Box>
                            <Stack
                                direction={matches ? 'column' : 'row'}
                                justifyContent={'space-between'}
                                mt={2}
                                mb={2}
                            >
                                <div>
                                    <audio controls>
                                        <source src="sample.mp3" type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                                <Typography
                                    variant="button"
                                    fontFamily={'mr-eaves-modern'}
                                    sx={{ direction: 'rtl' }}
                                    textAlign={'left'}
                                    display={'flex'}
                                    alignItems={'center'}
                                >
                                    1. Is/a/kind/very/she/mother
                                </Typography>
                            </Stack>
                            <Grid container spacing={[2, 1]}>
                                <Grid item md={4} xs={12}>
                                    <Stack direction={'row'} gap={1} width={'100%'}>
                                        <Button variant="outlined">مشاهده پاسخ</Button>
                                        <Button variant="contained" size="large">
                                            ثبت پاسخ
                                        </Button>
                                    </Stack>
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <TextField
                                        InputProps={{
                                            inputProps: {
                                                dir: 'ltr', // Force the text input to be LTR
                                            },
                                        }}
                                        name="1"
                                        // label="Type your answer"
                                        fullWidth
                                        placeholder="Type your answer"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Divider sx={{ m: '20px 0' }} />
                    </Box>
                </Stack>
            </Grid>
            <Grid item md={0.2} xs={12}></Grid>
            {!matches && (
                <Grid item md={4} xs={12}>
                    <Stack
                        sx={{
                            background: '#E1D0C3',
                            p: '20px 25px',
                            borderRadius: '20px 20px 20px 20px',
                            position: 'relative',
                            height: '100%',
                        }}
                        gap={8}
                    >
                        <PartMenu open={open} setOpen={setOpen} />
                    </Stack>
                </Grid>
            )}
        </Grid>
    );
};
