import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import ReactCodeInput from "react-verification-code-input";
import {Grid, Stack, Typography} from "@mui/material";
import {TextField} from "../../inputs/TextField";
import {CustomeLoadingButton} from "../../inputs/CustomLoadingButton";
import * as Yup from "yup";
import {Timer} from "./Timer";
import axios from "axios";
import {backendUrl} from "../../../utils/axios";
import {BackendUrls} from "../../../utils/backend-urls";
import {toast} from "react-toastify";
import {Box} from "@mui/system";
import {catchRequestError, convertNumberToEn} from "../../../utils/functions";
import {setRefreshToken, setToken} from "../../../utils/cookies";
import {useRouter} from "next/router";
import jwt_decode from "jwt-decode";
import useUpdateEffect from "../../hook/useUpdateEffect";
import {FormValues} from "./Form";

interface VerificationProps {
    setActiveStep: Dispatch<SetStateAction<number>>
    formData: { [key: string]: string }
    forRegister?: boolean
    setToken?: Dispatch<SetStateAction<string>>
}

export const Verification = (props: VerificationProps) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [resend, setResend] = useState<boolean>(false)
    const [code, setCode] = useState<string>()

    const router = useRouter();
    let codeRef: ReactCodeInput | null;

    const editNumber = () => {
        props.setActiveStep(0)

    }

    const verifyCode = (c: string | undefined) => {
        if (c) {
            setLoading(true);
            axios({
                method: 'post',
                url: backendUrl + (props.forRegister ? BackendUrls.verify_code : BackendUrls.verify_forgot_password_code),
                data: {code: c, phone: props.formData.phone},
            })
                .then((response) => {
                    if (props.forRegister) {
                        setToken(response.data.access);
                        setRefreshToken(response.data.refresh)
                        const profile: { [key: string]: string | number } = jwt_decode(response.data.access)
                        if (profile.has_project) router.push('/dashboard/');
                        else router.push('/wizard/');

                    } else if (props.setToken) {
                        props.setToken(response.data.token)
                        props.setActiveStep(2)
                    }


                })
                .catch(catchRequestError)
                .finally(() => setLoading(false));
        }
    }

    useUpdateEffect(() => {
        let obj = props.formData
        obj.phone = convertNumberToEn(obj.phone, 'string') as string
        axios({
            method: 'post',
            url: backendUrl + (props.forRegister ? BackendUrls.register : BackendUrls.send_forgot_password_code),
            data: obj,
        })
            .then((response) => {
                if (props.forRegister) props.setActiveStep(1);
                toast.success("کد ورود با موفقیت برای شما ارسال شد")
            })
            .catch(catchRequestError)

    }, [resend])

    return (

        <Grid container rowSpacing="20px">
            <Grid item xs={24}>
                <Typography>کد تایید ارسال شده به شماره تماس زیر را در کادر وارد کنید.</Typography>
            </Grid>
            <Grid item xs={24}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography variant={'button'} fontSize={'18px'}
                                letterSpacing={'2px'}>{props.formData.phone}</Typography>
                    <Typography onClick={editNumber} variant={'button'} color={'#35BBD6'} sx={{cursor: 'pointer'}}
                                fontSize={'15px'}>ویرایش</Typography>
                </Stack>
            </Grid>
            <Grid item xs={24}>
                <Typography variant={'caption'}>کد تایید</Typography>
                <ReactCodeInput
                    className="code-input"
                    fields={5}
                    type="number"
                    ref={(r: any) => (codeRef = r)}
                    onComplete={(e) => verifyCode(e)}
                />
            </Grid>
            <Grid item xs={24} sx={{mt: '20px'}}>
                <Timer seconds={120} resendCode={() => setResend(r => !r)}/>
            </Grid>
            <Grid item xs={24}>
                <CustomeLoadingButton
                    loading={loading}
                    sx={{marginTop: {md: 0, xs: 2}, padding: '11px 22px'}}
                    onClick={() => verifyCode(code)}
                    disabled={!code}
                >
                    تایید
                </CustomeLoadingButton>
            </Grid>
        </Grid>

    )
}