import { Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const InvitedCoin = () => {
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
                <Typography variant="h2">ثبت کد معرف شما</Typography>
            </Stack>
            <Typography>با ثبت کد معرف ۱۰۰ امتیاز به صندوق امتیازات شما اضافه خواهد شد.</Typography>
            <Stack direction={'row'} gap={2} paddingBottom={1.5}>
                <TextField name="code" placeholder="-" sx={{ textAlign: 'center' }} />
                <Button variant="contained">ثبت کد معرف</Button>
            </Stack>
        </Stack>
    );
};
