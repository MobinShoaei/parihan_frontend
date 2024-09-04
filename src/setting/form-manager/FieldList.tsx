import {Box, CircularProgress, Stack, TextField, Typography} from '@mui/material';
import {useFormikContext} from 'formik';
import React, {Dispatch, SetStateAction, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {RiDragDropLine} from 'react-icons/ri';
import {FieldItem} from './FieldItem';
import {FormRadioInput} from './inputs/FormRadioInput';
import {FormSelectInput} from './inputs/FormSelectInput';
import {FormTextInput} from './inputs/FormTextInput';
import {fieldType, finalDataType} from './FormManager';

interface FieldListProps {
    formData: finalDataType[];
    loading: boolean;
    goDown: boolean;
    editMode: boolean;
}

export type fieldItemType = {
    field_type: string;
    id: string;
    title: string;
    is_visible: boolean;
    values?: { id: number; title: string }[];
};

export const FieldList = (props: FieldListProps) => {
    let myRef = useRef<HTMLDivElement>(null);
    const formik = useFormikContext();

    const getControl = (
        type: string,
        id: string,
        value?: { [key: string]: string }[] | undefined,
    ) => {
        switch (type) {
            case 'RadioBox':
                return <FormRadioInput name={id} type={type} value={value}/>;
            case 'SelectBox':
                return <FormSelectInput name={id} type={type} value={value}/>;
            default:
                return <FormTextInput name={id} type={type}/>;
        }
    };

    const getValue = (type: string, id: string, value?: { [key: string]: string }[]) => {
        // return <Typography>asd</Typography>;
        if (type == 'SelectBox' || type == 'RadioBox')
            return (
                <Box>
                    <Typography variant="body2">
                        {props.formData.filter((item) => item.id == id)[0].title}
                    </Typography>
                    <Stack direction={'row'} sx={{mt: '10px'}} gap={5}>
                        {value?.map((item, index) => {
                            return (
                                <Box key={index}>
                                    <Typography variant="caption">
                                        {'گزینه  ' + (index + 1)}
                                    </Typography>
                                    <Typography>{item.title}</Typography>
                                </Box>
                            );
                        })}
                    </Stack>
                </Box>
            );
        else
            return (
                <Typography variant="body2" sx={{mt: '10px'}}>
                    {props.formData.filter((item) => item.id == id)[0].title}
                </Typography>
            );
    };

    useLayoutEffect(() => {
        // after new message

        return () => {
            if (myRef && myRef.current && props.editMode)
                myRef.current.scrollIntoView({behavior: 'smooth'});
        };
    }, [props.goDown, props.editMode]);

    const handleOnDragEnd = (result: any) => {
        const items = Array.from(props.formData);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        const temp = items;
        temp.map((item, index) => {
            formik.setFieldValue(`${item.id}_order`, index);
        });
    };

    useEffect(() => {
        // console.log(props.formData);
    }, [props.formData]);

    return (
        <Box>
            {props.loading ? (
                <Box
                    sx={{
                        minHeight: '560px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <CircularProgress/>
                </Box>
            ) : (
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <Box
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                sx={{maxHeight: '560px', overflow: 'auto'}}
                            >
                                {props.formData
                                    .sort((a, {order}) => a.order - order)
                                    .map((data: finalDataType, index: number) => (
                                        <Draggable
                                            key={data.id}
                                            draggableId={`${data.id}`}
                                            index={index}
                                            isDragDisabled={!props.editMode}
                                        >
                                            {(provided) => (
                                                <Box
                                                    sx={{mb: '10px'}}
                                                    key={index}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <FieldItem
                                                        data={data}
                                                        type={data.field_type}
                                                        editMode={props.editMode}
                                                        formData={props.formData}
                                                    >
                                                        {props.editMode
                                                            ? getControl(
                                                                data.field_type,
                                                                data.id,
                                                                data.values,
                                                            )
                                                            : getValue(
                                                                data.field_type,
                                                                data.id,
                                                                data.values,
                                                            )}
                                                    </FieldItem>
                                                </Box>
                                            )}
                                        </Draggable>
                                    ))}
                                <div ref={myRef}/>
                            </Box>
                        )}
                    </Droppable>
                </DragDropContext>
            )}
            {props.editMode && (
                <Droppable droppableId="form_droppable" type="controls">
                    {(provided, snapshot) => (
                        <Box {...provided.droppableProps} ref={provided.innerRef}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '2px dashed #EAD3D3',
                                    flexDirection: 'column',
                                    p: '40px 0',
                                    gap: '16px',
                                    mt: '10px',
                                    borderRadius: '6px',
                                    '& svg': {
                                        fontSize: '40px',
                                        color: '#8C8C8C',
                                    },
                                }}
                            >
                                <RiDragDropLine/>
                                <Typography variant="body2">
                                    برای افزودن سوال جدید، از پنل سمت راست فیلد موردنظر را به اینجا
                                    بکشید
                                </Typography>
                            </Box>
                            {provided.placeholder}
                        </Box>
                    )}
                </Droppable>
            )}
        </Box>
    );
};
