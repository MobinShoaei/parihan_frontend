import {Box, CircularProgress, LinearProgress, Typography} from '@mui/material';
import React, {Dispatch, SetStateAction, UIEvent, useEffect, useRef, useState} from 'react';
import ArrowDropDownCircleTwoToneIcon from '@mui/icons-material/ArrowDropDownCircleTwoTone';
import {ItemCartView} from './ItemCartView';
import {Draggable, Droppable} from 'react-beautiful-dnd';
import {initialDataType, ItemType} from '../data-display/DnD';
import {FormContentType} from '../dashboard/InformationTable';
import {BackendUrls} from '../../utils/backend-urls';
import {HttpMethod, sendRequest} from '../../utils/axios';
import {catchRequestError} from '../../utils/functions';
import {formFieldsType} from '../dashboard/InformationForm';
import {getToken} from "../../utils/cookies";
import jwt_decode from "jwt-decode";

interface CoulomCartViewProps {
    column: ItemType;
    tasks: { id: number; data: FormContentType }[];
    setTabValue: Dispatch<SetStateAction<string>>;
    tags: { id: number; title: string; color: string }[];
    formFields: formFieldsType[];
    setState: Dispatch<SetStateAction<initialDataType>>
    state: initialDataType

}

export const CoulomCartView = (props: CoulomCartViewProps) => {
    const [tasks, setTasks] = useState<{ id: number; data: FormContentType }[]>(props.tasks);
    const [expandVisibility, setExpandVisibility] = useState<boolean>(true);
    const [page, setPage] = useState<number>(2);
    const [loading, setLoading] = useState<boolean>(false);
    const [isOperator, setIsOperator] = useState<boolean>(false);
    const [tasksCount, setTaskCounts] = useState<number>(props.column.count)
    const token = getToken();
    const profile: any = token ? jwt_decode(token) : undefined;

    useEffect(() => {
        if (profile) setIsOperator(profile.role == 'operator');
    }, [profile]);

    const handleScroll = (e: any /*UIEvent<HTMLDivElement>*/) => {
        let element = e.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            getMoreData(props.column.id);
        }
    };

    const getMoreData = (tag: string) => {
        setLoading(true);
        let tagId;
        props.tags.map((item) => {
            if (item.title == tag) tagId = item.id;
        });
        const params = {tag: tagId, page: page, page_size: 10};
        sendRequest(BackendUrls.form_contents, HttpMethod.GET, params)
            .then((response) => {
                mergeArr(response.data.results);
                setPage((r) => r + 1);
            })
            .catch((error) => {
                // catchRequestError(error);
            })
            .finally(() => setLoading(false));
    };

    const mergeArr = (newTasks: FormContentType[]) => {
        let temp = tasks;
        newTasks.map((task) => {
            temp.push({id: task.id, data: task});
        });
        setTasks(temp);
    };


    useEffect(() => {
        setTasks(props.tasks)
    }, [props.tasks])


    return (
        <Box
            sx={{
                minWidth: {sm: '380px', xs: '290px'},
                background: 'rgb(234, 211, 211,0.3)',
                borderRadius: '10px',
                padding: '12px 10px',
                height: expandVisibility ? 'calc(100vh - 270px )' : '50px',
                transition: 'height 0.7s',
            }}
        >
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: '20px'}}>
                <Box sx={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <Box
                        sx={{
                            width: '15px',
                            height: '15px',
                            backgroundColor: props.column.color,
                            borderRadius: '100%',
                        }}
                    />
                    <Typography fontWeight={500}>
                        {props.column.id}
                        {loading && (
                            <CircularProgress disableShrink size={'15px'} sx={{ml: '5px'}}/>
                        )}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', gap: '5px'}}>
                    <Typography variant="body2">{tasksCount} رکورد</Typography>
                    <ArrowDropDownCircleTwoToneIcon
                        sx={{
                            color: '#8C8C8C',
                            cursor: 'pointer',
                            transform: expandVisibility ? 'rotate(3.142rad)' : 'rotate(0);',
                        }}
                        onClick={() => setExpandVisibility((r) => !r)}
                    />
                </Box>
            </Box>
            <Droppable droppableId={props.column.id}>
                {(droppableProvided, droppableSnapshot) => (
                    <Box
                        onScroll={handleScroll}
                        sx={{
                            display: 'flex',
                            maxHeight: expandVisibility ? 'calc(100% - 40px)' : '0px',
                            gap: '5px',
                            flexDirection: 'column',
                            overflow: 'auto',
                            height: '100%',
                            transition: 'max-height 0.7s',
                        }}
                        ref={droppableProvided.innerRef}
                        {...droppableProvided.droppableProps}
                    >
                        {props.tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={`${task.id}`} index={index}
                                       isDragDisabled={!task.data.editable}>
                                {(draggableProvided, draggableSnapshot) => (
                                    <Box
                                        ref={draggableProvided.innerRef}
                                        {...draggableProvided.draggableProps}
                                        {...draggableProvided.dragHandleProps}
                                        key={index}
                                    >
                                        <ItemCartView
                                            data={task.data}
                                            index={index}
                                            setTabValue={props.setTabValue}
                                            formFields={props.formFields}
                                            isOperator={isOperator}
                                        />
                                    </Box>
                                )}
                            </Draggable>
                        ))}
                        {droppableProvided.placeholder}
                    </Box>
                )}
            </Droppable>
        </Box>
    );
};
