import { Box, CardHeader, Skeleton, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';

export const Header = (props: {
    DrawerVisible: Dispatch<SetStateAction<boolean>>;
    title?: string;
    profileIcon?: string;
    loading: boolean;
}): JSX.Element => {
    return (
        <Box
            sx={{
                display: 'flex',
                padding: { md: '15px 30px', xs: '10px 15px' },
                justifyContent: 'space-between',
                height: { md: '60px', xs: '50px' },
                width: '100%',
                backgroundColor: '#E53F4C',
                color: '#FFFFFF',
                alignItems: 'center',
            }}
        >
            <CloseIcon
                fontSize="medium"
                onClick={() => props.DrawerVisible(false)}
                sx={{ cursor: 'pointer' }}
            />
            {props.loading ? (
                <CardHeader
                    avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
                    title={
                        <Skeleton
                            animation="wave"
                            height={20}
                            width="80%"
                            style={{ marginBottom: 6 }}
                        />
                    }
                    sx={{ width: '70%', direction: 'ltr' }}
                />
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        '& .profile-icon-image': {
                            borderRadius: '50%',
                        },
                    }}
                >
                    <Typography sx={{ fontWeight: 500 }}>{props.title}</Typography>
                    {props.profileIcon ? (
                        <Image
                            className="profile-icon-image"
                            width={35}
                            height={35}
                            src={props.profileIcon ? props.profileIcon : '/images/user.png'}
                            alt={''}
                        />
                    ) : (
                        <AccountCircleIcon fontSize="large" />
                    )}
                </Box>
            )}
        </Box>
    );
};
