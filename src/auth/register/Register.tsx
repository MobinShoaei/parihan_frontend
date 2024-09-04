import {Divider, Grid, Typography} from '@mui/material';
import {Box} from '@mui/system';
import {Form, Formik} from 'formik';
import React, {useState} from 'react';
import {TextField} from '../../inputs/TextField';
import * as Yup from 'yup';
import {backendUrl} from '../../../utils/axios';
import {BackendUrls} from '../../../utils/backend-urls';
import {toast} from 'react-toastify';
import axios from 'axios';
import {setToken} from '../../../utils/cookies';
import {useRouter} from 'next/router';
import {ContentWrapper} from '../../layout/ContentWrapper';
import {CustomeLoadingButton} from '../../inputs/CustomLoadingButton';
import {CustomeLink} from '../../data-display/CustomeLink';
import {Logo} from '../../layout/Logo';
import Link from "next/link";
import {FormValues, RegisterForm} from "./Form";
import {Verification} from "./Verification";


const Register: React.FC = () => {

    const [activeStep, setActiveStep] = useState<number>(0);
    const [formData, setFormData] = useState<FormValues>({username: '', password: '', phone: ''})

    const step_content: { [key: string]: JSX.Element } = {
        0: <RegisterForm setActiveStep={setActiveStep} setFormData={setFormData} formData={formData}/>,
        1: <Verification setActiveStep={setActiveStep} formData={formData} forRegister={true}/>,
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
                    gap: '30px',
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
                    ثبت‌نام در همکار
                </Typography>
                <Box
                    className={'responsive-on-height'}
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
                        padding: {md: '40px', xs: '20px'},
                        gap: 4,
                    }}
                >
                    {/*<Logo/>*/}

                    {step_content[activeStep]}
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
                    }}
                >
                    در همکار عضو هستم،&nbsp;
                    <b><Link href={'login'}>
                        ورود به همکار
                    </Link>

                    </b>
                </Typography>
            </Box>
        </ContentWrapper>
    );
};

export default Register;
