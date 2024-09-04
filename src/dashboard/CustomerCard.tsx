import {Badge, Paper, Tooltip, Typography} from '@mui/material';
import {Box} from '@mui/system';
import Image from 'next/image';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import {unreadMessageTypes} from './Dashboard';
import {useIsMobile} from '../hook/useIsMobile';
import {ellipsisText} from "../../utils/functions";

interface CustomerCardProps {
    count?: unreadMessageTypes;
    name: string;
    logo: string;
    disabled: boolean;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
    is_active: boolean;
    setChatDrawerVisible: Dispatch<SetStateAction<boolean>>;
   
}

export const CustomerCard = (props: CustomerCardProps) => {
    const matches = useIsMobile();

    return (
        <Badge
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            badgeContent={props.is_active ? 0 : props.count?.unread_message_count}
            sx={{
                '& > span': {
                    mr: '10px',
                },
            }}

        >
            <Paper
                elevation={props.disabled || !props.is_active ? 0 : 4}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: {sm: '75px', xs: '60px'},
                    minWidth: {sm: '75px', xs: '60px'},
                    backgroundColor: props.is_active ? '#fff' : '#FAF2F2',
                    padding: '5px',
                    alignItems: 'center',
                    border: props.is_active ? '2px solid' : 'unset',
                    borderColor: props.is_active ? '#E53F4C' : 'secondary.light',
                    borderRadius: '7px',
                    cursor: props.disabled ? 'not-allowed' : 'pointer',
                    boxShadow: props.is_active ? '0px 4px 10px rgba(229, 63, 76, 0.2)' : 'unset',
                }}
                onClick={props.onClick}

            >
                <Box
                    sx={{
                        height: {sm: '40px', xs: '45px'},
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            position: 'relative',
                            height: '40px',
                        }}
                    >
                        <Image
                            quality={100}
                            src={props.logo ? props.logo : '/images/user.png'}
                            layout="fill"
                            objectFit="contain"
                            style={{filter: `grayscale(${props.is_active ? 0 : 1})`}}
                            alt="true"
                            unoptimized={true}
                        />
                    </Box>
                </Box>
                {!matches && (
                    <Box>
                        <Tooltip title={props.name}>
                            <Typography
                                sx={{
                                    color: props.is_active ? 'unset' : '#8C8C8C', fontSize: '14px', width: '60px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    textAlign: 'center'
                                }}>
                                {props.name}
                            </Typography>
                        </Tooltip>
                    </Box>
                )}
            </Paper>
        </Badge>
    );
};
