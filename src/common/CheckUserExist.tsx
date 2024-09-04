import {
    InputLabel,
    OutlinedTextFieldProps,
    InputBaseProps,
    InputBase,
    Typography,
} from '@mui/material';
import {FieldInputProps, useField, useFormik} from 'formik';
import React, {useEffect} from 'react';
import useDebounce from "../hook/useDebounse";
import TextInput from "../inputs/TextInput";
import axios from "axios";
import {backendUrl} from "../../utils/axios";
import {BackendUrls} from "../../utils/backend-urls";
import {toast} from "react-toastify";
import {catchRequestError} from "../../utils/functions";

interface TextFieldProps extends InputBaseProps {
    name: string;
    label: string;
    placeholder?: string;
    helperText?: string;
}

export const CheckUserExist: React.FC<TextFieldProps> = (props) => {
    const [field, meta, helpers] = useField(props.name); // Get the field and meta data from the formik hook

    const debouncedValue = useDebounce<string>(field.value, 500)

    const textFieldProps: TextFieldProps = {
        ...props,
        ...field,
        fullWidth: true,
        placeholder: props.placeholder,
    };
    
    if (meta && meta.touched && meta.error) {

        textFieldProps.error = true;
        textFieldProps.helperText = meta.error;
    }


    useEffect(() => {
        if (field.value.length > 4)
            axios({
                method: 'post',
                url: backendUrl + BackendUrls.check_username,
                data: {username: field.value},
            })
                .then((response) => {
                    helpers.setError(undefined)
                })
                .catch((e) => {
                    helpers.setError(e.response.data.detail)

                });

    }, [debouncedValue])


    return (
        <>
            <InputLabel sx={{color: '#2B2828', fontSize: '14px', paddingLeft: '5px'}}>
                {props.label}
            </InputLabel>
            <TextInput {...textFieldProps} />
            {textFieldProps.helperText && (
                <Typography
                    sx={{marginTop: '5px', fontSize: '12px'}}
                    color="error.main"
                    className="helperText"
                >
                    {textFieldProps.helperText}
                </Typography>
            )}
        </>
    );
};
