import {
    Box,
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
import { useIsMobile } from '../../hook/useIsMobile';
import { FaBook, FaEye, FaSpellCheck, FaFileAlt } from 'react-icons/fa';

export const Menu = (props: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const router = useRouter();
    const matches = useIsMobile();

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
                        onClick={(event) => router.push('/dashboard/courses/seen-lessons')}
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
                        onClick={(event) => router.push('/dashboard/courses/seen-words')}
                    >
                        <ListItemIcon>
                            <FaSpellCheck />
                        </ListItemIcon>
                        {<ListItemText primary="کلمات درس های دیده شده" />}
                    </ListItemButton>
                </ListItem>

                <ListItem disableGutters>
                    <ListItemButton
                        selected={router.pathname.includes('article')}
                        onClick={() => router.push('/dashboard/courses/article')}
                    >
                        <ListItemIcon>
                            <FaFileAlt />
                        </ListItemIcon>
                        {<ListItemText primary="مقالات انگلیسی" />}
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
        >
            <Stack direction={'row'} alignItems={'center'}>
                <MoreVertIcon fontSize="small" color="info" />
                <Typography variant="h2" color={'#fff'}>
                    منوی آموزش
                </Typography>
            </Stack>
            <Divider light={true} />
            <MenuList />
        </Stack>
    );
};
