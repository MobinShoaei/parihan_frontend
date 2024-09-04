import {Avatar, Box, Grid, Typography} from '@mui/material';
import React, {Dispatch, SetStateAction} from 'react';
import {Edit} from '../common/Edit';
import {Lock} from '../common/Lock';
import {lockedUserType, userType} from '../UsersManager';

interface UserItemProps {
    locked?: boolean;
    data: userType;
    setUserId: Dispatch<SetStateAction<number>>;
    setLockUser: Dispatch<SetStateAction<lockedUserType>>;
}

export const UserItem = (props: UserItemProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#fff',
                border: '0.747929px solid #EAD3D3',
                borderRadius: '6px',
                mb: '8px',
                minHeight: '56px',
                p: '10px 12px',
            }}
        >
            <Grid container>
                <Grid item md={5} xs={12}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            opacity: props.locked ? '0.5' : '1',
                        }}
                    >
                        <Avatar
                            alt="user-profile"
                            src={props.data.avatar ? props.data.avatar : '/images/user.png'}
                        />
                        <Typography>
                            {props.data.first_name + ' ' + props.data.last_name}
                        </Typography>
                    </Box>
                </Grid>
                <Grid
                    item
                    md={3}
                    xs={12}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Typography sx={{opacity: props.locked ? '0.5' : '1'}}>
                        {props.data.username}
                    </Typography>
                </Grid>
                <Grid
                    item
                    md={2}
                    xs={12}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="body2" sx={{opacity: props.locked ? '0.5' : '1'}}>
                        {props.data.project == null ? 'پشتیبان همکار' : props.data.organization_level
                            ? props.data.organization_level
                            : 'تعریف نشده'}
                    </Typography>
                </Grid>
                <Grid item md={2} xs={12}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            justifyContent: 'end',
                        }}
                    >

                        {
                            props.data.project &&
                            <>
                                <Lock
                                    onClick={() =>
                                        props.setLockUser({
                                            id: props.data.id,
                                            last_state: props.data.is_active,
                                        })
                                    }
                                    locked={props.locked}
                                />
                                <Edit
                                    onClick={() => !props.locked && props.setUserId(props.data.id)}
                                    locked={props.locked}
                                />
                            </>
                        }

                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};
