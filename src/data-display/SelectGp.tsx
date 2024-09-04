import {Box} from '@mui/material';
import {useFormikContext} from 'formik';
import React from 'react';
import useUpdateEffect from '../hook/useUpdateEffect';
import {CustomSelectBox} from './CustomSelectBox';

export type SelectGpProps = {
    value: string[];
    options: { text: string; name: string }[];
    name: string;

};
export const SelectGp: React.FC<SelectGpProps> = (props) => {
    const {setFieldValue} = useFormikContext();

    useUpdateEffect(() => {
        setFieldValue(props.name, props.value);
    }, [props.value]);

    
    return (
        <Box
            sx={{
                display: 'flex',
                gap: '5px',
                flexWrap: 'wrap',
            }}
        >
            {props.options.map((item, index) => {
                return (
                    <CustomSelectBox
                        key={index}
                        text={item.text}
                        checked={props.value?.includes(item.name)}
                        name={item.name}
                        fieldName={props.name}
                        values={props.value ? props.value : []}
                    />
                );
            })}
        </Box>
    );
};
