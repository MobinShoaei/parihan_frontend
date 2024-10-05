import {
    Box,
    Button,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
} from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRouter } from 'next/router';
import { FaBook, FaEye, FaSpellCheck, FaFileAlt } from 'react-icons/fa';
import { useIsMobile } from '../../../../hook/useIsMobile';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import TaskIcon from '@mui/icons-material/Task';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

export const PartMenu = (props: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const router = useRouter();
    const matches = useIsMobile();
    const { slug } = router.query; // Extract slug from URL
    console.log;
    const MenuList = () => {
        return (
            <List
                sx={{
                    width: '100%',
                    '& .Mui-selected': {
                        backgroundColor: '#fff !important',
                        color: '#1A1A1A',
                        borderRadius: '10px',
                        border: '1px solid #751A298F',
                    },
                    '& .Mui-selected:hover': {
                        background: 'rgb(117, 26, 41)',
                    },
                    '& svg': {
                        color: '#d1c5bb',
                    },
                    '.muirtl-66vpte-MuiButtonBase-root-MuiListItemButton-root:hover': {
                        borderRadius: '10px',
                    },
                    '& .MuiListItemButton-root': {
                        borderRadius: '10px',
                    },
                    color: '#fff',
                }}
            >
                <ListItem disableGutters>
                    <ListItemButton
                        selected={router.pathname.includes('video')}
                        onClick={(event) =>
                            router.push(`/dashboard/courses/general-course/${slug}/video`)
                        }
                    >
                        <ListItemIcon>
                            <VideoFileIcon />
                        </ListItemIcon>
                        <ListItemText primary="توضیحات و ویدیو جلسه" />
                    </ListItemButton>
                </ListItem>
                <ListItem disableGutters>
                    <ListItemButton
                        selected={router.pathname.includes('words')}
                        onClick={(event) =>
                            router.push(`/dashboard/courses/general-course/${slug}/words`)
                        }
                    >
                        <ListItemIcon>
                            <InsertDriveFileIcon />
                        </ListItemIcon>
                        {<ListItemText primary="کلمات مرتبط با این جلسه" />}
                    </ListItemButton>
                </ListItem>
                <ListItem disableGutters>
                    <ListItemButton
                        selected={router.pathname.includes('quiz')}
                        onClick={(event) =>
                            router.push(`/dashboard/courses/general-course/${slug}/quiz`)
                        }
                    >
                        <ListItemIcon>
                            <TaskIcon />
                        </ListItemIcon>
                        {<ListItemText primary="سوالات این جلسه" />}
                    </ListItemButton>
                </ListItem>

                <ListItem disableGutters>
                    <ListItemButton
                        selected={router.pathname.includes('grammer')}
                        onClick={() =>
                            router.push(`/dashboard/courses/general-course/${slug}/grammer`)
                        }
                    >
                        <ListItemIcon>
                            <QuestionMarkIcon />
                        </ListItemIcon>
                        {<ListItemText primary="سوالات گرامری" />}
                    </ListItemButton>
                </ListItem>
            </List>
        );
    };

    return (
        <Stack
            sx={{
                background: '#751A29',
                borderRadius: '20px',
                p: '20px 20px',
                border: '1px solid #751A298F',
                '& .muirtl-xetjfm-MuiDivider-root': {
                    borderColor: '#ffffff69',
                },
                height: '100%',
            }}
            gap={2}
            justifyContent={'space-between'}
        >
            <Stack gap={2}>
                <Stack direction={'row'} alignItems={'center'}>
                    <MoreVertIcon fontSize="small" color="info" />
                    <Typography variant="h2" color={'#fff'}>
                        منوی آموزش
                    </Typography>
                </Stack>
                <Divider light={true} />
                <MenuList />
            </Stack>

            <Stack gap={1}>
                {/* <Button variant="outlined" color="secondary">
                    درس را مشاهده کردم
                </Button> */}
                <Divider light={true} />
                <ListItem
                    disableGutters
                    sx={{
                        color: '#fff',
                        '& svg': {
                            color: '#d1c5bb',
                        },
                    }}
                >
                    <ListItemButton
                        selected={
                            router.pathname.split('/').length == 3 &&
                            router.pathname.includes('courses')
                        }
                        onClick={(event) => {
                            router.push(`/dashboard/courses/general-course/`);
                        }}
                    >
                        <ListItemIcon>
                            <TextSnippetIcon />
                        </ListItemIcon>
                        <ListItemText primary="لیست جلسات دوره" />
                    </ListItemButton>
                </ListItem>
            </Stack>
        </Stack>
    );
};
