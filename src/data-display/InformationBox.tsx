import {Box, Typography} from '@mui/material';
import React from 'react';
import {InformationModal} from './InformationModal';
import {useSelector} from "react-redux";
import {State} from "../../redux/reducers";

interface InformationBoxProps {
    index?: number;
    title?: string | number | boolean | string[];
    children: JSX.Element;
}

export const InformationBox = (props: InformationBoxProps) => {

    const edit_record_access = useSelector((state: State) => state.editRecordAccess);


    return (
        <Box
            sx={{
                pointerEvents: !edit_record_access ? 'none' : 'unset',
                opacity: !edit_record_access ? '0.6' : '1',
                padding: '12px',
                border: '0.747929px solid #EAD3D3',
                backgroundColor: '#FFF',
                borderRadius: '4px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                height: '100%',
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#EAD3D3',
                    },
                },
                '& .time.MuiOutlinedInput-root.mui-style-1sx6eb8-MuiFormLabel-root-MuiInputLabel-root':
                    {
                        color: '#EAD3D3 !important',
                    },
                '& textarea': {
                    backgroundColor: '#fff',
                    color: 'black',
                    border: '1px solid #EAD3D3',
                    padding: '5px',
                    borderRadius: '4px',
                    minWidth: '100%',
                    maxWidth: '100%',
                },
            }}
        >
            <Box sx={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                <Typography
                    sx={{
                        backgroundColor: '#E53F4C',
                        fontSize: '12px',
                        width: '18px',
                        height: '18px',
                        textAlign: 'center',
                        borderRadius: '3px',
                        color: '#fff',
                    }}
                >
                    {props.index}
                </Typography>
                <Typography sx={{fontSize: '14px'}}>{props.title}</Typography>
            </Box>
            {props.children}
        </Box>
    );
};
