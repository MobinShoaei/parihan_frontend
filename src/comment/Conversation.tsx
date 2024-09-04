import {Box} from '@mui/material';
import moment from 'jalali-moment';
import React, {useEffect, useRef} from 'react';
import {commentType} from './CommentModal';
import {Message} from './Message';
import {Alert} from "@mui/lab";

interface ConversationProps {
    comments: commentType[];
}

export const Conversation = (props: ConversationProps): JSX.Element => {
    let myRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        return () => {
            if (myRef && myRef.current) myRef.current.scrollIntoView({behavior: 'smooth'});
        };
    }, [props]);

    return (
        <Box
            sx={{
                height: 'calc(100% - 120px)',
                overflowY: 'auto',
                padding: '20px 15px',
            }}
        >
            {props.comments.length > 0 ? props.comments.map((comment, index) => {
                    return <Message key={index} employer={comment.is_employer} comment={comment}/>;
                })
                :
                <Alert severity="warning">یادداشتی برای این رکورد ثبت نشده است!</Alert>
            }

            <div ref={myRef}/>
        </Box>
    );
};
