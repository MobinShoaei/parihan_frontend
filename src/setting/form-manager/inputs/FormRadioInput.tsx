import { Box, TextField } from '@mui/material';
import { useField, useFormik, useFormikContext } from 'formik';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Add } from '../../common/Add';
import { OptionTextInput } from './OptionTextInput';

interface FormRadioInputProps {
    name: string;
    type: string;
    value?: { [key: string]: string }[];
}

export const FormRadioInput = (props: FormRadioInputProps) => {
    const [options, setOptions] = useState<{ [key: string]: string }[]>(
        props.value ? props.value : [],
    );

    const [addFiledCounter, setAddFiledCounter] = useState<number>(10000);
    const { setFieldValue, values } = useFormikContext();
    const [field, meta] = useField(props.name.toString() as string);
    const [value, setValue] = useState<string>(field.value);

    const removeItem = (value: number | string, key: string) => {
        // let temp = options.filter(function (item) {
        //     return item.id !== value;
        // });

        if (value == 'new') {
            setFieldValue(`${props.name}_${(addFiledCounter - 1).toString()}`, null);
        } else setFieldValue(key, null);

        // console.log(temp);
        // setOptions(temp);
    };

    const addField = () => {
        setFieldValue(`${props.name}_${addFiledCounter.toString()}`, '');
        setAddFiledCounter((r) => r + 1);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        setTimeout(() => {
            setFieldValue(props.name.toString(), event.target.value);
        }, 500);
    };

    return (
        <Box>
            <TextField
                id="standard-basic"
                variant="standard"
                value={value}
                type="text"
                name={props.name.toString()}
                placeholder="عنوان سوال تک انتخابی خود را اینجا بنویسید ..."
                size="small"
                onChange={handleInputChange}
                helperText={meta.error}
                error={!!meta.error}
                fullWidth
            />

            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {props.value?.map((option, index) => {
                    return (
                        <OptionTextInput
                            key={index}
                            name={`${props.name}_${option.id}`}
                            index={index}
                            onRemove={(value) =>
                                removeItem(option.id, `${props.name}_${option.id}`)
                            }
                        />
                    );
                })}
                <Add onClick={addField} />
            </Box>
        </Box>
    );
};
