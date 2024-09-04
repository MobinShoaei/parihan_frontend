import {Box, Typography} from '@mui/material';
import React, {Dispatch, SetStateAction} from 'react';
import {Delete} from '../common/Delete';
import {View} from '../common/View';
import {MdOutlineShortText, MdOutlineRadioButtonChecked, MdChecklistRtl} from 'react-icons/md';
import {GrTextAlignCenter} from 'react-icons/gr';
import {BsCalendar} from 'react-icons/bs';
import {TbNumbers} from 'react-icons/tb';
import {AiOutlineClockCircle} from 'react-icons/ai';
import {useField, useFormikContext} from 'formik';
import {fieldItemType} from './FieldList';
import {finalDataType} from './FormManager';

interface FieldItemHeaderProps {
    type: string;
    locked: boolean;
    id: string;
    editMode: boolean;
    formData: finalDataType[];
}

export const FieldItemHeader = (props: FieldItemHeaderProps) => {
    const [field, meta] = useField(`${props.id}_visible`);
    const {setFieldValue, values} = useFormikContext();

    const deleteField = () => {
        setFieldValue(props.id, null)
    };

    const style = {
        display: 'flex',
        gap: '5px',
        background: '#E53F4C',
        borderRadius: '6px',
        width: '90px',
        color: '#fff',
        height: 'fit-content',
        alignItems: 'center',
        justifyContent: 'center',
        '& .MuiTypography-root': {
            fontSize: '10px',
            fontWeight: '500',
            height: 'fit-content',
        },
        p: '4px 0px',
    };

    const type: { [key: string]: JSX.Element } = {
        TextField: (
            <Box sx={style}>
                <MdOutlineShortText/>
                <Typography>کوتاه پاسخ</Typography>
            </Box>
        ),
        MultilineField: (
            <Box sx={style}>
                <GrTextAlignCenter/>
                <Typography>بلند پاسخ</Typography>
            </Box>
        ),
        RadioBox: (
            <Box sx={style}>
                <MdOutlineRadioButtonChecked/>
                <Typography>تک انتخابی</Typography>
            </Box>
        ),

        SelectBox: (
            <Box sx={style}>
                <MdChecklistRtl/>
                <Typography>چند انتخابی</Typography>
            </Box>
        ),
        IntegerField: (
            <Box sx={style}>
                <TbNumbers/>
                <Typography>عددی</Typography>
            </Box>
        ),
        DateField: (
            <Box sx={style}>
                <BsCalendar/>
                <Typography>تاریخ</Typography>
            </Box>
        ),
        TimeField: (
            <Box sx={style}>
                <AiOutlineClockCircle/>
                <Typography>ساعت</Typography>
            </Box>
        ),
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: '10px',
            }}
        >
            {type[props.type]}

            <Box sx={{display: 'flex', gap: '10px'}}>
                <View
                    onClick={() => props.editMode && setFieldValue(`${props.id}_visible`, !field.value)}
                    locked={!field.value}
                />
                {props.editMode && (
                    <Delete onClick={deleteField}/>)}
            </Box>

        </Box>
    );
};
