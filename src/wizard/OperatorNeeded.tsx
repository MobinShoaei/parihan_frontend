import React, {Dispatch, SetStateAction} from 'react'
import {Box, Button, Stack, Typography} from "@mui/material";

interface OperatorNeededProps {
    setActiveStep: Dispatch<SetStateAction<number>>
    setNeedOperator: Dispatch<SetStateAction<boolean>>
}


export const OperatorNeeded = (props: OperatorNeededProps) => {

    const PageOptions = (props: { title: string, subtitle: string, onClick: () => void }) => {
        return (
            <Stack justifyContent={'center'} alignItems={'center'} gap={1}
                   sx={{
                       background: '#fff', border: '1.105px solid #EAD3D3', width: '180px',
                       height: '96px', borderRadius: '6px', cursor: 'pointer'
                   }}
                   onClick={props.onClick}
            >
                <Typography fontWeight={700} fontSize={'14px'} color={'#385A86'}>{props.title}</Typography>
                <Typography fontSize={'12px'} color={'#385A86'}>{props.subtitle}</Typography>
            </Stack>
        )
    }

    return (
        <React.Fragment>
            <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} sx={{maxWidth: '610px'}}
                   gap={2}>
                <Box sx={{height: '320px', width: 'auto'}}>
                    <img src={'/images/3 1.png'} width={'320px'}/>
                </Box>
                <Typography fontWeight={700}>آیا نیاز به تعریف اپراتور در کسب‌وکار شما هست؟</Typography>

            </Stack>
            <Stack gap={2} direction={'row'}>
                <PageOptions title={'بله'} subtitle={'می‌خواهم کاربر اپراتور تعریف کنم'} onClick={() => {
                    props.setActiveStep(r => r + 1);
                    props.setNeedOperator(true)
                }}/>
                <PageOptions title={'خیر'} subtitle={'فقط خودم استفاده میکنم'} onClick={() => {
                    props.setActiveStep(r => r + 1);

                }}/>
            </Stack>
        </React.Fragment>
    )
}