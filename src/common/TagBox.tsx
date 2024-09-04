import { Box, Typography } from '@mui/material';
import React from 'react';
import { hexToRgb } from '../../utils/functions';

interface TagBoxProps {
    color: string;
    content: string;
}

export const TagBox = (props: TagBoxProps) => {
    return (
        <Box
            sx={{
                backgroundColor: `rgb(${hexToRgb(props.color)?.r},${hexToRgb(props.color)?.g},${
                    hexToRgb(props.color)?.b
                },0.2)`,
                width: 'fit-content',
                height: '24px',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                p: '7px',
                gap: '6px',
            }}
        >
            <Box
                sx={{
                    height: '12px',
                    width: '12px',
                    borderRadius: '50%',
                    background: props.color,
                }}
            />
            <Typography
                sx={{
                    color: props.color,
                    fontWeight: '500',
                    fontSize: '12px',
                }}
            >
                {props.content}
            </Typography>
        </Box>
    );
};
