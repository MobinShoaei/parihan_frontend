/**
 * textInput
 */
import { OutlinedTextFieldProps, TextField as MaterialTextField } from '@mui/material';
import { FieldInputProps, useField } from 'formik';
import React from 'react';

interface TextFieldProps
    extends Omit<OutlinedTextFieldProps, 'variant'>,
        Omit<FieldInputProps<any>, 'value' | 'onChange' | 'onBlur'> {
    name: string;
}

export const TextField: React.FC<TextFieldProps> = (props) => {
    const [field, meta] = useField(props.name); // Get the field and meta data from the formik hook

    const textFieldProps: TextFieldProps = {
        ...props,
        ...field,
        size: 'small',
        fullWidth: true,
    };

    // If the field is invalid, add the error message to the props
    if (meta && meta.touched && meta.error) {
        textFieldProps.error = true;
        textFieldProps.helperText = meta.error;
    }

    return <MaterialTextField {...textFieldProps} />;
};
