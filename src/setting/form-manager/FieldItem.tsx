import {Box} from '@mui/material';
import React, {Dispatch, SetStateAction} from 'react';
import {FieldItemHeader} from './FieldItemHeader';
import {MdOutlineDragHandle} from 'react-icons/md';
import {HttpMethod, sendRequest} from '../../../utils/axios';
import {BackendUrls} from '../../../utils/backend-urls';
import {toast} from 'react-toastify';
import {catchRequestError} from '../../../utils/functions';
import {fieldItemType} from './FieldList';
import {finalDataType} from './FormManager';

interface FieldItemProps {
    children: JSX.Element;
    type: string;
    data: finalDataType;
    editMode: boolean;
    formData: finalDataType[];
}

export const FieldItem = (props: FieldItemProps) => {
    return (
        <Box
            sx={{
                border: '1px solid #EAD3D3',
                p: '12px 20px',
                borderRadius: '6px',
                background: '#FFFFFF',
                display: 'flex',
                gap: '10px',
            }}
        >
            {props.editMode && (
                <MdOutlineDragHandle
                    style={{
                        fontSize: '30px',
                        color: '#EAD3D3',
                    }}
                />
            )}

            <Box sx={{width: '100%'}}>
                <FieldItemHeader
                    type={props.type}
                    locked={props.data.is_visible}
                    id={props.data.id}
                    editMode={props.editMode}
                    formData={props.formData}
                />
                {props.children}
            </Box>
        </Box>
    );
};
