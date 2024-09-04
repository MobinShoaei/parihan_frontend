import {Box, Grid, IconButton, Typography} from '@mui/material';
import {Form, Formik} from 'formik';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {CustomeLoadingButton} from '../../inputs/CustomLoadingButton';
import {TextField} from '../../inputs/TextField';
import {MdAddAPhoto} from 'react-icons/md';
import {HttpMethod, sendRequest} from '../../../utils/axios';
import {BackendUrls} from '../../../utils/backend-urls';
import {catchRequestError} from '../../../utils/functions';
import * as Yup from 'yup';
import {userType} from '../UsersManager';
import Image from 'next/image';
import {toast} from 'react-toastify';
import {useSelector} from "react-redux";
import {State} from "../../../redux/reducers";

interface NewUserProps {
    userId: number;
    setReRender: Dispatch<SetStateAction<boolean>>;
    setUserId: Dispatch<SetStateAction<number>>;
}

const addUserformValidation = Yup.object().shape({
    first_name: Yup.string().required('این فیلد الزامی است'),
    last_name: Yup.string().required('این فیلد الزامی است'),
    username: Yup.string().required('این فیلد الزامی است'),
    password: Yup.string().required('این فیلد الزامی است'),
});

const updateUserformValidation = Yup.object().shape({
    first_name: Yup.string().required('این فیلد الزامی است'),
    last_name: Yup.string().required('این فیلد الزامی است'),
    username: Yup.string().required('این فیلد الزامی است'),
});

export const NewUser = (props: NewUserProps) => {
    const [imageUrl, setImageUrl] = useState<string | null>();
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<Blob | MediaSource>();
    const [initialValues, setInitialValues] = useState<{
        [key: string]: string | null | undefined;
    }>({});

    const projectId = useSelector((state: State) => state.projectId)

    useEffect(() => {
        if (props.userId !== 0) {
            sendRequest<userType>(BackendUrls.org_user + props.userId + '/')
                .then((res) => {
                    setInitialValues(makeInitialValues(res.data));
                    setImageUrl(res.data.avatar);
                })
                .catch((err) => catchRequestError(err));
        }
    }, [props.userId]);

    useEffect(() => {
        if (props.userId == 0) setInitialValues(keys());
    }, []);

    useEffect(() => {
        if (!selectedFile) {
            setImageUrl(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);

        setImageUrl(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const makeInitialValues = (data: userType) => {
        let values: { [key: string]: string | null | undefined } = {
            first_name: data.first_name,
            last_name: data.last_name,
            username: data.username,
            password: data.password,
            organization_level: data.organization_level,
        };

        return values;
    };

    const keys = () => {
        let values: { [key: string]: string } = {
            first_name: '',
            last_name: '',
            username: '',
            password: '',
            organization_level: '',
        };

        return values;
    };

    const saveUser = (values: { [key: string]: string | null | undefined }, resetForm: any) => {
        setSubmitLoading(true);
        let fd = new FormData();
        Object.keys(values).map((item) => {
            if (values[item] !== undefined) fd.append(item, values[item] as string);
        });
        if (selectedFile) fd.append('avatar', selectedFile as Blob);
        fd.append('project', projectId.toString())
        let url = BackendUrls.org_user;
        let method = HttpMethod.POST;
        if (props.userId !== 0) {
            url = BackendUrls.org_user + props.userId + '/';
            method = HttpMethod.PATCH;
        }

        sendRequest<userType>(url, method, fd)
            .then((res) => {
                toast.success(props.userId == 0 ? 'کاربر شما ثبت شد' : 'تغییرات شما ثبت شد');
                props.setReRender((r) => !r);
                resetForm({
                    values: keys(),
                });
                props.setUserId(0);
                setImageUrl(undefined);
            })
            .catch((err) => catchRequestError(err))
            .finally(() => setSubmitLoading(false));
    };

    const imageProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }
        setSelectedFile(e.target.files[0]);
    };

    return (
        <Box sx={{border: ' 0.747929px solid #EAD3D3', borderRadius: '6px', background: '#fff'}}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    borderBottom: '1px solid #8C8C8C',
                    padding: '13px 0 ',
                }}
            >
                <Typography>{props.userId == 0 ? 'افزودن کاربر جدید' : 'ویرایش کاربر'}</Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Formik
                    initialValues={initialValues}
                    validationSchema={
                        props.userId == 0 ? addUserformValidation : updateUserformValidation
                    }
                    onSubmit={(values, {resetForm, setErrors}) => {
                        saveUser(values, resetForm);
                    }}
                    enableReinitialize
                    validateOnBlur={false}
                >
                    <Form>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '350px',
                                padding: '20px 0',
                                '& .MuiInputBase-root': {
                                    m: 0,
                                    mb: 1.5,
                                },
                                '& .helperText': {
                                    m: 0,
                                    mb: 2,
                                },
                                '& label': {
                                    m: 0,
                                    mb: 1,
                                },
                            }}
                        >
                            <Box sx={{textAlign: 'center'}}>
                                <IconButton
                                    color="primary"
                                    aria-label="upload picture"
                                    component="label"
                                    sx={{
                                        width: 'fit-content',
                                        textAlign: 'center',
                                    }}
                                >
                                    <input
                                        hidden
                                        accept="image/*"
                                        type="file"
                                        onChange={(e) => imageProfile(e)}
                                    />
                                    <Box
                                        sx={{
                                            width: '140px',
                                            height: '140px',
                                            borderRadius: '50%',
                                            backgroundColor: 'rgb(140, 140, 140,0.1)',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {imageUrl ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={imageUrl}
                                                width="140px"
                                                height="140px"
                                                style={{borderRadius: '50%'}}
                                                alt="#"
                                            />
                                        ) : (
                                            <MdAddAPhoto
                                                style={{fontSize: '45px', color: '#35BBD6'}}
                                            />
                                        )}
                                    </Box>
                                </IconButton>
                            </Box>

                            <TextField
                                label="نام "
                                name="first_name"
                                placeholder="نام را وارد کنید"
                                sx={{mb: '20px'}}
                            />

                            <TextField
                                label="نام خانوادگی "
                                name="last_name"
                                placeholder="نام را وارد کنید"
                                sx={{mb: '20px'}}
                            />

                            <TextField
                                label="نام کاربری"
                                name="username"
                                placeholder="نام کاربری خود را وارد کنید"
                                sx={{mb: '20px'}}
                            />

                            <TextField
                                label="رمز عبور"
                                name="password"
                                placeholder="رمز عبور خود را وارد کنید"
                                type="password"
                                size="small"
                                sx={{mb: '20px'}}
                                helperText={
                                    props.userId !== 0
                                        ? 'درصورت عدم تغییر رمز عبور فیلد بالا را خالی بگذارید'
                                        : ''
                                }
                                autoComplete={'new-password'}
                            />

                            <TextField
                                label="سمت سازمانی (عنوان شغلی)"
                                name="organization_level"
                                placeholder="سمت سازمانی را وارد کنید"
                                sx={{mb: '20px'}}
                            />

                            <CustomeLoadingButton
                                loading={submitLoading}
                                sx={{
                                    marginTop: {md: 4, xs: 2},
                                    padding: '11px 22px',
                                    backgroundColor: '#385A86',
                                }}
                                type="submit"
                            >
                                {props.userId == 0 ? 'ثبت اطلاعات کاربر جدید' : 'ثبت تغییرات'}
                            </CustomeLoadingButton>
                        </Box>
                    </Form>
                </Formik>
            </Box>
        </Box>
    );
};
