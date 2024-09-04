import { Box } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { CustomRadioBox } from './CustomRadioBox';

type RadioGpProps = {
    value: string;
    options: { text: string; name: string }[];
    name: string;
};
export const RadioGp: React.FC<RadioGpProps> = (props) => {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {props.options.map((item, index) => {
                return (
                    <CustomRadioBox
                        key={index}
                        text={item.text}
                        checked={props.value == item.name}
                        name={item.name}
                        fieldName={props.name}
                    />
                );
            })}
        </Box>
    );
};
