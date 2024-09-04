import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

type RemainingBoxProps = {
    used: number;
    name?: string;
};

export const RemainingBox = (props: RemainingBoxProps) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    background: 'rgba(201, 204, 46, 0.15)',

                    borderRadius: '6px',
                    alignItems: 'center',
                    position: 'relative',
                }}
            >
                <Box
                    sx={{
                        width: `${100 - props.used}%`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        // padding: '5px',
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        position: 'absolute',
                        padding: '5px',
                    }}
                >
                    <Box
                        sx={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '3px',
                            backgroundColor: 'rgba(201, 204, 46, 1)',
                        }}
                    />
                    <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                        {props.name}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        width: `${props.used}%`,
                        textAlign: 'right',

                        fontSize: '14px',
                        backgroundColor: 'rgba(201, 204, 46, 1)',
                        borderRadius: props.used == 100 ? '6px' : '0px 6px 6px 0px',
                        padding: '5px',
                    }}
                >
                    {`${props.used}٪`}
                </Box>
            </Box>
        </Box>
    );
};
