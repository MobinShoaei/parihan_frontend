import { Box } from '@mui/material';
import React from 'react';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
interface AddProps {
    onClick: () => void;
}

export const Add = (props: AddProps) => {
    return (
        <Box
            sx={{
                width: '36px',
                height: '36px',
                border: '0.895238px solid #EAD3D3',
                borderRadius: '4px',
                cursor: 'pointer',
                color: '#E53F4C',
                fontSize: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onClick={props.onClick}
        >
            <MdOutlineAddCircleOutline />
        </Box>
    );
};
