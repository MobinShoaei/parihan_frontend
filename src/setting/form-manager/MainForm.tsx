import React, {useEffect, useState} from 'react';
import {Box, Stack, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {InputList} from './InputList';
import {FieldList} from './FieldList';
import {finalDataType, formatDataForSubmit} from './FormManager';
import {Form, useFormikContext} from 'formik';
import {DragDropContext} from 'react-beautiful-dnd';
import jmoment from "jalali-moment";


interface mainFormPropsTypes {
    loading: boolean
    editMode: boolean
    submitLoading: boolean
    lastUpdate?: string
}

export const MainForm = (props: mainFormPropsTypes) => {
    const {setFieldValue, values} = useFormikContext<any>();

    const [goDown, setGoDown] = useState<boolean>(false);
    const [addFiledCounter, setAddFiledCounter] = useState<number>(0);

    const lastUpdate = jmoment(props.lastUpdate).locale('fa').format("ll")

    const buildNewOrder = () => {
        const order =
            (values[
                Object.keys(values)
                    ?.filter((key) => key.endsWith('_order'))
                    .slice(-1)[0]
                ] as number) + 1;
        if (order) return order;
        else return 1;
    };

    const onDragEnd = (data: any) => {
        const {draggableId, source, destination} = data;
        if (source && destination) {
            if (source.droppableId === 'controls_droppable') {
                setFieldValue(`new${addFiledCounter}`, '');
                setFieldValue(`new${addFiledCounter}_type`, draggableId);
                setFieldValue(`new${addFiledCounter}_visible`, true);
                setFieldValue(`new${addFiledCounter}_order`, buildNewOrder());
                setAddFiledCounter((current) => current + 1);
            }
            if (source.droppableId === 'form_droppable') {
                if (source.index !== destination.index) {
                    const items = Array.from(formatDataForSubmit(values));
                    const [reorderedItem] = items.splice(data.source.index, 1);
                    items.splice(data.destination.index, 0, reorderedItem);
                    // setInitialValues(makeInitialValues(items));
                }
            }
        }
        setGoDown((r) => !r);
    };


    return (
        <Form>
            <DragDropContext onDragEnd={onDragEnd}>
                <Box sx={{p: '0 10%'}}>
                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        sx={{background: '#fff', p: '9px', borderRadius: '6px', mb: '12px'}}
                    >
                        <Typography variant={'body2'}>
                            {props.editMode
                                ? `حالت ویرایش فرم (آخرین ویرایش در ${lastUpdate})`
                                : `حالت مطالعه فرم (آخرین ویرایش در ${lastUpdate})`}
                        </Typography>
                        <LoadingButton
                            variant={'contained'}
                            color={props.editMode ? 'primary' : 'error'}
                            startIcon={<BorderColorIcon/>}
                            type="submit"
                            loading={props.submitLoading}
                        >
                            {props.editMode ? 'ذخیره' : 'ویرایش فرم'}
                        </LoadingButton>
                    </Stack>
                    <Stack direction={'row'} gap={'20px'}>
                        <Box
                            sx={{
                                width: {
                                    md: props.editMode ? '20%' : '0px',
                                    xs: props.editMode ? '100%' : 0,
                                },
                                height: {xs: props.editMode ? '340px' : 0},
                                visibility: props.editMode ? 'visible' : 'hidden',
                                transition: {
                                    md: 'visibility 0.1s, width 0.2s linear',
                                    xs: 'visibility 0.1s, height 0.2s linear',
                                },
                            }}
                        >
                            <InputList/>
                        </Box>

                        <Box
                            sx={{
                                height: '100%',
                                width: {md: props.editMode ? '80%' : '100%', xs: '100%'},
                            }}
                        >
                            <FieldList
                                formData={formatDataForSubmit(values)}
                                loading={props.loading}
                                goDown={goDown}
                                editMode={props.editMode}
                            />
                        </Box>
                    </Stack>
                </Box>
            </DragDropContext>
        </Form>
    );
};
