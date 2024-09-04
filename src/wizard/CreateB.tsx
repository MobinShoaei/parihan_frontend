import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Box, Divider, Grid, IconButton, Stack, Typography} from '@mui/material';
import {Form, Formik} from 'formik';
import {MdAddAPhoto} from 'react-icons/md';
import {TextField} from '../inputs/TextField';
import {CustomeLoadingButton} from '../inputs/CustomLoadingButton';
import * as Yup from 'yup';
import {BackendUrls} from '../../utils/backend-urls';
import {HttpMethod, sendRequest} from '../../utils/axios';
import {userType} from '../setting/UsersManager';
import {catchRequestError} from '../../utils/functions';
import {getRefreshToken, setToken} from '../../utils/cookies';
import {toast} from "react-toastify";
import {Fade} from "@material-ui/core";

type projectType = {
    name: string;
    area_of_expertise?: string;
    first_name: string;
    last_name: string;
    email: string;
};

const updateUserformValidation = Yup.object().shape({
    name: Yup.string().required('این فیلد الزامی است'),
    area_of_expertise: Yup.string(),
    first_name: Yup.string().required('این فیلد الزامی است'),
    last_name: Yup.string().required('این فیلد الزامی است'),
    email: Yup.string().email('ایمیل صحیح نمی‌باشد').required('این فیلد الزامی است'),
});

const initialValues = {
    name: '',
    area_of_expertise: '',
    first_name: '',
    last_name: '',
    email: '',
};

interface CreateBProps {
    setActiveStep: Dispatch<SetStateAction<number>>;
}

export const CreateB = (props: CreateBProps) => {
    const [imageUrl, setImageUrl] = useState<string | null>();
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<Blob | MediaSource>();

    const createProject = (values: { [key: string]: string }) => {
        setSubmitLoading(true);
        let fd = new FormData();
        const data = makeData(values);
        Object.keys(values).map((item) => {
            if (values[item] !== undefined) fd.append(item, values[item] as string);
        });
        if (selectedFile) fd.append('logo', selectedFile as Blob);

        sendRequest(BackendUrls.create_project, HttpMethod.POST, fd)
            .then((res) => {
                setToken(res.data.access);
                props.setActiveStep(r => r + 1)
            })
            .catch((err) => {
                if (err.response.status === 400) {

                    err.response.data.logo.map((item: string) => {
                        toast.error(item)
                    })
                }
                // err.response.
                catchRequestError(err)
            })
            .finally(() => setSubmitLoading(false));
    };

    const makeData = (value: { [key: string]: any }): projectType => {
        return {
            name: value.name,
            area_of_expertise: value?.area_of_expertise,
            first_name: value.first_name,
            last_name: value.last_name,
            email: value.email,
        };
    };
    const imageProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }
        setSelectedFile(e.target.files[0]);
    };

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

    return (
        <Fade in={true} timeout={500}>
            <Stack>
                <Formik
                    initialValues={initialValues}
                    validationSchema={updateUserformValidation}
                    onSubmit={(values) => {
                        createProject(values);
                    }}
                    enableReinitialize
                    validateOnBlur={false}
                >
                    <Form>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '700px',
                                padding: '20px 0',
                                '& .MuiInputBase-root': {
                                    m: 0,
                                    mb: 1,
                                },
                                '& .helperText': {
                                    m: 0,
                                    mb: 1.5,
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
                                        accept="image/png, image/jpeg, image/jpg"
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

                            <Grid container spacing={[2, 2]}>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        label="نام کسب‌وکار "
                                        name="name"
                                        placeholder="نام کسب‌وکار را وارد کنید"
                                        sx={{mb: '20px'}}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        label="حوزه کاری کسب‌وکار"
                                        name="area_of_expertise"
                                        placeholder="حوزه کاری خود را وارد کنید"
                                        sx={{mb: '20px'}}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography>مشخصات مدیر کسب‌وکار</Typography>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        label="نام "
                                        name="first_name"
                                        placeholder="نام را وارد کنید"
                                        sx={{mb: '20px'}}
                                    />
                                    <TextField
                                        label="ایمیل"
                                        name="email"
                                        placeholder="ایمیل را وارد کنید"
                                        sx={{mb: '20px'}}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        label="نام خانوادگی"
                                        name="last_name"
                                        placeholder="نام خانوادگی را وارد کنید"
                                        sx={{mb: '20px'}}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                                    <CustomeLoadingButton
                                        loading={submitLoading}
                                        sx={{
                                            marginTop: {md: 4, xs: 2},
                                            padding: '11px 22px',
                                            backgroundColor: '#385A86',
                                            width: '250px',
                                        }}
                                        type="submit"
                                    >
                                        {'ثبت اطلاعات و مرحله بعدی'}
                                    </CustomeLoadingButton>
                                </Grid>
                            </Grid>
                        </Box>
                    </Form>
                </Formik>
            </Stack>
        </Fade>
    );
};
