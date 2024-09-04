import { Box } from '@mui/material';
import React from 'react';
import { MdDelete } from 'react-icons/md';
interface DeleteProps {
    onClick: () => void;
}

export const Delete = (props: DeleteProps) => {
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
            <MdDelete />
        </Box>
    );
};
