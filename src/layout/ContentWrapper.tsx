import { Box, SxProps, Theme } from '@mui/material';
import React from 'react';

export const ContentWrapper = (props: {children:JSX.Element, sx?: SxProps<Theme>})=>{
    return(
        <Box sx={{
            ...props.sx,
            height: "100%",
        }}>
            {props.children}
        </Box>
    )
}