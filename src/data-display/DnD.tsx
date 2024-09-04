import {Box, CircularProgress} from '@mui/material';
import dynamic from 'next/dynamic';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {DragDropContext, DropResult} from 'react-beautiful-dnd';
import {HttpMethod, sendRequest} from '../../utils/axios';
import {FormContentType} from '../dashboard/InformationTable';
import {BackendUrls} from '../../utils/backend-urls';
import {toast} from 'react-toastify';
import {catchRequestError} from '../../utils/functions';
import {formFieldsType} from '../dashboard/InformationForm';
import {useDispatch, useSelector} from 'react-redux';
import {State} from '../../redux/reducers';
import {setInformationTableValues} from "../../redux/actions/information_table_values";

const CoulomCartView = dynamic<React.ComponentProps<any>>(
    () => import('../common/CoulomCartView').then((mod) => mod.CoulomCartView),
    {ssr: false},
);

export type ItemType = {
    id: string;
    taskIds: number[];
    color: string;
    count: number;
};

type tag_by_list = {
    id: number;
    title: string;
    color_hex: string;
    count: number;
    records: FormContentType[];
};

interface DnDProps {
    tags: { id: number; title: string; color_hex: string }[];
    data: FormContentType[];
    setTabValue: Dispatch<SetStateAction<string>>;
    formFields: formFieldsType[];
    searchValue?: string
    userId?: number | undefined
}

export type initialDataType = {
    columnOrder: string[];
    columns: { [key: string]: { id: string; taskIds: number[]; color: string; count: number } };
    tasks: { [key: number]: { id: number; data: FormContentType } };
};

const reorderColumnList = (sourceCol: ItemType, startIndex: number, endIndex: number) => {
    const newTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = newTaskIds.splice(startIndex, 1);
    newTaskIds.splice(endIndex, 0, removed);
    const newColumn = {
        ...sourceCol,
        taskIds: newTaskIds,
    };
    return newColumn;
};

export const DnD = (props: DnDProps) => {
    const [state, setState] = useState<initialDataType>({
        columnOrder: [],
        columns: {},
        tasks: {},
    });
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch()

    const projectId = useSelector((state: State) => state.projectId);


    useEffect(() => {
        setLoading(true);
        let params: { [key: string]: string | number } = {form__project: projectId}
        if (props.userId) {
            params.linked_user = props.userId;
        }
        let initialData: initialDataType = {
            columnOrder: [],
            columns: {},
            tasks: {},
        };
        initialData.columns = {};
        initialData.tasks = {};
        if (props.searchValue) {
            params.search = props.searchValue;
        }
        sendRequest(BackendUrls.tag_by_list, HttpMethod.GET, params)
            .then((res) => {
                let allRecords: FormContentType[] = []
                res.data.result.map((item: tag_by_list) => {

                    let taskIds: number[] = [];
                    initialData.columnOrder.push(item.title);
                    item.records.map((d) => {
                        initialData.tasks[d.id] = {id: d.id, data: d};
                        taskIds.push(d.id);
                        allRecords.push(d)
                    });
                    dispatch(setInformationTableValues(allRecords))
                    initialData.columns[item.title] = {
                        id: item.title,
                        taskIds: taskIds,
                        color: item.color_hex,
                        count: item.count,
                    };
                });
            })
            .catch((err) => catchRequestError(err))
            .finally(() => {
                setLoading(false);
            });

        setState(initialData);
    }, [props.tags, projectId, props.searchValue]);

    const onDragEnd = (result: DropResult) => {
        const {destination, source, draggableId} = result;

        if (destination?.droppableId && destination?.droppableId !== source?.droppableId)
            updateRecord(draggableId, destination.droppableId);

        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const sourceCol = state.columns[source.droppableId];
        const destinationCol = state.columns[destination.droppableId];

        if (sourceCol.id === destinationCol.id) {
            const newColumn = reorderColumnList(sourceCol, source.index, destination.index);

            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newColumn.id]: newColumn,
                },
            };

            setState(newState);
            return;
        }

        const startTaskIds = Array.from(sourceCol.taskIds);
        const [removed] = startTaskIds.splice(source.index, 1);
        const newStartCol = {
            ...sourceCol,
            taskIds: startTaskIds,
        };

        const endTaskIds = Array.from(destinationCol.taskIds);
        endTaskIds.splice(destination.index, 0, removed);
        const newEndCol = {
            ...destinationCol,
            taskIds: endTaskIds,
        };

        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newStartCol.id]: newStartCol,
                [newEndCol.id]: newEndCol,
            },
        };

        setState(newState);
    };

    const updateRecord = (droppableId: string, droppableName: string) => {
        let tagId;
        props.tags.map((item) => {
            if (item.title == droppableName) tagId = item.id;
        });
        sendRequest(BackendUrls.update_tag, HttpMethod.PATCH, {
            tag: tagId,
            record: parseInt(droppableId),
        })
            .then((res) => toast.success(`وضعیت به ${droppableName} تغییر کرد `))
            .catch((err) => {
                catchRequestError(err);
            });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {
                <Box
                    sx={{
                        display: 'flex',
                        gap: '12px',
                        height: '100%',
                        overflowX: 'auto',
                        width: '100%',
                    }}
                >
                    {loading ? (
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                height: 'calc(100vh - 330px)',
                                alignItems: 'center',
                            }}
                        >
                            <CircularProgress/>
                        </Box>
                    ) : (
                        state.columnOrder.map((columnId: string) => {
                            const column = state.columns[columnId];
                            const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

                            return (
                                <CoulomCartView
                                    key={column.id}
                                    column={column}
                                    tasks={tasks}
                                    setTabValue={props.setTabValue}
                                    tags={props.tags}
                                    formFields={props.formFields}
                                    setState={setState}
                                    state={state}
                                />
                            );
                        })
                    )}
                </Box>
            }
        </DragDropContext>
    );
};
