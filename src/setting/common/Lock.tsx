import { Box } from '@mui/material';
import React from 'react';
import { AiFillUnlock, AiFillLock } from 'react-icons/ai';

interface LockProps {
    locked?: boolean;
    onClick: () => void;
}

export const Lock = (props: LockProps) => {
    return (
        <Box
            sx={{
                width: '36px',
                height: '36px',
                border: '0.895238px solid #EAD3D3',
                borderRadius: '4px',
                cursor: 'pointer',
                color: props.locked ? '#385A86' : '#FFAD33',
                fontSize: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onClick={props.onClick}
        >
            {props.locked ? <AiFillLock /> : <AiFillUnlock />}
        </Box>
    );
};
