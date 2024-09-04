import {Box, Button, Stack, TextareaAutosize, TextField, Typography} from '@mui/material';
import React from 'react';
import {RadioGp} from './RadioGp';
import {SelectGp} from './SelectGp';
import AdapterJalali from '@date-io/date-fns-jalali';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {useField, useFormikContext} from 'formik';
import dayjs from 'dayjs';
import {convertNumberToEn} from '../../utils/functions';
import {InformationBox} from './InformationBox';

type InputBoxProps = {
    index?: number;
    title?: string;
    inputType: string;
    filter?: boolean;
    options: { id: number, title: string }[];
    name: number | string;
    initialValue?: string;
};

export const values = (v: { id: number, title: string }[]) => {

    let inputValues: { text: string; name: string }[] = [];
    v.map((item) => {
        inputValues.push({text: item.title, name: item.title});
    });
    return inputValues;
};

export const InputBox: React.FC<InputBoxProps> = (props) => {
    const {setFieldValue} = useFormikContext();
    const [field, meta] = useField(props.name as string);


    const input_types: { [key: string]: JSX.Element } = {
        TextField: (
            <TextField
                value={field.value}
                type="text"
                name={props.name.toString()}
                label="وارد کنید"
                size="small"
                onChange={(e) => setFieldValue(props.name.toString(), e.target.value)}
                helperText={meta.error}
                error={!!meta.error}
            />
        ),
        IntegerField: (
            <TextField
                inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                name={props.name.toString()}
                label="وارد کنید"
                size="small"
                onChange={(e) =>
                    setFieldValue(
                        props.name.toString(),
                        convertNumberToEn(e.target.value, 'string'),
                    )
                }
                value={field.value}
                helperText={meta.error}
                error={!!meta.error}
            />
        ),
        MultilineField: (
            <TextareaAutosize
                name={props.name.toString()}
                onChange={(e) => setFieldValue(props.name.toString(), e.target.value)}
                value={field.value}
                minRows={3}
                maxRows={3}
            />
        ),
        RadioBox: (
            <RadioGp
                name={props.name.toString()}
                value={field.value}
                options={values(props.options)}
            />
        ),
        SelectBox: (
            <SelectGp
                value={field.value}
                options={values(props.options)}
                name={props.name.toString()}
            />
        ),
        DateField: (
            <LocalizationProvider dateAdapter={AdapterJalali}>
                <Box sx={{display: 'flex', gap: '5px'}}>
                    <DatePicker
                        label="انتخاب کنید"
                        mask="____/__/__"
                        value={field.value?.length > 0 ? dayjs(field.value, 'YYYY/MM/DD') : null}
                        onChange={(newValue) => {
                            setFieldValue(
                                props.name.toString(),
                                newValue && dayjs(newValue).locale('fa').format('YYYY/MM/DD'),
                            );
                        }}
                        renderInput={(params) => (
                            <TextField sx={{width: '90%'}} size="small" {...params} />
                        )}
                    />
                    <Button
                        variant="outlined"
                        sx={{width: '10%'}}
                        onClick={(newValue) => {
                            setFieldValue(
                                props.name.toString(),
                                newValue && dayjs().locale('fa').format('YYYY/MM/DD'),
                            );
                        }}
                    >
                        امروز
                    </Button>
                </Box>
            </LocalizationProvider>
        ),
        TimeField: (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack gap={'5px'} direction={'row'}>
                    <TimePicker
                        className="time"
                        label="انتخاب کنید"
                        ampm={false}
                        value={field.value?.length > 0 ? dayjs(field.value, 'HH:mm') : null}
                        onChange={(newValue) => {
                            setFieldValue(
                                props.name.toString(),
                                newValue && dayjs(newValue).format('HH:mm'),
                            );
                        }}
                        renderInput={(params) => (
                            <TextField sx={{width: '86%'}} name={props.name.toString()} size="small" {...params} />
                        )}
                    />
                    <Button
                        variant="outlined"
                        sx={{width: '10%'}}
                        onClick={(newValue) => {
                            setFieldValue(
                                props.name.toString(),
                                newValue && dayjs().locale('fa').format('HH:mm'),
                            );
                        }}
                    >
                        الان
                    </Button>
                </Stack>

            </LocalizationProvider>
        ),
    };
    return (
        <>
            {props.filter ? (
                input_types[props.inputType]
            ) : (
                <InformationBox index={props.index} title={props.title}>
                    {input_types[props.inputType]}
                </InformationBox>
            )}
        </>
    );
};
