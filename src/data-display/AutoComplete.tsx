/**
 * selectInput
 */
import {
    Autocomplete as MuiAutoComplete,
    AutocompleteProps as MuiAutocompleteProps,
    TextField,
    TextFieldProps,
} from '@mui/material';
import {useField, useFormikContext} from 'formik';
import React, {useEffect, useState} from 'react';

interface AutoCompleteProps
    extends Omit<MuiAutocompleteProps<any, boolean, boolean, boolean>,
        'renderInput' | 'defaultValue'> {
    name: string;
    label?: string;
    defaultValue?: string | undefined;
}

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
    const {setFieldValue} = useFormikContext();
    const [field, meta] = useField(props.name as string);

    const textFieldProps: TextFieldProps = {
        ...field,
    };

    // If the field is invalid, add the error message to the props
    if (meta && meta.touched && meta.error) {
        textFieldProps.error = true;
        textFieldProps.helperText = meta.error;
    }

    useEffect(() => {
        if (props.defaultValue) setFieldValue(props.name, props.defaultValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <React.Fragment>
            <MuiAutoComplete
                size="small"
                {...props}
                disablePortal
                renderInput={(params) => (
                    <TextField {...params} label={props.label} {...textFieldProps} />
                )}
                onChange={(event, value, reason) => {
                    if (value) setFieldValue(props.name, value.value)
                    else setFieldValue(props.name, null);
                }}
                value={props.options.find((item) => item.value === meta.value) || null}
            />
        </React.Fragment>
    );
};

export default AutoComplete;
