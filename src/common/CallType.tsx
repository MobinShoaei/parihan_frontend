import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import React from 'react';

export const CallType = (props: { type: string }) => {
    const boxStyle = {
        display: 'flex',
        gap: '5px',
        alignItems: 'center',
        color: props.type == 'I' ? 'primary.main' : 'secondary.main',
        '& p': { fontSize: { md: '18px', xs: '14px' } },
    };

    return (
        <Box>
            {props.type == 'I' ? (
                <Box sx={boxStyle}>
                    <Image src="/images/I.png" alt="I" width="12px" height="14px" />
                    <Typography>ورودی</Typography>
                </Box>
            ) : (
                <Box sx={boxStyle}>
                    <Image src="/images/O.png" alt="o" width="12px" height="14px" />
                    <Typography>خروجی</Typography>
                </Box>
            )}
        </Box>
    );
};
