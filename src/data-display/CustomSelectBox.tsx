import {Box, Typography} from '@mui/material';
import React, {Dispatch, SetStateAction} from 'react';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {useFormikContext} from 'formik';
import {values} from './InputBox';

type CustomSelectBoxProps = {
    text: string;
    checked?: boolean;
    name: string;
    fieldName: string;
    values: string[];
};
export const CustomSelectBox: React.FC<CustomSelectBoxProps> = (props) => {
    const {setFieldValue} = useFormikContext();

    function onClick(name: string) {

        if (props.values.includes(name)) {
            let temp = props.values.filter(function (item) {
                return item !== props.name;
            });
            setFieldValue(props.fieldName, temp);
        } else setFieldValue(props.fieldName, [...props.values, name])


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
                width: 'fit-content',
                marginBottom: {md: '0px', xs: '10px'},
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
