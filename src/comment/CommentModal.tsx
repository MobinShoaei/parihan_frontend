import {Box, CircularProgress} from '@mui/material';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {HttpMethod, sendRequest} from '../../utils/axios';
import {BackendUrls} from '../../utils/backend-urls';
import {catchRequestError} from '../../utils/functions';
import {Conversation} from './Conversation';
import {Footer} from './Footer';
import {Header} from './Header';

export type commentType = {
    id: number;
    user: { first_name: string, last_name: string, avatar: string };
    text: string;
    created_at: string;
    record: number;
    is_employer: boolean;
    record_order_id: number
};

interface CommentModalProps {
    setShowMessageModal: Dispatch<SetStateAction<boolean>>;
    record_id: number;
    callTable?: boolean;
}

export const CommentModal = (props: CommentModalProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [newComment, setNewComment] = useState<string>('');
    const [comments, setComments] = useState<commentType[]>([]);
    const [reload, setReload] = useState<boolean>(true);

    useEffect(() => {
        const record_params = {record: props.record_id};
        const call_params = {call: props.record_id};
        setLoading(true);
        sendRequest(
            BackendUrls.main_omment,
            HttpMethod.GET,
            props.callTable ? call_params : record_params,
        )
            .then((res) => setComments(res.data.results))
            .catch((err) => catchRequestError(err))
            .finally(() => setLoading(false));
    }, [props.record_id, reload]);

    const sendComment = () => {
        const record_params = {
            text: newComment,
            record: props.record_id,
        };
        const call_params = {
            text: newComment,
            call: props.record_id,
        };
        sendRequest(
            BackendUrls.main_omment,
            HttpMethod.POST,
            props.callTable ? call_params : record_params,
        )
            .then((res) => {
                toast.success('یادداشت با موفقیت ثبت شد');
                setNewComment('');
                setReload((r) => !r);
            })
            .catch((err) => catchRequestError(err))
            .finally(() => setLoading(false));
    };

    return (
        <Box sx={{direction: 'ltr', width: {md: '450px', xs: '100%'}, height: '100vh'}}>
            <Header setShowMessageModal={props.setShowMessageModal} record={comments[0]?.record_order_id}
                    is_call={props.callTable}/>

            {loading ?
                <Box
                    sx={{
                        height: 'calc(100% - 120px)',
                        overflowY: 'auto',
                        padding: '30px 0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <CircularProgress/>
                </Box>
                : <Conversation comments={comments}/>}
            <Footer
                setComment={setNewComment}
                onSend={sendComment}
                comment={newComment}
                record={props.record_id}
            />
        </Box>
    );
};
