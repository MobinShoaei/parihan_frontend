import {TextField} from '@mui/material';
import {useField, useFormikContext} from 'formik';
import React, {useState} from 'react';

interface FormTextInputProps {
    name: string;
    type: string;
}

export const FormTextInput = (props: FormTextInputProps) => {
    const {setFieldValue} = useFormikContext();
    const [field, meta] = useField(props.name);
    const [value, setValue] = useState<string>(field.value);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
        setTimeout(() => {
            setFieldValue(props.name.toString(), event.target.value)
        }, 500);
    };

    return (
        <TextField
            id="standard-basic"
            variant="standard"
            value={value}
            type="text"
            name={props.name.toString()}
            placeholder="عنوان سوال کوتاه پاسخ خود را اینجا بنویسید ..."
            size="small"
            onChange={handleInputChange}
            helperText={meta.error}
            error={!!meta.error}
            fullWidth
        />
    );
};
