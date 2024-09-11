import { Stack, Typography } from '@mui/material';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FaLanguage } from 'react-icons/fa';
import { useIsMobile } from '../../hook/useIsMobile';

export const FutureCourses = () => {
    const matches = useIsMobile();

    return (
        <Stack
            sx={{
                background: '#fff',
                borderRadius: '20px',
                p: '20px 20px',
                border: '1px solid #751A298F',
            }}
            gap={4}
        >
            <Stack direction={'row'} alignItems={'center'}>
                <MoreVertIcon fontSize="small" color="primary" />
                <Typography variant="h2">دوره های آتی</Typography>
            </Stack>
            <Stack
                sx={{
                    p: '22px 10px',
                    background: '#5A72B7',
                    borderRadius: '0px 20px 20px 20px',
                    border: '1px solid #E1D0C3',
                    position: 'relative',
                }}
                direction="row"
                alignItems={'start'}
                gap={1}
            >
                <Stack
                    direction={'column'}
                    justifyContent="space-between"
                    height={'100%'}
                    gap={matches ? 2 : 15}
                >
                    <Stack direction="row" alignItems={'center'} gap={1}>
                        <FaLanguage color="#fff" />
                        <Typography color={'#fff'}>دوره رشد لغت</Typography>
                    </Stack>
                    <Typography variant="body2" color={'#fff'}>
                        ...Coming soon
                    </Typography>
                </Stack>

                {!matches && <img src="/images/next_course_icon.png" style={{ width: '140px' }} />}
            </Stack>
        </Stack>
    );
};
