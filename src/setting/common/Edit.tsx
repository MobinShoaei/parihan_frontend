import { Box } from '@mui/material';
import React from 'react';
import { HiPencil } from 'react-icons/hi';

interface EditProps {
    onClick: () => void;
    locked?: boolean;
}

export const Edit = (props: EditProps) => {
    return (
        <Box
            sx={{
                width: '36px',
                height: '36px',
                border: '0.895238px solid #EAD3D3',
                borderRadius: '4px',
                cursor: 'pointer',
                color: '#35BBD6',
                fontSize: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: props.locked ? '0.5' : '1',
            }}
        >
            <HiPencil onClick={props.onClick} />
        </Box>
    );
};
