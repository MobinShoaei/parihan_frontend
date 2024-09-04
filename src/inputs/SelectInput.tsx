import {
    InputLabel,
    OutlinedTextFieldProps,
    InputBaseProps,
    InputBase,
    Typography, Select, TextField, SelectChangeEvent, OutlinedInput, FormControl,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import {FieldInputProps, useField, useFormikContext} from 'formik';
import React from 'react';
import TextInput from './TextInput';

interface SelectInputProps {
    name: string;
    label: string;
    placeholder?: string;
    helperText?: string;
    options: { label: string; value: string }[]

}

export const SelectInput: React.FC<SelectInputProps> = (props) => {
    const [field, meta] = useField(props.name); // Get the field and meta data from the formik hook
    const {setFieldValue} = useFormikContext();

    const handleChange = (event: SelectChangeEvent) => {
        const {
            target: {value},
        } = event;
        setFieldValue(props.name, value)

    };

    console.log(field.value)

    return (
        <FormControl>
            <InputLabel id="demo-multiple-checkbox-label" sx={{color: '#2B2828', fontSize: '14px', paddingLeft: '5px'}}>
                {props.label}
            </InputLabel>
            <Select

                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={typeof field.value == 'object' ? field.value : []}
                onChange={handleChange}
                sx={{
                    width: {
                        lg: '180px',
                        sm: '180px',
                        xs: '140px',
                        borderColor: 'red',
                    },
                    '& .MuiSelect-select': {p: '13.5px 14px'}
                }}
                // placeholder={'انتخاب کنید'}
                input={<OutlinedInput label={props.label} sx={{'& input': {p: 0}}} className={'chert'}/>}
            >
                {props.options.map((option, index) => (
                    <MenuItem
                        key={index}
                        value={option.value}

                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
