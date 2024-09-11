import { Button, Divider, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useIsMobile } from '../../hook/useIsMobile';

export const GetScoreGuide = () => {
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
                <Typography variant="h2">موارد دریافت امتیاز</Typography>
            </Stack>
            <Stack gap={0.5}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography>ثبت کد معرف توسط شما</Typography>
                    <Stack direction={'row'} alignItems={'center'} gap={1}>
                        100
                        <img src="/images/coin.png" alt="" style={{ width: '25px' }} />
                    </Stack>
                </Stack>
                <Divider />
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography>دعوت از دوستان ( هرنفر)</Typography>
                    <Stack direction={'row'} alignItems={'center'} gap={1}>
                        100
                        <img src="/images/coin.png" alt="" style={{ width: '25px' }} />
                    </Stack>
                </Stack>

                <Divider />

                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography>ثبت کلید واژه دوره زبان عمومی</Typography>
                    <Stack direction={'row'} alignItems={'center'} gap={1}>
                        500
                        <img src="/images/coin.png" alt="" style={{ width: '25px' }} />
                    </Stack>
                </Stack>
                <Divider />
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography>حل تمرین هر درس</Typography>
                    <Stack direction={'row'} alignItems={'center'} gap={1}>
                        50
                        <img src="/images/coin.png" alt="" style={{ width: '25px' }} />
                    </Stack>
                </Stack>
                <Divider />
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography>مشاهده کامل هر درس</Typography>
                    <Stack direction={'row'} alignItems={'center'} gap={1}>
                        50
                        <img src="/images/coin.png" alt="" style={{ width: '25px' }} />
                    </Stack>
                </Stack>
                <Divider />
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography>مشاهده و حل تمرین مقالات</Typography>
                    <Stack direction={'row'} alignItems={'center'} gap={1}>
                        50
                        <img src="/images/coin.png" alt="" style={{ width: '25px' }} />
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};
