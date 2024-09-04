import { Box, Skeleton } from '@mui/material';
import React from 'react';

export const TagItemSkeleton = () => {
    return (
        <Box
            sx={{
                background: '#FFFFFF',
                border: '0.747929px solid #EAD3D3',
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'space-between',
                gap: '20px',
                p: '13px 20px',
                mb: '10px',
                alignItems: 'center',
            }}
        >
            <Skeleton variant="text" sx={{ fontSize: '2rem', width: '20px' }} />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="text" sx={{ fontSize: '2rem', width: '220px' }} />
            <Skeleton variant="rectangular" width={36} height={36} />
        </Box>
    );
};
