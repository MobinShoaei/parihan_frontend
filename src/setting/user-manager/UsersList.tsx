import {Box, InputAdornment, TextField, Typography} from '@mui/material';
import React, {Dispatch, SetStateAction, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {UserItem} from './UserItem';
import {lockedUserType, userType} from '../UsersManager';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

interface UsersListProps {
    users: userType[];
    setUserId: Dispatch<SetStateAction<number>>;
    setLockUser: Dispatch<SetStateAction<lockedUserType>>;
    setSearchValue: Dispatch<SetStateAction<string>>;
}

export const UsersList = (props: UsersListProps) => {
    const [searchInputValue, setSearchInputValue] = useState<string>()

    return (
        <Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="body2">لیست کاربران ({props.users.length})</Typography>
                <TextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment onClick={() => searchInputValue && props.setSearchValue(searchInputValue)}
                                            sx={{fontSize: '12px', cursor: 'pointer'}} position="start">
                                <SearchIcon/>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position={"end"}>
                                {searchInputValue && <HighlightOffIcon sx={{cursor: 'pointer'}} onClick={() => {
                                    props.setSearchValue('');
                                    setSearchInputValue('')
                                }}/>}
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                    placeholder="جستجو در بین کاربران ..."
                    sx={{'& input': {fontSize: '14px'}}}
                    onKeyDown={(e: any) => {
                        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
                            if (!e.shiftKey) {
                                props.setSearchValue(e.target.value);
                            }
                        }
                    }}
                    value={searchInputValue}
                    onChange={(e) => setSearchInputValue(e.target.value)}
                />
            </Box>
            <Box sx={{mt: '20px', height: 'calc(100vh - 250px)', overflow: 'auto', pr: '10px'}}>
                {props.users.map((user, index) => {
                    return (
                        <UserItem
                            data={user}
                            locked={!user.is_active}
                            key={index}
                            setUserId={props.setUserId}
                            setLockUser={props.setLockUser}

                        />
                    );
                })}
            </Box>
        </Box>
    );
};
