import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import React from 'react';

export const EmptyBox = () => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                border: '1px solid #EAD3D3',
                borderRadius: '6px',
                flexDirection: 'column',
            }}
        >
            <Image src={'/images/notFound.jpg'} width="300px" height="300px" alt="" />
            <Typography variant="button" color="secondary" sx={{ fontSize: '22px' }}>
                اطلاعاتی یافت نشد!
            </Typography>
        </Box>
    );
};
