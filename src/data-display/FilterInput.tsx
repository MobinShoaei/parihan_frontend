import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import React, { useState } from 'react';
import jmoment from 'jalali-moment';
import dayjs, { Dayjs } from 'dayjs';
import { useFormikContext } from 'formik';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AdapterJalali from '@date-io/jalaali';
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Switch,
    TextField,
} from '@mui/material';
import { values } from './InputBox';
import { convertNumberToEn } from '../../utils/functions';
import AutoComplete from './AutoComplete';
import { SelectInput } from '../inputs/SelectInput';

type FilterInputProps = {
    name: string;
    value: { id: number; title: string }[];
    inputType: string;
    title: string;
};

export const FilterInput: React.FC<FilterInputProps> = (props) => {
    const [radioSelectedId, setRadioSelectedId] = useState<string>('');
    const [selectedvalues, setSelectedValues] = useState<string[]>([]);
    const [dateValue, setDateValue] = React.useState<Date | null>(null);
    const [dateValueG, setDateValueG] = React.useState<Date | null>(null);
    const [timeValue, setTimeValue] = React.useState<Dayjs | null>(null);

    const { setFieldValue } = useFormikContext();

    const sortOptions = () => {
        const data: { label: string; value: string }[] = props.value.map((item, index: number) => {
            return {
                label: item.title,
                value: item.title,
            };
        });
        data.push({ label: 'خالی', value: 'none' });
        return data;
    };

    const input_types: { [key: string]: JSX.Element } = {
        RadioBox: <SelectInput options={sortOptions()} name={props.name} label={props.title} />,
        TextField: (
            <TextField
                type="text"
                name={props.name.toString()}
                label="وارد کنید"
                size="small"
                onChange={(e) => setFieldValue(props.name.toString(), e.target.value)}
                sx={{
                    width: {
                        lg: '180px',
                        sm: '180px',
                        xs: '140px',
                    },
                }}
            />
        ),
        IntegerField: (
            <TextField
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                name={props.name.toString()}
                label="وارد کنید"
                size="small"
                onChange={(e) =>
                    setFieldValue(
                        props.name.toString(),
                        convertNumberToEn(e.target.value, 'string'),
                    )
                }
                sx={{
                    width: {
                        lg: '180px',
                        sm: '180px',
                        xs: '140px',
                    },
                }}
            />
        ),
        MultilineField: (
            <TextField
                name={props.name.toString()}
                label="وارد کنید"
                size="small"
                multiline
                rows={2}
                onChange={(e) => setFieldValue(props.name.toString(), e.target.value)}
                sx={{
                    width: {
                        lg: '180px',
                        sm: '180px',
                        xs: '140px',
                    },
                }}
            />
        ),
        DateField: (
            <Stack gap={0.5}>
                <LocalizationProvider dateAdapter={AdapterJalali}>
                    <DatePicker
                        label="از تاریخ"
                        mask="____/__/__"
                        value={dateValue}
                        onChange={(newValue) => {
                            setDateValue(newValue);
                            setFieldValue(
                                props.name.toString(),
                                newValue && jmoment(newValue).format('YYYY/MM/DD'),
                            );
                        }}
                        renderInput={(params) => (
                            <TextField
                                size="small"
                                {...params}
                                sx={{
                                    width: {
                                        lg: '180px',
                                        sm: '180px',
                                        xs: '140px',
                                    },
                                }}
                            />
                        )}
                    />
                </LocalizationProvider>
            </Stack>
        ),
        DateRangePicker: (
            <Stack gap={0.5}>
                <LocalizationProvider dateAdapter={AdapterJalali}>
                    <DatePicker
                        label="از تاریخ"
                        mask="____/__/__"
                        value={dateValueG}
                        onChange={(newValue) => {
                            setDateValueG(newValue);
                            setFieldValue(
                                props.name.toString() + '__gte',
                                newValue && jmoment(newValue).format('YYYY-MM-DD'),
                            );
                        }}
                        renderInput={(params) => (
                            <TextField
                                size="small"
                                {...params}
                                sx={{
                                    width: {
                                        lg: '180px',
                                        sm: '180px',
                                        xs: '140px',
                                    },
                                }}
                            />
                        )}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterJalali}>
                    <DatePicker
                        label="تا تاریخ"
                        mask="____/__/__"
                        value={dateValue}
                        onChange={(newValue) => {
                            setDateValue(newValue);
                            setFieldValue(
                                props.name.toString() + '__lte',
                                newValue && jmoment(newValue).format('YYYY-MM-DD '),
                            );
                        }}
                        renderInput={(params) => (
                            <TextField
                                size="small"
                                {...params}
                                sx={{
                                    width: {
                                        lg: '180px',
                                        sm: '180px',
                                        xs: '140px',
                                    },
                                }}
                            />
                        )}
                    />
                </LocalizationProvider>
            </Stack>
        ),
        TimeField: (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                    className="time"
                    label="انتخاب کنید"
                    value={timeValue}
                    ampm={false}
                    onChange={(newValue) => {
                        setTimeValue(newValue);
                        setFieldValue(
                            props.name.toString(),
                            newValue && dayjs(newValue).format('HH:mm'),
                        );
                    }}
                    renderInput={(params) => (
                        <TextField
                            name={props.name.toString()}
                            size="small"
                            {...params}
                            sx={{
                                width: {
                                    lg: '180px',
                                    sm: '180px',
                                    xs: '140px',
                                },
                            }}
                        />
                    )}
                />
            </LocalizationProvider>
        ),
        SelectBox: <SelectInput options={sortOptions()} name={props.name} label={props.title} />,
        switch: (
            <Switch
                onChange={(newValue) => {
                    setFieldValue(props.name.toString(), !newValue.target.checked);
                }}
            />
        ),
    };

    return <>{input_types[props.inputType]}</>;
};
