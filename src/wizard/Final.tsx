import React from 'react'
import {Box, Button, Stack, Typography} from "@mui/material";
import StarHalfIcon from '@mui/icons-material/StarHalf';
import {useRouter} from "next/router";

export const Final = () => {

    const router = useRouter()
    return (
        <React.Fragment>
            <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} sx={{maxWidth: '610px'}}
                   gap={2}>
                <Box sx={{height: '320px', width: 'auto'}}>
                    <img src={'/images/5 9.png'} width={'320px'}/>
                </Box>
                <Typography fontWeight={700} fontSize={'16px'}>حساب همکار کسب‌وکار شما با موفقیت ساخته شد!</Typography>
                <Typography fontWeight={300} textAlign={'center'}> همکار به صورت
                    <b>
                        &nbsp;رایگان
                    </b>
                    ، نیازهای ارتباط با مشتریان کسب‌وکار شما را برطرف
                    می‌کند و در این راه
                    کنار شماست. در صورتی که تمایل به استفاده از خدمات ویژه همکار را داشتید، می‌توانید پلن مناسب خود را
                    تهیه کنید.</Typography>
            </Stack>

            <Stack direction={'row'} alignItems={'center'} gap={1} onClick={() => router.push('/pricing/')}
                   sx={{
                       background: '#fff',
                       border: '1.105px solid #EAD3D3',
                       width: 'f',
                       borderRadius: '6px',
                       cursor: 'pointer',
                       padding: '12.5px 18px',
                       '& svg': {
                           color: '#E53F4C',
                           fontSize: '20px'
                       },
                       mb: '10px'
                   }}

            >
                <StarHalfIcon/>
                <Typography fontSize={'14px'} color={'#385A86'}>مشاهده پلن‌های اشتراک خدمات ویژه</Typography>
            </Stack>
            <Stack gap={2}>
                <Button variant={'contained'} sx={{width: '300px', backgroundColor: '#385A86',}}
                        onClick={() => {
                            router.push('/setting/')
                        }}>ورود به همکار</Button>
            </Stack>
        </React.Fragment>
    )
}