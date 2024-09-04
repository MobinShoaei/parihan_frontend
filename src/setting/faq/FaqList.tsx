import {Box, InputAdornment, TextField, Typography} from '@mui/material';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {FormContentType} from '../../dashboard/InformationTable';
import {ItemType} from '../../data-display/DnD';
import dynamic from 'next/dynamic';
import {HttpMethod, sendRequest} from '../../../utils/axios';
import {BackendUrls} from '../../../utils/backend-urls';
import {catchRequestError, checkProperties} from '../../../utils/functions';
import {lockedUserType} from '../UsersManager';
import {toast} from 'react-toastify';
import {FaqItem} from './FaqItem';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export type FaqDataType = {
    id: number;
    question: string;
    answer: string;
    order: number;
    is_visible: boolean;
};

interface FaqListProps {
    setFaqId: Dispatch<SetStateAction<number>>;
    reRender: boolean;
}

export const FaqList = (props: FaqListProps) => {

    const [searchInputValue, setSearchInputValue] = useState<string>()
    const [faqList, setFaqList] = useState<FaqDataType[]>([]);
    const [searchValue, setSearchValue] = useState<string>();
    const [visibleFaq, setVisibleFaq] = useState<lockedUserType>({
        id: 0,
        last_state: false,
    });

    useEffect(() => {
        let url = BackendUrls.faq;
        let method = HttpMethod.GET;
        let params: { [key: string]: string | boolean | undefined } = {search: searchValue};
        if (visibleFaq.id !== 0) {
            url = BackendUrls.faq + visibleFaq.id + '/';
            method = HttpMethod.PATCH;
            params = {is_visible: !visibleFaq.last_state};
        }
        sendRequest(url, method, checkProperties(params))
            .then((res) => {
                if (visibleFaq.id !== 0)
                    setVisibleFaq({
                        id: 0,
                        last_state: false,
                    });
                else setFaqList(res.data.results);
            })
            .catch((err) => catchRequestError(err));
    }, [visibleFaq, props.reRender, searchValue]);

    const ordering = (list: any) => {
        let ordered: { faq: number; order: number }[] = [];
        const revArr: FaqDataType[] = [].concat(list).reverse();
        revArr.map((item, order) => {
            ordered.push({faq: item.id, order: order + 1});
        });

        sendRequest(BackendUrls.faq_order, HttpMethod.POST, ordered)
            .then((response) => {
                toast.success(response.data.detail);
            })
            .catch((err) => catchRequestError(err));
    };

    const handleOnDragEnd = (result: any) => {
        const items = Array.from(faqList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        ordering(items);
        setFaqList(items);
    };

    return (
        <Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="body2">لیست سوالات متداول بر اساس ترتیب نمایش</Typography>
                <TextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon onClick={() => searchInputValue && setSearchValue(searchInputValue)}
                                            sx={{cursor: 'pointer'}}/>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position={"end"}>
                                {searchInputValue && <HighlightOffIcon sx={{cursor: 'pointer'}} onClick={() => {
                                    setSearchValue(undefined);
                                    setSearchInputValue('')
                                }}/>}
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                    placeholder="جستجو در بین سوالات متداول "
                    sx={{'& input': {fontSize: '14px'}, width: '215px'}}
                    onKeyDown={(e: any) => {
                        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
                            if (!e.shiftKey) {
                                setSearchValue(e.target.value);
                            }
                        }
                    }}
                    value={searchInputValue}
                    onChange={(e) => setSearchInputValue(e.target.value)}
                />
            </Box>
            <Box sx={{height: 'calc(100vh - 250px)', overflow: 'auto', marginTop: '10px'}}>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <Box {...provided.droppableProps} ref={provided.innerRef}>
                                {faqList.map((faq, index) => {
                                    return (
                                        <Draggable
                                            key={faq.id}
                                            draggableId={`${faq.id}`}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <Box
                                                    sx={{mb: '10px', cursor: 'move'}}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <FaqItem
                                                        data={faq}
                                                        setFaqId={props.setFaqId}
                                                        setVisibleFaq={setVisibleFaq}
                                                        locked={!faq.is_visible}
                                                    />
                                                </Box>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </Box>
                        )}
                    </Droppable>
                </DragDropContext>
            </Box>
        </Box>
    );
};
