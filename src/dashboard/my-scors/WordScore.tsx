import { Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useIsMobile } from '../../hook/useIsMobile';

export const WordScore = () => {
    const matches = useIsMobile();

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
                <Typography variant="h2">کلید واژه دوره زبان عمومی</Typography>
            </Stack>
            <Typography fontSize={14}>
                کلید واژه موجود در دوره عمومی زبان را وارد کنید و ۵۰۰ امیتاز دریافت کنید.
            </Typography>
            <Stack direction={matches ? 'column' : 'row'} gap={2} paddingBottom={1.5}>
                <TextField name="code" placeholder="-" sx={{ textAlign: 'center' }} />
                <Button variant="contained">ثبت کلید واژه</Button>
            </Stack>
        </Stack>
    );
};
