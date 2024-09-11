import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Box,
    Button,
    Divider,
    Drawer,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
} from '@mui/material';
import { Support } from '../index/Support';
import { Menu } from './Menu';
import { useIsMobile } from '../../hook/useIsMobile';
import { BsFillMenuButtonWideFill } from 'react-icons/bs';
import { VscClose } from 'react-icons/vsc';
import { useRouter } from 'next/router';
import { FaBook, FaEye, FaSpellCheck, FaFileAlt } from 'react-icons/fa';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

export const SeenLessons = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>('all');
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
                        setOpen(true);
                    }}
                />
            )}
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                sx={{ '.muirtl-4t3x6l-MuiPaper-root-MuiDrawer-paper': { width: '100%' } }}
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

                            <List
                                sx={{
                                    width: '100%',
                                    '& .Mui-selected': {
                                        color: '#fff !important',
                                        background: 'rgb(117, 26, 41) !important',
                                        borderRadius: '10px',
                                    },
                                    '& .Mui-selected:hover': {
                                        background: 'rgb(117, 26, 41)',
                                    },
                                    '& svg': {
                                        color: '#d1c5bb',
                                    },
                                    '.muirtl-66vpte-MuiButtonBase-root-MuiListItemButton-root:hover':
                                        {
                                            borderRadius: '10px',
                                        },
                                    '& .MuiListItemButton-root': {
                                        borderRadius: '10px',
                                    },
                                }}
                            >
                                <ListItem disableGutters>
                                    <ListItemButton
                                        selected={
                                            router.pathname.split('/').length == 3 &&
                                            router.pathname.includes('courses')
                                        }
                                        onClick={(event) => router.push('/dashboard/courses')}
                                    >
                                        <ListItemIcon>
                                            <FaBook />
                                        </ListItemIcon>
                                        <ListItemText primary="دوره‌های آموزشی من" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disableGutters>
                                    <ListItemButton
                                        selected={router.pathname.includes('seen-lessons')}
                                        onClick={(event) =>
                                            router.push('/dashboard/courses/seen-lessons')
                                        }
                                    >
                                        <ListItemIcon>
                                            <FaEye />
                                        </ListItemIcon>
                                        {<ListItemText primary="درس های دیده شده" />}
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disableGutters>
                                    <ListItemButton
                                        selected={router.pathname.includes('seen-words')}
                                        onClick={(event) =>
                                            router.push('/dashboard/courses/seen-words')
                                        }
                                    >
                                        <ListItemIcon>
                                            <FaSpellCheck />
                                        </ListItemIcon>
                                        {<ListItemText primary="کلمات درس های دیده شده" />}
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disableGutters>
                                    <ListItemButton
                                        selected={router.pathname.includes('/dashboard/scors')}
                                        onClick={() => router.push('scors')}
                                    >
                                        <ListItemIcon>
                                            <FaFileAlt />
                                        </ListItemIcon>
                                        {<ListItemText primary="مقالات انگلیسی" />}
                                    </ListItemButton>
                                </ListItem>
                            </List>
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
                        <Stack direction={'row'} alignItems={'center'}>
                            <MoreVertIcon fontSize="small" color="primary" />
                            <Typography variant="h2">درس‌های دیده شده</Typography>
                        </Stack>
                        <Typography mt={2}>
                            در این بخش شما درس هایی که تا به الان مطالعه نموده اید رو می‌توانید مرور
                            نمائید.
                        </Typography>

                        <Divider sx={{ mt: 2 }} />
                        <List
                            sx={{ width: '100%', bgcolor: 'background.paper' }}
                            aria-label="contacts"
                        >
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <BookmarkAddedIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary="جلسه اول (meeting)" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <BookmarkAddedIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary="جلسه اول (meeting)" />
                                </ListItemButton>
                            </ListItem>
                        </List>
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
                        <Menu open={open} setOpen={setOpen} />
                    </Stack>
                </Grid>
            )}
        </Grid>
    );
};
