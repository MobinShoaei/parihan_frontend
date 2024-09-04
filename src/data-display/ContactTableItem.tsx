import React, {Dispatch, SetStateAction} from 'react'
import {Grid, Stack, Typography} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import {Delete} from "../setting/common/Delete";
import {Edit} from "../setting/common/Edit";
import {TextWithIcon} from "../common/TextWithIcon";
import Grid3x3RoundedIcon from '@mui/icons-material/Grid3x3Rounded';
import ShareLocationOutlinedIcon from '@mui/icons-material/ShareLocationOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import CallIcon from '@mui/icons-material/Call';
import {ContactType} from "../dashboard/Contacts";
import {HttpMethod, sendRequest} from "../../utils/axios";
import {BackendUrls} from "../../utils/backend-urls";
import {catchRequestError} from "../../utils/functions";
import {toast} from "react-toastify";

interface ContactTableItemProps {
    data: ContactType
    setReload: Dispatch<SetStateAction<boolean>>
}

export const ContactTableItem = (props: ContactTableItemProps) => {

    const onDelete = () => {
        sendRequest(BackendUrls.contact + props.data.contact_id + '/', HttpMethod.DELETE)
            .then((res) => {
                toast.success('مخاطب با موفقیت حذف شد')
                props.setReload(r => !r)
            })
            .catch(catchRequestError)

    }

    return (
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}
               sx={{background: '#FFF', border: '0.748px solid #EAD3D3', p: '16px', borderRadius: '6px'}}>
            <Stack direction={'row'} alignItems={'center'}>
                <PersonIcon color={'secondary'}/>
                <Typography>{props.data.name}</Typography>
            </Stack>
            <Grid container width={'60%'}>
                <Grid item md={4}><TextWithIcon icon={<Grid3x3RoundedIcon/>} text={props.data.contact_id}/></Grid>
                <Grid item md={4}><TextWithIcon icon={<PhoneAndroidOutlinedIcon/>}
                                                text={props.data.phone_number}/></Grid>
                <Grid item md={4}><TextWithIcon icon={<CallIcon/>} text={props.data.telephone_number}/></Grid>
                <Grid item md={12}><TextWithIcon icon={<ShareLocationOutlinedIcon/>}
                                                 text={props.data.address}/></Grid>
            </Grid>
            <Stack direction={'row'} gap={1}>
                <Delete onClick={() => onDelete()}/>
                <Edit onClick={() => {
                }}/>
            </Stack>
        </Stack>
    )
}
