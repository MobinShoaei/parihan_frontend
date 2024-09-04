import {Divider, Grid, Typography} from '@mui/material';
import {Box} from '@mui/system';
import {Form, Formik} from 'formik';
import React, {useState} from 'react';
import {TextField} from '../inputs/TextField';
import * as Yup from 'yup';
import {backendUrl} from '../../utils/axios';
import {BackendUrls} from '../../utils/backend-urls';
import {toast} from 'react-toastify';
import axios from 'axios';
import {setToken} from '../../utils/cookies';
import {useRouter} from 'next/router';
import {ContentWrapper} from '../layout/ContentWrapper';
import {CustomeLoadingButton} from '../inputs/CustomLoadingButton';
import {CustomeLink} from '../data-display/CustomeLink';
import {Logo} from '../layout/Logo';
import jwt_decode from "jwt-decode";
import Link from "next/link";

type FormValues = typeof initialValues;

const initialValues = {
    username: '',
    password: '',
};

const formValidation = Yup.object().shape({
    username: Yup.string().required('این فیلد الزامی است'),
    password: Yup.string().required('این فیلد الزامی است'),
});

const Login: React.FC = () => {
    // state
    const [loading, setLoading] = useState<boolean>(false);
    // router
    const router = useRouter();

    const loginFormHandler = (obj: FormValues) => {
        setLoading(true);
        axios({
            method: 'post',
            url: backendUrl + BackendUrls.login,
            data: obj,
        })
            .then((response) => {
                setToken(response.data.access);
                const profile: { [key: string]: string | number } = jwt_decode(response.data.access)
                if (profile.has_project) router.push('/dashboard/');
                else router.push('/wizard/');

            })
            .catch((e) => {
                toast.error(
                    <Box>
                        <Typography>{e.response.data.detail}</Typography>
                    </Box>,
                    {
                        position: 'top-center',
                    },
                );
            })
            .finally(() => setLoading(false));
    };

    return (
        <ContentWrapper
            sx={{
                backgroundImage: 'url(./images/login.png)',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'rgb(43, 40, 40, 0.5)',
                    width: {md: '40%', xs: '100%'},
                    height: '100%',
                    boxShadow: '0px 13px 24px rgba(0, 0, 0, 0.25)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: '25px',
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0px 2px 15px rgba(0, 0, 0, 0.35)',
                    }}
                >
                    ورود به پنل کاربری همکار
                </Typography>
                <Box
                    className={"responsive-on-height"}
                    sx={{
                        backgroundColor: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: '2px solid',
                        borderColor: 'secondary.light',
                        boxShadow: '1px 6px 45px rgba(0, 0, 0, 0.25)',
                        borderRadius: '10px',
                        width: {md: '440px', xs: '340px'},
                        maxWidth: {md: '440px', xs: '340px'},
                        padding: {md: '40px', xs: '30px'},
                        gap: 3,
                    }}
                >
                    <Logo/>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={formValidation}
                        onSubmit={loginFormHandler}
                    >
                        <Form>
                            <Grid container rowSpacing="20px">
                                <Grid item xs={24}>
                                    <TextField
                                        label="نام کاربری یا شماره تماس"
                                        name="username"
                                        placeholder="نام کاربری یا شماره تماس خود را وارد کنید"
                                    />
                                </Grid>
                                <Grid item xs={24}>
                                    <TextField
                                        label="رمز عبور"
                                        name="password"
                                        placeholder="رمز عبور خود را وارد کنید"
                                        type="password"


                                    />

                                </Grid>
                                <Grid item xs={24}>
                                    <CustomeLoadingButton
                                        loading={loading}
                                        sx={{marginTop: {md: 4, xs: 2}, padding: '11px 22px'}}
                                    >
                                        ورود به حساب کاربری
                                    </CustomeLoadingButton>
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                    <Box
                        sx={{
                            textAlign: 'center',
                            gap: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >

                        <Typography variant="body2">تماس با پشتیبانی:</Typography>
                        <CustomeLink
                            href="tel:02191301902"
                            sx={{
                                color: `secondary.main`,
                                fontWeight: 'bold',
                            }}
                            fontSize={18}
                        >
                            02191301902
                        </CustomeLink>
                    </Box>
                    <Box sx={{display: 'flex', gap: {md: 3, xs: 2}}}>
                        <CustomeLink href="https://hamcall.ir/">خانه</CustomeLink>
                        <Divider orientation="vertical" sx={{borderColor: '#8C8C8C'}} flexItem/>
                        <CustomeLink href="https://hamcall.ir/about/">درباره ما</CustomeLink>
                        <Divider orientation="vertical" sx={{borderColor: '#8C8C8C'}} flexItem/>
                        <CustomeLink href="https://hamcall.ir/terms/">شرایط و قوانین</CustomeLink>
                    </Box>
                </Box>
                <Typography
                    sx={{
                        color: 'white',
                        textShadow: '0px 2px 15px rgba(0, 0, 0, 0.35)',
                    }}>

                    <b><Link href={'forgetpassword'}>
                        بازیابی رمز عبور
                    </Link>

                    </b>
                </Typography>
                <Typography
                    sx={{
                        color: 'white',
                        textShadow: '0px 2px 15px rgba(0, 0, 0, 0.35)',
                    }}>
                    در همکار عضو نیستم،&nbsp;
                    <b><Link href={'register'}>
                        ثبت نام در همکار
                    </Link>

                    </b>
                </Typography>

            </Box>
        </ContentWrapper>
    );
};

export default Login;
