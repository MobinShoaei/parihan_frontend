import { Box, Paper, Skeleton } from '@mui/material';
import React from 'react';

export const CustomerSkeleton: React.FC = () => {
    return (
        <Paper
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: '75px',
                minWidth: '75px',
                backgroundColor: '#fff',
                padding: '8px',
                alignItems: 'center',
                borderRadius: '6px',
            }}
        >
            <Skeleton variant="circular" width={35} height={35} />

            <Box sx={{ width: '100%' }}>
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={'100%'} />
            </Box>
        </Paper>
    );
};
