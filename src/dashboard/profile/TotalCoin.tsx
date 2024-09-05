import { Link, Stack, Typography } from '@mui/material';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const TotalCoin = () => {
    return (
        <Stack
            sx={{
                background: '#fff',
                borderRadius: '20px',
                p: '20px 20px',
                border: '1px solid #751A298F',
            }}
            gap={3}
        >
            <Stack direction={'row'} alignItems={'center'}>
                <MoreVertIcon fontSize="small" color="primary" />
                <Typography variant="h2">جمع امتیازات شما</Typography>
            </Stack>
            <Stack direction="row" alignItems={'center'} gap={1}>
                <Typography fontFamily={'mr-eaves-modern'} fontSize={22}>
                    PARICOIN <span style={{ fontWeight: 'bold' }}>1200</span>
                </Typography>
                <img src="/images/coin.png" alt="" style={{ width: '65px' }} />
            </Stack>
            <Link href="/dashboard/scors" variant="body2" align="right">
                مشاهده جزيیات
            </Link>
        </Stack>
    );
};
