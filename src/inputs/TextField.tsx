import {
    InputLabel,
    OutlinedTextFieldProps,
    InputBaseProps,
    InputBase,
    Typography,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { FieldInputProps, useField } from 'formik';
import React from 'react';
import TextInput from './TextInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface TextFieldProps extends InputBaseProps {
    name: string;
    label: string;
    placeholder?: string;
    helperText?: string;
}

export const TextField: React.FC<TextFieldProps> = (props) => {
    const [field, meta] = useField(props.name); // Get the field and meta data from the formik hook

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const textFieldProps: TextFieldProps = {
        ...props,
        ...field,
        fullWidth: true,
        placeholder: props.placeholder,
        type: showPassword ? 'text' : props.type,
    };

    if (meta && meta.touched && meta.error) {
        textFieldProps.error = true;
        textFieldProps.helperText = meta.error;
    }

    return (
        <>
            <InputLabel sx={{ color: '#2B2828', fontSize: '14px', paddingLeft: '5px' }}>
                {props.label}
            </InputLabel>
            <TextInput {...textFieldProps} />
            {textFieldProps.helperText && (
                <Typography
                    sx={{ marginTop: '5px', fontSize: '12px' }}
                    color="error.main"
                    className="helperText"
                >
                    {textFieldProps.helperText}
                </Typography>
            )}
        </>
    );
};
