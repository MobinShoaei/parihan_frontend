import React, {Dispatch, SetStateAction} from 'react'
import {Box, Button, Grid, Stack, Typography} from "@mui/material";
import {HiOutlineCube} from "react-icons/hi2";
import {RiErrorWarningFill} from "react-icons/ri";
import {FaQuestionCircle} from "react-icons/fa";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';

interface GuideProps {
    setActiveStep: Dispatch<SetStateAction<number>>
    needOperator: boolean
}

export const Guide = (props: GuideProps) => {

    const PageOptions = (props: { text: string, icon: JSX.Element }) => {
        return (
            <Stack direction={'row'} alignItems={'center'} gap={1}
                   sx={{
                       background: '#fff',
                       border: '1.105px solid #EAD3D3',
                       width: 'f',
                       borderRadius: '6px',
                       padding: '12.5px 18px',
                       '& svg': {
                           color: '#E53F4C',
                           fontSize: '20px'
                       },
                       mb: '10px'
                   }}

            >
                {props.icon}
                <Typography fontSize={'14px'} color={'#385A86'}>{props.text}</Typography>
            </Stack>
        )
    }
    return (
        <React.Fragment>
            <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} sx={{maxWidth: '610px'}}
                   gap={2}>
                <Box sx={{height: '320px', width: 'auto'}}>
                    <img src={'/images/2 51.png'} width={'320px'}/>
                </Box>

            </Stack>
            <Grid container sx={{maxWidth: '660px'}} spacing={1}>
                <Grid item xs={12} sx={{mb: 2, textAlign: 'center'}}> <Typography>راهنمای امکانات ویژه
                    نرم‌افزار همکار را
                    مطالعه
                    کنید:</Typography></Grid>
                <Grid item md={6} xs={12}>
                    <PageOptions text={'امکان تعریف محصول کسب‌وکار شما'} icon={<HiOutlineCube/>}/>
                    <PageOptions text={'امکان ثبت موضوع تماس'} icon={<RiErrorWarningFill/>}/>
                    <PageOptions text={'دفترچه مخاطبان (مشتریان) شما'} icon={<AccountBoxIcon/>}/>
                </Grid>
                <Grid item md={6} xs={12}>
                    <PageOptions text={'تعریف سوالات متداول مشتریان برای اپراتور‌ها'}
                                 icon={<FaQuestionCircle/>}/>
                    <PageOptions text={'تعریف متن ثابت مکالمه برای اپراتور‌ها'} icon={<StickyNote2Icon/>}/>
                    {props.needOperator && <PageOptions text={'تعریف اپراتور (کاربر)'} icon={<ContactPhoneIcon/>}/>}
                </Grid>
            </Grid>
            <Stack gap={2}>
                <Button variant={'contained'} sx={{width: '300px', backgroundColor: '#385A86',}}
                        onClick={() => props.setActiveStep(r => r + 1)}>مرحله بعدی</Button>
            </Stack>
        </React.Fragment>
    )
}