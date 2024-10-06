import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { removeToken } from '../../utils/cookies';
import { useDispatch } from 'react-redux';

const Logout: React.FC = () => {
    const router = useRouter();
    useEffect(() => {
        removeToken();
        router.push('/login');
    }, []);

    return (
        <Box
            sx={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
            }}
        >
            <CircularProgress color="primary" size={100} />
        </Box>
    );
};

export default Logout;
