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
import { useRouter } from 'next/router';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import EditIcon from '@mui/icons-material/Edit';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import FastForwardIcon from '@mui/icons-material/FastForward';
import { PartMenu } from '../Video/PartMenu';

export const Words = () => {
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
                            <Typography variant="h2">کلمات مرتبط با جلسه اول</Typography>
                        </Stack>
                        <Typography>برای مشاهده جزئیات روی کلمات کلیک نمائید.</Typography>
                        <Divider sx={{ mt: 1 }} />
                        <Grid container mt={2} height={400} overflow={'auto'}>
                            <Grid item md={6} xs={12}>
                                <Stack>
                                    <Typography variant="button">1. Road : جاده، مسیر</Typography>
                                    <Typography variant="button">1. Road : جاده، مسیر</Typography>
                                    <Typography variant="button">1. Road : جاده، مسیر</Typography>
                                    <Typography variant="button">1. Road : جاده، مسیر</Typography>
                                    <Typography variant="button">1. Road : جاده، مسیر</Typography>
                                    <Typography variant="button">1. Road : جاده، مسیر</Typography>
                                    <Typography variant="button">1. Road : جاده، مسیر</Typography>
                                    <Typography variant="button">1. Road : جاده، مسیر</Typography>
                                    <Typography variant="button">1. Road : جاده، مسیر</Typography>
                                    <Typography variant="button">1. Road : جاده، مسیر</Typography>
                                    <Typography variant="button">1. Road : جاده، مسیر</Typography>
                                </Stack>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Stack>
                                    <Typography variant="button">1. Road : جاده، مسیر</Typography>
                                    <Typography variant="button">1. Road : جاده، مسیر</Typography>
                                    <Typography variant="button">1. Road : جاده، مسیر</Typography>
                                    <Typography variant="button">1. Road : جاده، مسیر</Typography>
                                    <Typography variant="button">1. Road : جاده، مسیر</Typography>
                                    <Typography variant="button">1. Road : جاده، مسیر</Typography>
                                    <Typography variant="button">1. Road : جاده، مسیر</Typography>
                                    <Typography variant="button">1. Road : جاده، مسیر</Typography>
                                    <Typography variant="button">1. Road : جاده، مسیر</Typography>
                                    <Typography variant="button">1. Road : جاده، مسیر</Typography>
                                    <Typography variant="button">1. Road : جاده، مسیر</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
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
