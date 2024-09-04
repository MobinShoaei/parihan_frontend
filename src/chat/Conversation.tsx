import {Box} from '@mui/material';
import moment from 'jalali-moment';
import React, {useEffect, useRef} from 'react';
import {Message} from '../chat/Message';
import {DateDivider} from './DateDivider';
import {useSelector} from "react-redux";
import {State} from "../../redux/reducers";

export const Conversation = (props: { data: any }): JSX.Element => {
    const chatAccess = useSelector((state: State) => state.accesses).includes("chat_access")

    let myRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // after new message
        return () => {
            if (myRef && myRef.current) myRef.current.scrollIntoView({behavior: 'smooth'});
        };
    }, [props]);
    return (
        <Box sx={{
            height: chatAccess ? 'calc(100vh - 120px)' : 'calc(100vh - 60px)',
            overflowY: 'auto',
            padding: '30px 0'
        }}>
            {props.data.map((item: any, index: number) => {

                return (
                    <>
                        {(index == 0 ||
                            moment(item.date).format('YYYY-MM-DD') !==
                            moment(props.data[index - 1].date).format('YYYY-MM-DD')) && (
                            <DateDivider date={item.date}/>
                        )}
                        <Message
                            guest={item.guest}
                            text={item.text}
                            file={item.file}
                            author={item.author}
                            date={item.date}
                            loading={item.loading}
                        />
                    </>
                );
            })}
            <div ref={myRef}/>
        </Box>
    );
};
