import {InputAdornment, TextField} from '@mui/material';
import {useField, useFormikContext} from 'formik';
import React, {useEffect, useState} from 'react';
import CancelIcon from '@mui/icons-material/Cancel';

interface OptionTextInputProps {
    name: string;
    index: number;
    onRemove: (index: string) => void;
}

export const OptionTextInput = (props: OptionTextInputProps) => {
    const {setFieldValue, values} = useFormikContext();
    const [field, meta] = useField(props.name);
    const [value, setValue] = useState<string>(field.value);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setValue(event.target.value);
        // setTimeout(() => {
        setFieldValue(props.name.toString(), event.target.value);
        // }, 500);
    };

    // useEffect(() => {
    //     setValue(field.value);
    // }, [values]);

    return (
        <TextField
            type="text"
            placeholder={'گزینه ' + (props.index + 1)}
            size="small"
            name={props.name}
            onChange={handleInputChange}
            value={field.value}
            inputProps={{
                maxLength: 1024,
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <CancelIcon
                            onClick={() => props.onRemove(value)}
                            sx={{
                                fontSize: '15px',
                                color: 'secondary.main',
                                cursor: 'pointer',
                            }}
                        />
                    </InputAdornment>
                ),
            }}

        />
    );
};
