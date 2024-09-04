import { Box, Typography } from '@mui/material';
import React from 'react';

interface CustomLegendProps {
    color: string;
    label: string;
}

export const CustomLegend = (props: CustomLegendProps) => {
    return (
        <Box sx={{ display: 'flex', gap: '5px' }}>
            <Box
                sx={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: props.color,
                }}
            />
            <Typography>{props.label}</Typography>
        </Box>
    );
};
