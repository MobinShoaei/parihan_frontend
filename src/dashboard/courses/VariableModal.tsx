import { Button, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CiStar } from 'react-icons/ci';

export const VariableModal = () => {
    return (
        <Stack gap={2}>
            <Stack direction={'row'} justifyContent={'space-between'} alignContent={'center'}>
                <Typography fontSize={30}>نقشه</Typography>
                <Typography fontSize={30}>Map</Typography>
            </Stack>
            <Divider />
            <Stack direction={'row'} justifyContent={'space-between'} alignContent={'center'}>
                <Stack direction={'row'} alignContent={'center'} gap={1}>
                    <InsertPhotoIcon fontSize="small" color="warning" />
                    <Typography variant="caption" color={'#6a6a6a'}>
                        تصویر مربوط به کلمه
                    </Typography>
                </Stack>
                <img src="https://picsum.photos/seed/picsum/170/100" style={{ borderRadius: 10 }} />
            </Stack>
            <Divider />
            <Stack direction={'row'} justifyContent={'space-between'} alignContent={'center'}>
                <Stack direction={'row'} alignContent={'center'} gap={1}>
                    <HeadphonesIcon fontSize="small" color="warning" />
                    <Typography variant="caption" color={'#6a6a6a'}>
                        تلفظ کلمه
                    </Typography>
                </Stack>
                <Stack gap={1} pt={3}>
                    <Stack direction={'row'} alignContent={'center'} gap={1} justifyContent={'end'}>
                        <GraphicEqIcon fontSize="small" color="warning" />
                        <Typography fontFamily={'mr-eaves-modern'}>
                            British Pronunciation
                        </Typography>
                    </Stack>
                    <Stack direction={'row'} alignContent={'center'} gap={1} justifyContent={'end'}>
                        <GraphicEqIcon fontSize="small" color="warning" />
                        <Typography fontFamily={'mr-eaves-modern'}>
                            American Pronunciation
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
            <Divider />
            <Stack direction={'row'} justifyContent={'space-between'} alignContent={'center'}>
                <Stack direction={'row'} alignContent={'center'} gap={1}>
                    <FormatQuoteIcon fontSize="small" color="warning" />
                    <Typography variant="caption" color={'#6a6a6a'}>
                        مثال
                    </Typography>
                </Stack>
                <Stack gap={1} pt={3}>
                    <Typography fontFamily={'mr-eaves-modern'} textAlign={'right'}>
                        I think we need a map
                    </Typography>
                    <Typography fontSize={13}>فکر میکنم به یک نقشه احتیاج داریم</Typography>
                </Stack>
            </Stack>
            <Divider />
            <Stack justifyContent={'space-between'} alignContent={'center'}>
                <Stack direction={'row'} alignContent={'center'} gap={1}>
                    <Typography variant="caption" color={'#6a6a6a'}>
                        سطح پیچیدگی کلمه برای شما
                    </Typography>
                    <InfoIcon fontSize="small" color="warning" />
                </Stack>
                <Stack gap={1} direction={'row'} pt={3}>
                    <Button variant="contained">
                        <Stack direction={'row'} alignContent={'center'} gap={1}>
                            <Typography>ساده بود</Typography>
                            <CheckCircleIcon sx={{ fontSize: '18px' }} />
                        </Stack>
                    </Button>
                    <Button variant="outlined">
                        <Stack direction={'row'} alignContent={'center'} gap={1}>
                            <Typography>متوسط بود</Typography>
                            <CiStar fontSize={'18px'} />
                        </Stack>
                    </Button>
                    <Button variant="outlined">
                        <Stack direction={'row'} alignContent={'center'} gap={1}>
                            <Typography>سخت بود</Typography>
                            <CiStar fontSize={'18px'} />
                        </Stack>
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
};
