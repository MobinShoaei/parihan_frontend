import {Box} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {toast} from 'react-toastify';
import {HttpMethod, sendRequest} from '../../../utils/axios';
import {BackendUrls} from '../../../utils/backend-urls';
import {catchRequestError} from '../../../utils/functions';
import {CustomeLoadingButton} from '../../inputs/CustomLoadingButton';
import {TagItem, TagType, visibleTag} from './TagItem';
import {TagItemSkeleton} from './TagItemSkeleton';
import {useSelector} from "react-redux";
import {State} from "../../../redux/reducers";

export const TagManager = () => {
    const [tagList, setTagList] = useState<TagType[]>([]);
    const [reRender, setReRender] = useState<boolean>(false);
    const [newItemVisible, setNewItemVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const dragItem = React.useRef<any>(null);
    const dragOverItem = React.useRef<any>(null);


    useEffect(() => {
        setLoading(true);
        setNewItemVisible(false);
        let url = BackendUrls.tag;
        let method = HttpMethod.GET;

        sendRequest(url, method)
            .then((res) => {
                setTagList(res.data.results);
            })
            .catch((err) => catchRequestError(err))
            .finally(() => setLoading(false));
    }, [reRender]);

    const ordering = (list: any) => {
        let ordered: { tag: number; order: number }[] = [];
        const revArr: TagType[] = [].concat(list).reverse();
        revArr.map((item, order) => {
            ordered.push({tag: item.id, order: order + 1});
        });

        sendRequest(BackendUrls.tag_order, HttpMethod.POST, ordered)
            .then((response) => {
                toast.success(response.data.detail);
            })
            .catch((err) => catchRequestError(err));
    };

    const handleOnDragEnd = (result: any) => {
        const items = Array.from(tagList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        ordering(items);
        setTagList(items);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <Box
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            sx={{
                                maxWidth: '600px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                            }}
                        >
                            {!loading ? (
                                tagList.map((tag, index) => {
                                    return (
                                        <Draggable
                                            key={tag.id}
                                            draggableId={`${tag.id}`}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <Box
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    sx={{mb: '10px', cursor: 'move'}}
                                                >
                                                    <TagItem
                                                        data={tag}
                                                        locked={!tag.is_visible}
                                                        setReRender={setReRender}
                                                    />
                                                </Box>
                                            )}
                                        </Draggable>
                                    );
                                })
                            ) : (
                                <Box sx={{mb: '10px', cursor: 'move'}}>
                                    <TagItemSkeleton/>
                                    <TagItemSkeleton/>
                                    <TagItemSkeleton/>
                                </Box>
                            )}
                            {newItemVisible && <TagItem setReRender={setReRender} newItem/>}
                        </Box>
                    )}
                </Droppable>
            </DragDropContext>
            <CustomeLoadingButton
                sx={{
                    marginTop: {md: 4, xs: 2},
                    padding: '11px 22px',
                    backgroundColor: '#385A86',
                    maxWidth: '430px',
                }}
                onClick={() => setNewItemVisible(true)}
                disabled={loading}
            >
                {'افزودن وضعیت جدید'}
            </CustomeLoadingButton>
        </Box>
    );
};
