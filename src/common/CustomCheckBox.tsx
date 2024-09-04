import {Box, Checkbox, FormControlLabel, Typography} from '@mui/material';
import React from 'react';
import {BsCheckCircleFill} from 'react-icons/bs';
import {MdRadioButtonUnchecked} from 'react-icons/md';

interface CustomCheckBoxProps {
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    label: string;
    icon?: JSX.Element
    checked?: boolean
}

export const CustomCheckBox = (props: CustomCheckBoxProps) => {
    const iconStyle = {fontSize: '22px'};
    return (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Checkbox
                icon={<MdRadioButtonUnchecked style={iconStyle}/>}
                checkedIcon={<BsCheckCircleFill style={{fontSize: '22px', color: '#35BBD6'}}/>}
                onChange={props.onChange}
                checked={props.checked}
            />
            <Typography variant="body2" sx={{fontSize: '16px', display: 'flex', alignItems: 'center', gap: '5px'}}>
                {props.icon} {props.label}
            </Typography>
        </Box>
    );
};
