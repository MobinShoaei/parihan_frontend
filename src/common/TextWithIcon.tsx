import React from 'react'
import {Stack, Typography} from "@mui/material";

interface TextWithIconProps {
    icon: JSX.Element
    text: string | number
}

export const TextWithIcon = (props: TextWithIconProps) => {
    return (
        <Stack direction={'row'} gap={0.25} sx={{'& svg': {color: '#35BBD6', width: '16px'}}} alignItems={'center'}>
            {props.icon}
            <Typography variant={'body2'}>{props.text}</Typography>
        </Stack>
    )
}
