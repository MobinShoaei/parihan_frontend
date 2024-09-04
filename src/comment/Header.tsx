import { Box, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface HeaderProps {
    setShowMessageModal: Dispatch<SetStateAction<boolean>>;
    record: number;
    is_call?:boolean
}

export const Header = (props: HeaderProps) => {
    return (
        <Box
            sx={{
                height: '60px',
                background: '#385A86',
                p: '15px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                color: '#fff',
                alignItems: 'center',
            }}
        >
            <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>
                یادداشت‌های {props.is_call ? 'تماس' : 'رکورد'} {props.record}
            </Typography>
            <CloseIcon
                fontSize="medium"
                onClick={() => props.setShowMessageModal((r) => !r)}
                sx={{ cursor: 'pointer' }}
            />
        </Box>
    );
};
