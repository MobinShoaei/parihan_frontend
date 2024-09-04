import React, {useState} from 'react'
import {FormValues, RegisterForm} from "../register/Form";
import {Verification} from "../register/Verification";
import {Box} from "@mui/system";
import {Divider, Typography} from "@mui/material";
import {CustomeLink} from "../../data-display/CustomeLink";
import Link from "next/link";
import {ContentWrapper} from "../../layout/ContentWrapper";
import {GetPhoneNumberForm} from "./Form";
import {ResetPassword} from "./ResetPassword";

export const ForgetPassword = () => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [token, setToken] = useState<string>('')
    const step_content: { [key: string]: JSX.Element } = {
        0: <GetPhoneNumberForm setActiveStep={setActiveStep} setPhoneNumber={setPhoneNumber}
                               phoneNumber={phoneNumber}/>,
        1: <Verification setActiveStep={setActiveStep} formData={{phone: phoneNumber}} setToken={setToken}/>,
        2: <ResetPassword token={token} phoneNumber={phoneNumber}/>,
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
                    بازیابی رمز عبور
                </Typography>
                <Box
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
    )
}