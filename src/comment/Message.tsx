import {Avatar, Box, Menu, MenuItem, Typography} from '@mui/material';
import React from 'react';
import {MdMoreHoriz} from 'react-icons/md';
import {commentType} from './CommentModal';
import jmoment from 'jalali-moment';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {HttpMethod, sendRequest} from '../../utils/axios';
import {BackendUrls} from '../../utils/backend-urls';
import {toast} from 'react-toastify';
import {catchRequestError} from '../../utils/functions';
import {getToken} from '../../utils/cookies';
import jwt_decode from 'jwt-decode';

interface MessageProps {
    employer?: boolean;
    comment: commentType;
}

export const Message = (props: MessageProps) => {
    const token = getToken();
    const profile: any = jwt_decode(token !== null ? token : '');

    return (
        <Box sx={{mb: '30px'}}>
            <Box
                sx={{
                    display: 'flex',
                    gap: '5px',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: '6px',
                }}
            >
                <Box sx={{display: 'flex', gap: '5px', alignItems: 'center'}}>
                    <Avatar alt="#" src={props.comment.user.avatar} sx={{width: 24, height: 24}}/>
                    <Typography variant="body2" sx={{fontSize: '12px'}}>
                        {props.comment.user.first_name + ' ' + props.comment.user.last_name}
                        {profile.role !== null ? !props.employer && ' (پشتیبان همکار)' : ''}
                    </Typography>
                </Box>
                <Typography variant="body2" sx={{fontSize: '12px'}}>
                    {jmoment(props.comment.created_at).locale('fa').format('YYYY/MM/DD - HH:mm ')}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    gap: '5px',
                }}
            >
                <Box
                    sx={{
                        backgroundColor: props.employer
                            ? 'rgb(234, 211, 211,0.4)'
                            : 'rgb(6, 239, 239,0.2)',
                        p: '11px 13px',
                        borderRadius: props.employer ? '10px 10px 0px 10px' : '10px 10px 10px 0px',
                        width: 'calc(100%)',
                    }}
                >
                    <Typography variant="body1" sx={{fontSize: '14px'}}>
                        {props.comment.text}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};
