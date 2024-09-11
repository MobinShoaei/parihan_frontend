import {
    Box,
    Collapse,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { MdOutlineSort } from 'react-icons/md';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import ContactSupportRoundedIcon from '@mui/icons-material/ContactSupportRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import { VscClose } from 'react-icons/vsc';

export const MobileSideBar = () => {
    const router = useRouter();

    const [subMenuOpen, setSubMenuOpen] = React.useState<boolean>(
        router.pathname.includes('general-course') || router.pathname.includes('vocabulary'),
    );

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
        console.log(newOpen);
    };

    const handleClick = () => {
        setSubMenuOpen(!subMenuOpen);
    };

    return (
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <MdOutlineSort
                color="#751A29"
                size={40}
                onClick={toggleDrawer(true)}
                cursor={'pointer'}
            />
            <img src="/images/logo.svg" width={'100px'} />
            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
                sx={{ '.muirtl-4t3x6l-MuiPaper-root-MuiDrawer-paper': { width: '100%' } }}
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
                                    direction: 'ltr',
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
                                            router.pathname.split('/').length == 2 &&
                                            router.pathname.includes('dashboard')
                                        }
                                        onClick={(event) => {
                                            router.push('/dashboard');
                                            setOpen(false);
                                        }}
                                    >
                                        <ListItemIcon>
                                            <DashboardRoundedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="داشبورد" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disableGutters>
                                    <ListItemButton
                                        selected={router.pathname.includes('profile')}
                                        onClick={(event) => {
                                            setOpen(false);
                                            router.push('/dashboard/profile');
                                        }}
                                    >
                                        <ListItemIcon>
                                            <ManageAccountsRoundedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="اطلاعات کاربری" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disableGutters>
                                    <ListItemButton
                                        selected={router.pathname.includes('invites')}
                                        onClick={(event) => {
                                            setOpen(false);
                                            router.push('/dashboard/invites');
                                        }}
                                    >
                                        <ListItemIcon>
                                            <GroupAddRoundedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="دعوت از دوستان" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItemButton
                                    selected={router.pathname.includes('courses')}
                                    onClick={() => {
                                        setOpen(false);
                                        router.push('/dashboard/courses');
                                    }}
                                >
                                    <ListItemIcon>
                                        <SchoolRoundedIcon />
                                    </ListItemIcon>
                                    {<ListItemText primary="آموزش و دوره‌ها" />}
                                    {subMenuOpen ? (
                                        <ExpandLess onClick={handleClick} />
                                    ) : (
                                        <ExpandMore onClick={handleClick} />
                                    )}
                                </ListItemButton>
                                <Collapse in={true} timeout="auto" unmountOnExit>
                                    <List
                                        component="div"
                                        disablePadding
                                        sx={{
                                            fontSize: '8px',
                                            '& .muirtl-cveggr-MuiListItemIcon-root': {
                                                // minWidth: '30px',
                                            },
                                            direction: 'ltr',
                                        }}
                                    >
                                        <ListItemButton
                                            onClick={() => {
                                                setOpen(false);
                                                router.push('general-course');
                                            }}
                                            sx={{
                                                // pl: 9,
                                                '& .MuiListItemText-root': {
                                                    color: router.pathname.includes(
                                                        '/dashboard/courses/general-course',
                                                    )
                                                        ? 'rgb(117, 26, 41)'
                                                        : '#000',
                                                },
                                                pl: 4,
                                            }}
                                        >
                                            <ListItemIcon>
                                                <DescriptionRoundedIcon />
                                            </ListItemIcon>
                                            {
                                                <ListItemText
                                                    sx={{
                                                        fontSize: '10px !important',
                                                    }}
                                                    primary="دوره عمومی زبان انگلیسی"
                                                />
                                            }
                                        </ListItemButton>
                                        <ListItemButton
                                            onClick={() => router.push('vocabulary')}
                                            sx={{
                                                '& .MuiListItemText-root': {
                                                    color: router.pathname.includes(
                                                        '/dashboard/courses/vocabulary',
                                                    )
                                                        ? 'rgb(117, 26, 41)'
                                                        : '#000',
                                                },
                                                pl: 4,
                                            }}
                                        >
                                            <ListItemIcon>
                                                <DescriptionRoundedIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="دوره رشد لغت" />
                                        </ListItemButton>
                                    </List>
                                </Collapse>
                                <ListItem disableGutters>
                                    <ListItemButton
                                        selected={router.pathname.includes('/dashboard/scors')}
                                        onClick={() => {
                                            setOpen(false);
                                            router.push('scors');
                                        }}
                                    >
                                        <ListItemIcon>
                                            <AccountBalanceWalletRoundedIcon />
                                        </ListItemIcon>
                                        {<ListItemText primary="صندوق امتیازات من" />}
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disableGutters>
                                    <ListItemButton
                                        selected={router.pathname.includes('/dashboard/support')}
                                        onClick={() => {
                                            setOpen(false);
                                            router.push('support');
                                        }}
                                    >
                                        <ListItemIcon>
                                            <ContactSupportRoundedIcon />
                                        </ListItemIcon>
                                        {<ListItemText primary="پشتیبانی" />}
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Stack>
                        <Stack gap={1}>
                            <Divider sx={{ height: '1px', width: '100%' }} />
                            <ListItemButton
                                sx={{
                                    background: '#ede8e4',
                                    p: '5px 15px',
                                    color: 'rgb(117, 26, 41)',
                                    borderRadius: '10px',
                                    '& svg': {
                                        color: 'rgb(117, 26, 41)',
                                    },
                                }}
                                onClick={() => {
                                    setOpen(false);
                                    router.push('/logout');
                                }}
                            >
                                <ListItemIcon>
                                    <MeetingRoomRoundedIcon />
                                </ListItemIcon>
                                {<ListItemText primary="خروج از حساب کاربری" />}
                            </ListItemButton>
                        </Stack>
                    </Box>
                </Box>
            </Drawer>
        </Stack>
    );
};
