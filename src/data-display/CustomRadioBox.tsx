import {Box, Typography, useRadioGroup} from '@mui/material';
import React, {Dispatch, SetStateAction} from 'react';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import {useFormikContext} from 'formik';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

type CustomRadioBoxProps = {
    text: string;
    checked?: boolean;
    name: string;
    fieldName: string;
};
export const CustomRadioBox: React.FC<CustomRadioBoxProps> = (props) => {
    const {setFieldValue, values} = useFormikContext();


    const onClick = (name: string) => {
        const v: any = values
        if (v[props.fieldName] == name) {
            setFieldValue(props.fieldName, '');
        } else setFieldValue(props.fieldName.toString(), name);
    }


    return (
        <Box
            sx={{
                display: 'flex',
                gap: '5px',
                border: props.checked ? '0.747929px solid #00AACC' : '0.747929px solid #8C8C8C',
                borderRadius: '5px',
                padding: '6px 18px',
                alignItems: 'center',
                cursor: 'pointer',
                backgroundColor: props.checked ? 'rgba(6, 239, 239, 0.1)' : 'unset',
                fontWeight: props.checked ? '700' : 'unset',
                marginBottom: {md: '0px', xs: '10px'},
                width: 'fit-content',
            }}
            onClick={() => onClick(props.name)}
        >
            {props.checked ? (
                <CheckBoxOutlinedIcon
                    sx={{fontSize: '17px', color: props.checked ? '#00AACC' : 'unset'}}
                />
            ) : (
                <CheckBoxOutlineBlankIcon sx={{fontSize: '17px', color: '#8C8C8C'}}/>
            )}
            <Typography variant="body2" sx={{color: props.checked ? '#00AACC' : '#8C8C8C'}}>
                {props.text}
            </Typography>
        </Box>
    );
};
