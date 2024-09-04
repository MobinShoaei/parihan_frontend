import React, {useEffect, useState} from 'react'
import {Box, Button, CircularProgress, InputAdornment, Stack, TextField, Typography} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {ContactTableItem} from "../data-display/ContactTableItem";
import {HttpMethod, sendRequest} from "../../utils/axios";
import {BackendUrls} from "../../utils/backend-urls";
import {catchRequestError} from "../../utils/functions";

export type ContactType = {
    contact_id: number
    name: string
    phone_number: string
    telephone_number: string
    address: string
    is_legal: boolean
}


export const Contacts = () => {
    const [searchInputValue, setSearchInputValue] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [contacts, setContacts] = useState<ContactType[]>([])
    const [reload, setReload] = useState<boolean>(false)

    const handelSearch = (v: string) => {

    }

    useEffect(() => {
        let params: { [key: string]: string } = {}
        if (searchInputValue) params.search = searchInputValue
        setLoading(true)
        sendRequest(BackendUrls.contact, HttpMethod.GET, params)
            .then((res) => {
                setContacts(res.data.results)
            })
            .catch(catchRequestError)
            .finally(() => setLoading(false))
    }, [reload, searchInputValue])


    return (
        <Stack gap={1}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant={'caption'}>{`لیست مخاطبین(${contacts.length})`}</Typography>
                <Stack direction={'row'} gap={2}>
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon onClick={() => searchInputValue && handelSearch(searchInputValue)}
                                                sx={{cursor: 'pointer'}}/>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position={"end"}>
                                    {searchInputValue && <HighlightOffIcon sx={{cursor: 'pointer'}} onClick={() => {

                                        setSearchInputValue('')
                                    }}/>}
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                        placeholder="جستجو در بین مخاطبین ..."
                        sx={{fontSize: '12px'}}
                        onKeyDown={(e: any) => {
                            if (e.code === 'Enter' || e.code === 'NumpadEnter') {
                                if (!e.shiftKey) {
                                    handelSearch(e.target.value);
                                }
                            }
                        }}
                        value={searchInputValue}
                        onChange={(e) => setSearchInputValue(e.target.value)}
                    />
                    <Button variant={'contained'} startIcon={<PersonAddIcon/>}>مخاطب جدید</Button>
                </Stack>
            </Stack>
            <Stack gap={1}>
                {
                    loading ? <Box
                            sx={{
                                overflowY: 'auto',
                                padding: '30px 0',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <CircularProgress/>
                        </Box> :
                        contacts.map((item, key) => {
                            return (
                                <ContactTableItem key={key} data={item} setReload={setReload}/>
                            )
                        })
                }


            </Stack>

        </Stack>
    )
}
