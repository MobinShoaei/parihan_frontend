import {Box, Button, CircularProgress, Divider, TextField, Typography} from '@mui/material';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import AdapterJalali from '@date-io/date-fns-jalali';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, {Dayjs} from 'dayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Image from 'next/image';
import jmoment from 'jalali-moment';
import {HttpMethod, sendRequest} from '../../utils/axios';
import {BackendUrls} from '../../utils/backend-urls';
import {toast} from 'react-toastify';
import {catchRequestError} from '../../utils/functions';
import {LoadingButton} from '@mui/lab';
import DeselectIcon from '@mui/icons-material/Deselect';
import {getToken} from "../../utils/cookies";
import jwt_decode from "jwt-decode";
import {useSelector} from "react-redux";
import {State} from "../../redux/reducers";

interface SelectedFooterProps {
    selectedCount: number;
    selectedItems: number[];
    setCheckedItems: Dispatch<SetStateAction<number[]>>;
    setReload: Dispatch<SetStateAction<boolean>>;
    projectId: number;
}

type dataTypes = {
    record: number;
    dio_date?: string;
    linked_user?: number;
};

export const SelectedFooter = (props: SelectedFooterProps) => {
    const [exportLoading, setExportLoading] = useState<boolean>(false);
    const [dioDate, setDioDate] = useState<Date | null>(null);
    const [responsible, setResponsible] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [responsibles, setResponsibles] = useState<{ first_name: string; last_name: string; id: number; is_active: boolean }[]>([]);

    const token = getToken();
    const profile: any = jwt_decode(token !== null ? token : '');

    const change_linked_user = useSelector((state: State) => state.accesses).includes("set_linked_user")

    const handleChange = (event: SelectChangeEvent) => {
        setResponsible(event.target.value);
    };

    const makeData = () => {
        let data: dataTypes[] = [];
        props.selectedItems.map((item) => {
            let itemJson: dataTypes = {
                record: item,
            };
            if (dioDate) itemJson.dio_date = jmoment(dioDate).format('YYYY-MM-DD');
            if (responsible) itemJson.linked_user = parseInt(responsible);
            data.push(itemJson);
        });
        return data;
    };

    const changeData = () => {
        setLoading(true);
        const data = makeData();
        sendRequest(BackendUrls.bulk_update_record, HttpMethod.PATCH, {records: data})
            .then((response) => {
                toast.success('تغییرات با موفقیت ثبت شد');
                props.setCheckedItems([]);
                props.setReload((r) => !r);
            })
            .catch((err) => catchRequestError(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        sendRequest(BackendUrls.org_user, HttpMethod.GET, {project: props.projectId})
            .then((res) => {
                setResponsibles(res.data.results);
            })
            .catch((err) => catchRequestError(err));
    }, [props.projectId]);

    const formExport = () => {
        setExportLoading(true);
        sendRequest<{ download_url: string }>(BackendUrls.export, HttpMethod.POST, {
            form: props.projectId,
            records: props.selectedItems,
        })
            .then((res) => {
                window.open(res.data.download_url);
            })
            .catch((err) => catchRequestError)
            .finally(() => {
                setExportLoading(false);
            });
    };

    return (
        <React.Fragment>
            <Box
                sx={{
                    padding: '12px 15px',
                    width: 'fit-content',
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                    justifyContent: {sm: 'start', xs: 'center'},
                }}
            >
                <Box
                    sx={{
                        width: {
                            lg: '180px',
                            md: '180px',
                            sm: '180px',
                            xs: '100%',
                            borderColor: 'red',
                        },
                    }}
                >
                    <LocalizationProvider dateAdapter={AdapterJalali}>
                        <DatePicker
                            label="تاریخ انجام"
                            mask="____/__/__"
                            value={dioDate}
                            onChange={(newValue) => {
                                setDioDate(newValue);
                            }}
                            renderInput={(params) => <TextField size="small" {...params} />}
                        />
                    </LocalizationProvider>
                </Box>

                <FormControl sx={{m: 1, minWidth: 180}} size="small">
                    <InputLabel id="demo-simple-select-label">تعیین مسئول</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        size="small"
                        value={responsible}
                        label="تعیین مسئول"
                        onChange={handleChange}
                        disabled={!change_linked_user}
                    >

                        {responsibles.map((item, index) => {
                            if (item.is_active) {
                                return (
                                    <MenuItem value={item.id} key={index}>
                                        {item.first_name + ' ' + item.last_name}
                                    </MenuItem>
                                );
                            }

                        })}
                        <MenuItem value={'null'}>
                            بدون مسئول
                        </MenuItem>
                    </Select>
                </FormControl>
                {(profile?.role == 'employer' || profile?.role == 'admin' || profile?.role == 'supervisor') && (
                    <Image
                        src={'/images/exel.png'}
                        width={37}
                        height={37}
                        alt=""
                        style={{cursor: 'pointer'}}
                        onClick={formExport}
                    />
                )}
                {(dioDate || responsible) && (
                    <LoadingButton variant="contained" loading={loading} onClick={changeData}>
                        ثبت تغییرات
                    </LoadingButton>
                )}
                <Divider orientation="vertical" variant="middle" flexItem sx={{background: '#fff'}}/>
                <Typography
                    sx={{
                        width: 'fit-content',
                        pr: '15px',
                        color: '#ffff',
                        fontWeight: '400',
                        fontSize: '14px',
                    }}
                >
                    {props.selectedCount} رکورد انتخاب شده
                </Typography>
            </Box>
            <Button startIcon={<DeselectIcon/>} variant={'text'} onClick={() => {
                props.setCheckedItems([])
                props.setReload(r => !r)
            }}
                    sx={{background: '#06EFEF33', mr: '24px', color: '#fff', width: '180px'}}>برداشتن
                انتخاب‌ها</Button>
        </React.Fragment>
    );
};
