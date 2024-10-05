import {
    Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    Grid,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Rating,
    Stack,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { BsFillMenuButtonWideFill } from 'react-icons/bs';
import { VscClose } from 'react-icons/vsc';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useIsMobile } from '../../../../hook/useIsMobile';
import { PartMenu } from './PartMenu';
import { useRouter } from 'next/router';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import EditIcon from '@mui/icons-material/Edit';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import FastForwardIcon from '@mui/icons-material/FastForward';

export const Video = () => {
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
                    >
                        <Stack mb={3} direction={'row'} alignItems={'center'}>
                            <MoreVertIcon fontSize="small" color="primary" />
                            <Typography variant="h2">جلسه اول: Meeting</Typography>
                        </Stack>
                        <video
                            id="video"
                            controls={true}
                            preload="none"
                            width="100%"
                            poster="https://assets.codepen.io/32795/poster.png"
                            style={{ borderRadius: '15px' }}
                        >
                            <source
                                id="mp4"
                                src="http://media.w3.org/2010/05/sintel/trailer.mp4"
                                type="video/mp4"
                            />
                            <source
                                id="webm"
                                src="http://media.w3.org/2010/05/sintel/trailer.webm"
                                type="video/webm"
                            />
                            <source
                                id="ogv"
                                src="http://media.w3.org/2010/05/sintel/trailer.ogv"
                                type="video/ogg"
                            />
                        </video>
                        <Divider sx={{ mt: 1 }} />
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <Stack gap={1} mt={1}>
                                <Stack direction={'row'} gap={1}>
                                    <MenuBookIcon color="secondary" />
                                    <Typography>Meeting</Typography>
                                </Stack>
                                <Stack direction={'row'} gap={1}>
                                    <BookmarksIcon color="secondary" />
                                    <Typography>سطح Basic</Typography>
                                </Stack>
                                <Stack direction={'row'} gap={1}>
                                    <EditIcon color="secondary" />
                                    <Typography>شامل ۸ تست </Typography>
                                </Stack>
                                <Stack direction={'row'} gap={1}>
                                    <MilitaryTechIcon color="secondary" />
                                    <Typography>۲۰ امتیاز</Typography>
                                </Stack>
                            </Stack>
                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                endIcon={<FastForwardIcon />}
                                onClick={() => {
                                    router.push(`/dashboard/courses/general-course/1/video`);
                                }}
                                sx={{ width: 150, height: 'fit-content', mt: 4 }}
                            >
                                جلسه بعدی
                            </Button>
                        </Stack>
                        <Divider sx={{ m: '10px 0' }} />
                        <Typography variant="button">
                            متون بلکه رو�نامه و مجله در ستون و سط�آنچنان که لا�م است و بر�ی شر�یط
                            فعلی تکنولوژی مو�د نیاز و
                        </Typography>
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
