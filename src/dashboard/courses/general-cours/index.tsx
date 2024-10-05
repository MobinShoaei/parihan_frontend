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
import { useIsMobile } from '../../../hook/useIsMobile';
import { BsFillMenuButtonWideFill } from 'react-icons/bs';
import { VscClose } from 'react-icons/vsc';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CourseMenu } from './CoursMenu';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import { useRouter } from 'next/router';

export const GeneralCours = () => {
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

                            <CourseMenu />
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
                            <Typography variant="h2">
                                در این دوره چه چیزهایی رو یاد خواهید گرفت
                            </Typography>
                        </Stack>
                        <Grid container spacing={[4, 4]}>
                            <Grid item md={8} xs={12}>
                                <div id="container">
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
                                </div>
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <Stack justifyContent={'space-between'} height={'90%'}>
                                    <Stack gap={1} mt={1}>
                                        <Stack direction={'row'} gap={1}>
                                            <NewspaperOutlinedIcon color="secondary" />
                                            <Typography>36 جلسه</Typography>
                                        </Stack>
                                        <Stack direction={'row'} gap={1}>
                                            <QuizOutlinedIcon color="secondary" />
                                            <Typography>۴ ساعت ویدیو آموزشی</Typography>
                                        </Stack>
                                        <Stack direction={'row'} gap={1}>
                                            <NewspaperOutlinedIcon color="secondary" />
                                            <Typography>کلمات هر درس با آموزش</Typography>
                                        </Stack>
                                        <Stack direction={'row'} gap={1}>
                                            <NewspaperOutlinedIcon color="secondary" />
                                            <Typography>تست های هر درس</Typography>
                                        </Stack>
                                        <Stack direction={'row'} gap={1}>
                                            <NewspaperOutlinedIcon color="secondary" />
                                            <Typography>تست های گرامری</Typography>
                                        </Stack>
                                    </Stack>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        size="large"
                                        endIcon={<PlayCircleIcon />}
                                        onClick={() => {
                                            router.push(
                                                `/dashboard/courses/general-course/1/video`,
                                            );
                                        }}
                                    >
                                        شروع دوره
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Divider sx={{ height: '1px', width: '100%', mt: 1 }} />
                        <List>
                            <ListItem disablePadding>
                                <ListItemIcon sx={{ minWidth: 35 }}>
                                    <EditAttributesIcon color="secondary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="یادگاری گرامر های زبان انگلیسی از پایه تا پیشرفته به صورت کاربردی و موقعیت محور
جوری یادشون میگیری که نیاز نباشه دوباره بشینی و اون گرامر رو بخونی "
                                />
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemIcon sx={{ minWidth: 35 }}>
                                    <EditAttributesIcon color="secondary" />
                                </ListItemIcon>
                                <ListItemText primary="یادگیری و تمرین بر روی هر 4 مهارت زبان انگلیسی با تمرکز اصلی بر روی مهارت مکالمه Speaking, writing, reading, listening" />
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemIcon sx={{ minWidth: 35 }}>
                                    <EditAttributesIcon color="secondary" />
                                </ListItemIcon>
                                <ListItemText primary="یادگیری اصطلاحات و لغات پر کاربرد زبان انگلیسی در طی جلسات مختلف" />
                            </ListItem>
                        </List>
                    </Box>
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
                            <Typography variant="h2">مدرس دوره</Typography>
                        </Stack>
                        <Stack
                            direction={'row'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                        >
                            <Stack direction={'row'} gap={2}>
                                <Avatar
                                    src="/images/rohani.png"
                                    alt="author image"
                                    sx={{ width: '80px', height: '80px' }}
                                />
                                <Stack gap={0} justifyContent={'space-evenly'}>
                                    <Typography fontSize={18}>پریناز روحانی</Typography>
                                    <Rating name="read-only" value={5} readOnly />
                                </Stack>
                            </Stack>
                            <Link
                                href="#"
                                variant="body2"
                                fontSize={'20px'}
                                align="center"
                                display={'block'}
                                height={'100%'}
                            >
                                مشاهده پروفایل مدرس
                            </Link>
                        </Stack>
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
                        <Stack
                            sx={{
                                background: '#fff',
                                borderRadius: '20px',
                                p: '20px 20px',
                                border: '1px solid #751A298F',
                            }}
                            gap={3}
                        >
                            <CourseMenu />
                        </Stack>
                    </Stack>
                </Grid>
            )}
        </Grid>
    );
};
