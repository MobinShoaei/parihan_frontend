import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';
import { MdManageAccounts } from 'react-icons/md';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { notifType } from '../dashboard/NotificationModal';
import jmoment from 'jalali-moment';
import { useDispatch } from 'react-redux';
import { setProjectId } from '../../redux/actions/project_id';
import { setRecordId } from '../../redux/actions/record_id';

interface notifItemProps {
    read?: boolean;
    notif: notifType;
    setNotifModal: Dispatch<SetStateAction<boolean>>;
}

export const NotifItem = (props: notifItemProps) => {
    const dispatch = useDispatch();

    const goToRecord = () => {
        props.setNotifModal((r) => !r);
        dispatch(setProjectId(props.notif.project.id));
        dispatch(setRecordId(props.notif.record));
    };

    return (
        <Box
            sx={{
                border: '0.741869px solid #EAD3D3',
                borderRadius: '4.45121px',

                opacity: props.read ? '0.6' : '1',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    background: 'rgb(234, 211, 211,0.32)',
                    p: '4px 6px',
                    borderRadius: '4.45121px 4.45121px 0 0',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        height: '20px',
                        position: 'relative',
                        minWidth: '40px',
                    }}
                >
                    <Image
                        src={
                            props.notif.project.logo ? props.notif.project.logo : '/images/user.png'
                        }
                        layout="fill"
                        objectFit="contain"
                        alt="customer logo"
                    />
                </Box>
                <Typography sx={{ color: '#8C8C8C', fontSize: { sm: '9px' } }}>
                    {props.notif.project.name}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: '7px 8px',
                }}
            >
                <Box sx={{ display: 'flex', gap: '9px' }}>
                    <MdManageAccounts
                        style={{
                            backgroundColor: '#FFAD33',
                            fontSize: '34px',
                            borderRadius: '50%',
                            padding: '7px',
                            color: 'white',
                        }}
                    />
                    <Box>
                        <Typography>{props.notif.text}</Typography>
                        <Typography sx={{ color: '#8C8C8C', fontSize: { sm: '14px' } }}>
                            {jmoment(props.notif.created_at).locale('fa').fromNow()}
                        </Typography>
                    </Box>
                </Box>
                <MdKeyboardArrowLeft
                    style={{
                        width: '32px',
                        height: '32px',
                        border: '0.895238px solid #35BBD6',
                        borderRadius: '4px',
                        color: '#35BBD6',
                        padding: '2px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        fontWeight: 'lighter',
                    }}
                    onClick={goToRecord}
                />
            </Box>
        </Box>
    );
};
