import { Avatar, Box, Stack } from '@mui/material';
import React from 'react';
import PersonIcon from '@mui/icons-material/Person';

export const UserAvatar = () => {
    return (
        <Stack gap={3}>
            <Box
                sx={{
                    background: '#751A29',
                    p: '20px 25px',
                    borderRadius: '20px 20px 0 20px',
                    position: 'relative',
                }}
            >
                <Avatar
                    sx={{ width: '90px', height: '90px' }}
                    src={'/images/user.png'}
                    alt="user-avatar"
                ></Avatar>
            </Box>
        </Stack>
    );
};
