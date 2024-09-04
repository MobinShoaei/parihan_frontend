import { Box, Typography } from '@mui/material';
import React from 'react';

interface InputItemProps {
    icon: JSX.Element;
    title: string;
}

export const InputItem = (props: InputItemProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                background: '#fff',
                borderRadius: '6px',
                height: '56px',
                gap: '10px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '56px',
                    '& svg': {
                        fontSize: '26px',
                        color: '#E53F4C',
                    },
                    borderRight: '1px solid #EAD3D3',
                }}
            >
                {props.icon}
            </Box>
            <Typography
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '13px',
                    fontWeight: '400',
                    color: '#2B2828',
                }}
            >
                {props.title}
            </Typography>
        </Box>
    );
};
