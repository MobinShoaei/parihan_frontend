import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const TodayHint = () => {
    return (
        <Stack gap={3}>
            <Box
                sx={{
                    background: '#751A29',
                    p: '20px 25px',
                    borderRadius: '20px 20px 0 20px',
                    position: 'relative',
                }}
            >
                <Stack direction={'row'} alignItems={'center'}>
                    <MoreVertIcon fontSize="small" color="info" />
                    <Typography
                        fontFamily={'mr-eaves-modern'}
                        color={'#fff'}
                        fontWeight={800}
                        fontSize={20}
                    >
                        Today Hint
                    </Typography>
                </Stack>
                <Typography
                    fontFamily={'mr-eaves-modern'}
                    align="right"
                    color={'#fff'}
                    fontWeight={800}
                    fontStyle={'italic'}
                    pr={'100px'}
                >
                    “ It takes courage to grow up and become who you really are. ” <br />
                    Parinaz Rohani
                </Typography>
                <img
                    src="/images/Parinaz_rohani.webp"
                    style={{ position: 'absolute', top: '-45px', left: '25px' }}
                    width={80}
                />
            </Box>
        </Stack>
    );
};
