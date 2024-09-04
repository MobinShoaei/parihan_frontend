import { Box, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { MdOutlineDragHandle } from 'react-icons/md';
import { Edit } from '../common/Edit';
import { View } from '../common/View';
import { lockedUserType } from '../UsersManager';
import { FaqDataType } from './FaqList';

interface FaqItemProps {
    locked?: boolean;
    data: FaqDataType;
    setVisibleFaq: Dispatch<SetStateAction<lockedUserType>>;
    setFaqId: Dispatch<SetStateAction<number>>;
}

export const FaqItem = (props: FaqItemProps) => {
    return (
        <Box
            sx={{
                background: '#FFFFFF',
                border: '0.747929px solid #EAD3D3',
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'space-between',
                gap: '20px',
                p: '13px 20px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: '20px',
                }}
            >
                <MdOutlineDragHandle
                    style={{
                        fontSize: '30px',
                        color: '#EAD3D3',
                        opacity: props.locked ? '0.5' : '1',
                    }}
                />
                <Box sx={{ opacity: props.locked ? '0.5' : '1' }}>
                    <Typography>{props.data.question}</Typography>
                    <Typography variant="body2">{props.data.answer}</Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <View
                    onClick={() =>
                        props.setVisibleFaq({
                            id: props.data.id,
                            last_state: props.data.is_visible,
                        })
                    }
                    locked={props.locked}
                />
                <Edit
                    onClick={() => !props.locked && props.setFaqId(props.data.id)}
                    locked={props.locked}
                />
            </Box>
        </Box>
    );
};
