import {Box, Grid} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {State} from '../../redux/reducers';
import {HttpMethod, sendRequest} from '../../utils/axios';
import {BackendUrls} from '../../utils/backend-urls';
import {catchRequestError, checkProperties} from '../../utils/functions';
import {NewUser} from './user-manager/NewUser';
import {UsersList} from './user-manager/UsersList';

export type userType = {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    organization_level: string;
    is_active: boolean;
    avatar: string | null;
    password?: string;
    project: number
};

export type lockedUserType = { id: number; last_state: boolean };

export const UsersManager = () => {
    const [users, setUsers] = useState<userType[]>([]);
    const [userId, setUserId] = useState<number>(0);
    const [reRender, setReRender] = useState<boolean>(false);
    const [lockUser, setLockUser] = useState<lockedUserType>({
        id: 0,
        last_state: false,
    });
    const [searchValue, setSearchValue] = useState<string>('');

    useEffect(() => {
        let url = BackendUrls.org_user;
        let method = HttpMethod.GET;
        let params: { [key: string]: string | boolean } = {search: searchValue};
        if (lockUser.id !== 0) {
            url = BackendUrls.org_user + lockUser.id + '/';
            method = HttpMethod.PATCH;
            params = {is_active: !lockUser.last_state};
        }

        sendRequest(url, method, checkProperties(params))
            .then((res) => {
                if (lockUser.id !== 0)
                    setLockUser({
                        id: 0,
                        last_state: false,
                    });
                else setUsers(res.data.results);
            })
            .catch((err) => catchRequestError(err));
    }, [lockUser, reRender, searchValue]);

    return (
        <Grid container spacing={'20px'}>
            <Grid item md={7.8} xs={12}>
                <UsersList
                    users={users}
                    setUserId={setUserId}
                    setLockUser={setLockUser}
                    setSearchValue={setSearchValue}
                />
            </Grid>
            <Grid item md={4.2} xs={12}>
                <NewUser userId={userId} setReRender={setReRender} setUserId={setUserId}/>
            </Grid>
        </Grid>
    );
};
