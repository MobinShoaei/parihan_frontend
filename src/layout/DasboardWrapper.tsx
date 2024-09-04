import { Avatar, Badge, Box, Divider, Stack, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CottageIcon from '@mui/icons-material/Cottage';
import AppsIcon from '@mui/icons-material/Apps';

import React from 'react';
import { useIsMobile } from '../hook/useIsMobile';

export const DasboardWrapper = (props: { children: React.ReactElement; pageTitle?: string }) => {
    const matches = useIsMobile();

    return (
        <Box
            sx={{
                background: '#fff',
                padding: '25px',
                boxShadow: 3,
                borderRadius: '30px',
                height: '100%',
            }}
        >
            {!matches && (
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Stack direction={'row'} alignItems={'center'} gap={2}>
                        <Avatar sx={{ width: '70px', height: '70px' }}>
                            <PersonIcon sx={{ width: '40px', height: '40px' }} />
                        </Avatar>
                        <Typography fontSize={'14px'}>
                            کاربر عزیز{' '}
                            <span style={{ color: '#E0B49F' }}>
                                به پنل کاربری خودتون خوش اومدید
                            </span>
                        </Typography>
                    </Stack>
                    <Stack direction={'row'} gap={1}>
                        <Badge>
                            <EmailIcon color="primary" fontSize="small" />
                        </Badge>
                        <Badge>
                            <NotificationsActiveIcon color="primary" fontSize="small" />
                        </Badge>
                        <CottageIcon color="primary" fontSize="small" />
                    </Stack>
                </Stack>
            )}
            {!matches && <Divider sx={{ mt: 3 }} />}
            <Stack direction={'row'} alignItems={'center'} mt={matches ? 0 : 2} gap={1} mb={2}>
                <AppsIcon color="primary" />
                <Typography variant="h2">{props.pageTitle}</Typography>
            </Stack>
            {matches && (
                <Box
                    sx={{
                        background: '#751A29',
                        position: 'fixed',
                        bottom: 0,
                        width: '100%',
                        left: 0,
                        padding: '20px 25px',
                        shadow: 1,
                        borderRadius: '30px 30px 0px 0px',
                    }}
                >
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Stack direction={'row'} alignItems={'center'} gap={2}>
                            <Avatar sx={{ width: '45px', height: '45px' }}>
                                <PersonIcon sx={{ width: '30px', height: '30px' }} />
                            </Avatar>
                        </Stack>
                        <Stack direction={'row'} gap={2}>
                            <Badge>
                                <EmailIcon color="info" fontSize="small" />
                            </Badge>
                            <Badge>
                                <NotificationsActiveIcon color="info" fontSize="small" />
                            </Badge>
                            <CottageIcon color="info" fontSize="small" />
                        </Stack>
                    </Stack>
                </Box>
            )}
            {props.children}
        </Box>
    );
};
