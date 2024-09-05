import { LocalizationProvider } from '@mui/x-date-pickers';
import React, { Dispatch, SetStateAction } from 'react';
import AdapterJalali from '@date-io/jalaali';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';

interface CustomDatePickerProps {
    value: dayjs.Dayjs | null;
    setValue: Dispatch<SetStateAction<dayjs.Dayjs | null>>;
    label: string;
}

export const CustomDatePicker = (props: CustomDatePickerProps) => {
    const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        e.preventDefault();
    };
    return (
        <LocalizationProvider dateAdapter={AdapterJalali}>
            <DatePicker
                label={props.label}
                mask="____/__/__"
                value={props.value}
                onChange={(newValue) => {
                    props.setValue(newValue);
                }}
                renderInput={(params) => (
                    <TextField
                        onKeyDown={onKeyDown}
                        fullWidth
                        {...params}
                        placeholder="____/__/__"
                    />
                )}
            />
        </LocalizationProvider>
    );
};
