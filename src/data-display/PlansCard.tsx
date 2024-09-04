import {
    Box,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Skeleton,
    Typography,
} from '@mui/material';
import Link from 'next/link';
import React, {useState} from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import {PlanType} from '../dashboard/Plans';
import {showPrice} from '../../utils/functions';
import Image from 'next/image';

interface PlansCardProps {
    bold?: boolean;
    loading: boolean;
    data: PlanType;
    special?: boolean;
}

export const PlansCard = (props: PlansCardProps) => {
    function generate(element: React.ReactElement) {
        return [0, 1, 2].map((value) =>
            React.cloneElement(element, {
                key: value,
            }),
        );
    }

    return (
        <Box
            sx={{
                background: '#FFFFFF',
                padding: '30px',
                border: props.bold ? '2px solid #E53F4C' : '0.895238px solid #EAD3D3',
                borderRadius: '5.37143px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '25px',
                transform: props.bold ? 'scale(1.07, 1.07)' : null,
                boxShadow: props.bold ? '0.895238px 5.37143px 12.5333px rgba(0, 0, 0, 0.15)' : null,
            }}
        >
            {props.loading ? (
                <>
                    <Skeleton variant="circular" width={60} height={60} animation="wave"/>
                    <Skeleton variant="text" animation="wave" width={70}/>
                    <Skeleton variant="text" animation="wave" width={100}/>
                    <Box sx={{width: '100%'}}>
                        <Skeleton animation="wave" height={10} width="100%"/>
                        <Skeleton animation="wave" height={10} width="100%"/>
                        <Skeleton animation="wave" height={10} width="100%"/>
                        <Skeleton animation="wave" height={10} width="100%"/>
                    </Box>

                    <List sx={{textAlign: 'left', width: '100%'}}>
                        {generate(
                            <ListItem
                                sx={{
                                    padding: '5px 0',
                                    '& .muirtl-cveggr-MuiListItemIcon-root': {
                                        minWidth: '30px',
                                    },
                                }}
                            >
                                <ListItemIcon>
                                    <Skeleton
                                        variant="circular"
                                        width={20}
                                        height={20}
                                        animation="wave"
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={<Skeleton animation="wave" height={10} width="80%"/>}
                                />
                            </ListItem>,
                        )}
                    </List>
                </>
            ) : (
                <>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Image
                            src={props.data.icon ? props.data.icon : '/images/icon.png'}
                            alt="Icon"
                            width={'70px'}
                            height={'70px'}
                            objectFit="cover"
                            unoptimized={true}
                        />
                        <Typography variant="body2" sx={{textAlign: 'center'}}>
                            {props.data.name}
                        </Typography>
                    </Box>
                    <Typography variant="subtitle2" sx={{fontSize: '18px'}}>
                        {props.special ? 'تماس بگیرید' : showPrice(props.data.price) + ' تومان'}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '5px',
                        }}
                    >
                        {props.data.description.split(',').map((item, index) => {
                            return (
                                <Typography variant="caption" key={index}>
                                    {item}
                                </Typography>
                            );
                        })}
                    </Box>
                    <Box sx={{width: '100%'}}>
                        <Link href="https://hamcall.ir/contact-us/">
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{
                                    background: props.special ? '#385A86' : `#E53F4C`,
                                    '&:hover': {
                                        background: props.special ? '#385A86' : `#E53F4C`,
                                    },
                                }}
                            >
                                {props.special ? 'تماس بگیرید' : 'سفارش'}
                            </Button>
                        </Link>
                    </Box>
                    <List sx={{textAlign: 'left', width: '100%'}}>
                        {props.data.attributes.map((attribute: string, index: number) => {
                            return (
                                <ListItem
                                    key={index.toString()}
                                    sx={{
                                        padding: '5px 0',
                                        '& .muirtl-cveggr-MuiListItemIcon-root': {
                                            minWidth: '30px',
                                        },
                                    }}
                                >
                                    <ListItemIcon>
                                        <TaskAltIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={attribute}/>
                                </ListItem>
                            );
                        })}
                    </List>
                </>
            )}
        </Box>
    );
};
