import {Box, Button, Divider, Drawer, Grid, Stack, TextField, Typography} from '@mui/material';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Modal from '../common/Modal';
import {Form, Formik} from 'formik';
import {formFieldsType, keys} from '../dashboard/InformationForm';
import {FilterInput} from './FilterInput';
import * as Yup from 'yup';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AutoComplete from './AutoComplete';
import {Responsible} from '../common/Responsible';
import {useSelector} from 'react-redux';
import project_id from '../../redux/reducers/project_id';
import {State} from '../../redux/reducers';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import AdapterJalali from '@date-io/date-fns-jalali';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';

type InformationFilterProps = {
    formFields: formFieldsType[];
    setFilterItems: Dispatch<SetStateAction<{ [key: string]: string | boolean | number }>>;
    tags: { id: number | string; title: string }[];
};

export const InformationFilter: React.FC<InformationFilterProps> = (props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [options, setOptions] = useState<{ label: string; value: number | string }[]>([]);

    const projectId = useSelector((state: State) => state.projectId);

    useEffect(() => {
        const data = props.tags.map((item, index: number) => {
            return {
                label: item.title,
                value: item.id,
            };
        });

        setOptions(data);
    }, [props.tags]);

    const iconStyle = {
        backgroundColor: '#EAD3D3',
        fontSize: '20px',
        padding: '3px',
        borderRadius: '50%',
    };

    console.log(props.formFields)
    return (
        <>
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    direction: 'ltr',
                    '& .MuiDrawer-paper': {
                        // maxHeight: '97vh',
                        overflow: 'auto',
                        padding: {md: '32px', xs: '15px'},
                        width: {md: '450px', xs: '100%'},
                    },
                }}
                anchor={'left'}
                // className="an"
            >
                <Formik
                    initialValues={keys(props.formFields)}
                    onSubmit={(values, {resetForm}) => {
                        props.setFilterItems(values);
                        setOpen((r) => !r);
                        resetForm();
                    }}
                >
                    {}
                    <Form>
                        <Grid
                            container
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                                overflow: 'auto',
                            }}
                        >
                            <Stack direction={'row'} justifyContent={'space-between'}>
                                <Typography variant="button" color="secondary.light">
                                    فیلترهای انتخاب شده
                                </Typography>
                                <CloseIcon
                                    fontSize="medium"
                                    onClick={() => setOpen(false)}
                                    sx={{cursor: 'pointer'}}
                                />
                            </Stack>

                            <Stack direction={'row'} justifyContent={'space-between'}>
                                <Typography
                                    sx={{
                                        display: 'flex',
                                        gap: '10px',
                                        fontSize: '13px',
                                        alignItems: 'center',
                                    }}
                                >
                                    <TextsmsOutlinedIcon color="inherit" sx={iconStyle}/>
                                    فقط کامنت‌دارها
                                </Typography>
                                <FilterInput
                                    inputType={'switch'}
                                    value={[]}
                                    name={'comment_is_null'}
                                    title={'کامنت‌دارها'}
                                />
                            </Stack>
                            {/*<Grid item xs={6}>*/}
                            {/*    */}
                            {/*</Grid>*/}

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Box sx={{width: '50%'}}>
                                    <Typography
                                        sx={{
                                            display: 'flex',
                                            gap: '10px',
                                            fontSize: '13px',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <TextsmsOutlinedIcon color="inherit" sx={iconStyle}/>
                                        وضعیت (تگ)
                                    </Typography>
                                </Box>
                                <Box>
                                    <AutoComplete
                                        options={options}
                                        name="tag"
                                        label="وضعیت"
                                        sx={{
                                            width: {
                                                lg: '180px',
                                                sm: '180px',
                                                xs: '140px',
                                                borderColor: 'red',
                                            },
                                        }}
                                        color="info"
                                    />
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Box sx={{width: '50%'}}>
                                    <Typography
                                        sx={{
                                            display: 'flex',
                                            gap: '10px',
                                            fontSize: '13px',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <TextsmsOutlinedIcon color="inherit" sx={iconStyle}/>
                                        مسئول
                                    </Typography>
                                </Box>
                                <Responsible
                                    projectId={projectId}
                                    sx={{
                                        width: {
                                            lg: '180px',
                                            sm: '180px',
                                            xs: '140px',
                                            borderColor: 'red',
                                        },
                                    }}
                                    filter
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Box sx={{width: '50%'}}>
                                    <Typography
                                        sx={{
                                            display: 'flex',
                                            gap: '10px',
                                            fontSize: '13px',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <TextsmsOutlinedIcon color="inherit" sx={iconStyle}/>
                                        تاریخ ایجاد
                                    </Typography>
                                </Box>
                                <Box>
                                    <FilterInput
                                        inputType={'DateRangePicker'}
                                        value={[]}
                                        name={'created_at'}
                                        title={'تاریح ایجاد'}
                                    />
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Box sx={{width: '50%'}}>
                                    <Typography
                                        sx={{
                                            display: 'flex',
                                            gap: '10px',
                                            fontSize: '13px',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <TextsmsOutlinedIcon color="inherit" sx={iconStyle}/>
                                        تاریخ انجام
                                    </Typography>
                                </Box>
                                <Box>
                                    <FilterInput
                                        inputType={'DateRangePicker'}
                                        value={[]}
                                        name={'dio_date'}
                                        title={'نام مشتری'}
                                    />
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Box sx={{width: '50%'}}>
                                    <Typography
                                        sx={{
                                            display: 'flex',
                                            gap: '10px',
                                            fontSize: '13px',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <BadgeOutlinedIcon color="inherit" sx={iconStyle}/>
                                        نام مشتری
                                    </Typography>
                                </Box>
                                <Box>
                                    <FilterInput
                                        inputType={'TextField'}
                                        value={[]}
                                        name={'responder_name'}
                                        title={'نام مشتری'}
                                    />
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Box sx={{width: '50%'}}>
                                    <Typography
                                        sx={{
                                            display: 'flex',
                                            gap: '10px',
                                            fontSize: '13px',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <CallOutlinedIcon color="inherit" sx={iconStyle}/>
                                        شماره تماس
                                    </Typography>
                                </Box>
                                <Box>
                                    <FilterInput
                                        inputType={'IntegerField'}
                                        value={[]}
                                        name={'responder_phone'}
                                        title="شماره تماس "
                                    />
                                </Box>
                            </Box>
                            <Divider/>
                            {props.formFields.map((item, i) => {
                                return (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                        key={i}
                                    >
                                        <Box sx={{width: '50%'}}>
                                            <Typography
                                                sx={{
                                                    display: 'flex',
                                                    gap: '10px',
                                                    fontSize: '13px',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                {/* <SearchIcon color="inherit" sx={iconStyle} /> */}
                                                {item.title}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <FilterInput
                                                inputType={item.field_type}
                                                value={item.values}
                                                name={item.label}
                                                title={item.title}
                                            />
                                        </Box>
                                    </Box>
                                );
                            })}
                            <Box sx={{display: 'flex', gap: '4px'}}>
                                <Box sx={{width: '90%'}}>
                                    <Button variant="outlined" fullWidth type="submit">
                                        اعمال فیلتر‌ها
                                    </Button>
                                </Box>
                                <Box
                                    sx={{
                                        border: '1px solid rgba(229, 63, 76, 1) ',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        padding: '0 7px',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => setOpen(false)}
                                >
                                    <Typography color="red">بازگشت</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Form>
                </Formik>
            </Drawer>
            <Button
                variant="outlined"
                color="secondary"
                onClick={() => setOpen(true)}
                startIcon={<FilterAltOutlinedIcon/>}
            >
                فیلتر
            </Button>
        </>
    );
};
