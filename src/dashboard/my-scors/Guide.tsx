import { Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useIsMobile } from '../../hook/useIsMobile';

export const Guide = () => {
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
                <Typography variant="h2">نحوه استفاده از امیتازات</Typography>
            </Stack>
            <Typography>
                شما می‌توانید برای خرید دوره های آتی از امتیازات جمع آوری شده اقدام کنید.موسسه در طی
                اعلام دوره های جدید متعاقبا اعلام می‌کند از چند امتیاز برای تهیه دوره جدید می‌توانید
                استفاده کنید. هدف از جمع آوری امتیازات فعالیت بیشتر شما بر روی دوره و در نهایت
                یادگیری بهتر زبان انگلیسی می‌شود.
            </Typography>
        </Stack>
    );
};
