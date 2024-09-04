import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {Typography} from '@mui/material';
import {Box} from '@mui/system';
import {UnreadMessageCountsType} from '../dashboard/Dashboard';
import {MdOutlineMessage} from 'react-icons/md';
import useSound from "use-sound";

interface MessageBtnProps {
    unreadMessageCounts: UnreadMessageCountsType[];
    customerId: number;
    setChatDrawerVisible: Dispatch<SetStateAction<boolean>>;
}

export const MessageBtn = (props: MessageBtnProps) => {

    const [play] = useSound('/sounds/notification.mp3');

    const unreadMessageCounts = props.unreadMessageCounts.find(
        (item: { id: number }) => item.id === props.customerId,
    )?.unread_message_count;


    useEffect(() => {
        unreadMessageCounts !== 0 && play()
    }, [unreadMessageCounts])


    return (
        <Box
            sx={{display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer'}}
            onClick={() => props.setChatDrawerVisible(true)}
        >
            <MdOutlineMessage/>
            <Typography sx={{color: '#8C8C8C', fontSize: {sm: '14px'}}}>پیام‌ها</Typography>
            {unreadMessageCounts !== 0 &&
            <Box
                sx={{
                    width: '20px',
                    height: '20px',
                    padding: '5px',
                    backgroundColor: '#FFAD33',
                    border: '1px solid #FFFFFF',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '12px',
                }}
            >
                {unreadMessageCounts}
            </Box>}

        </Box>
    );
};
