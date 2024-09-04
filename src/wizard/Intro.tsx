import React, {Dispatch, SetStateAction} from 'react'
import {Box, Button, Stack, Typography} from "@mui/material";
import Image from 'next/image';
import {useRouter} from "next/router";

interface IntroProps {
    setActiveStep: Dispatch<SetStateAction<number>>
}

export const Intro = (props: IntroProps) => {

    const router = useRouter()

    return (
        <React.Fragment>
            <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} sx={{maxWidth: '610px'}}
                   gap={2}>
                <Box sx={{height: '320px', width: 'auto'}}>
                    <img src={'/images/4 8.png'} width={'320px'}/>
                </Box>

                <Typography fontWeight={700}>همکار! همراه هر کال :) </Typography>
                <Typography align={'justify'}>شناخت فعلی شصت و سه درصد سوالات طراحان خلاقی و دشواری سادگی طراحان خلاقی
                    که و
                    ارائه جوابگوی و
                    طراحان در زبان فارسی اصلی لازم ساختگی متن جامعه تولید اصلی زیادی نامفهوم، در زبان فارسی می باشد
                    تکنولوژی
                    سادگی ساختگی اصلی</Typography>
            </Stack>
            <Stack gap={2}>
                <Button variant={'contained'} sx={{width: '300px', backgroundColor: '#385A86',}}
                        onClick={() => props.setActiveStep(r => r + 1)}>مرحله بعدی</Button>

                <Button onClick={() => router.push('/setting/')} variant={'text'}
                        sx={{width: '300px', color: '#E53F4C', background: '#EAD3D333'}}>رد شدن از
                    راهنما
                </Button>
            </Stack>
        </React.Fragment>
    )
}