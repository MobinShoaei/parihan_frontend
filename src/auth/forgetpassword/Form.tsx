import React, {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {Form, Formik} from "formik";
import {Grid, Typography} from "@mui/material";
import {TextField} from "../../inputs/TextField";
import {CustomeLoadingButton} from "../../inputs/CustomLoadingButton";
import * as Yup from "yup";
import axios from "axios";
import {backendUrl} from "../../../utils/axios";
import {BackendUrls} from "../../../utils/backend-urls";
import {setToken} from "../../../utils/cookies";
import {toast} from "react-toastify";
import {Box} from "@mui/system";
import {useRouter} from "next/router";
import {catchRequestError, convertNumberToEn} from "../../../utils/functions";
import useDebounce from "../../hook/useDebounse";
import {CheckUserExist} from "../../common/CheckUserExist";

const formValidation = Yup.object().shape({
    phone: Yup.string()
        .matches(
            /^((09[0-9]{9})$|(۰۹[۰۱۲۳۴۵۶۷۸۹]{9}))$/,
            'شماره صحیح نمی‌باشد'
        )
        .required('این فیلد الزامی است'),
});

export type FormValues = typeof initialValues;

const initialValues = {
    phone: ''
};

interface ForgetFormProps {
    setActiveStep: Dispatch<SetStateAction<number>>
    setPhoneNumber: Dispatch<SetStateAction<string>>
    phoneNumber: string
}


export const GetPhoneNumberForm = (props: ForgetFormProps) => {

    // state
    const [loading, setLoading] = useState<boolean>(false);


    const formHandler = (v: FormValues) => {
        let obj = v
        obj.phone = convertNumberToEn(obj.phone, 'string') as string
        props.setPhoneNumber(v.phone)
        setLoading(true);

        axios({
            method: 'post',
            url: backendUrl + BackendUrls.send_forgot_password_code,
            data: obj,
        })
            .then((response) => {
                props.setActiveStep(1);
                toast.success("کد با موفقیت برای شما ارسال شد")
            })
            .catch(catchRequestError)
            .finally(() => setLoading(false));
    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={formValidation}
            onSubmit={formHandler}
            validateOnBlur={false}
        >
            <Form>
                <Grid container>

                    <Grid item xs={24}>
                        <TextField
                            label="شماره تماس"
                            name="phone"
                            placeholder="شماره تماس خود را وارد کنید"
                        />
                    </Grid>

                    <Grid item xs={24}>
                        <CustomeLoadingButton
                            loading={loading}
                            sx={{marginTop: {md: 4, xs: 2}, padding: '11px 22px'}}
                        >
                            ارسال کد
                        </CustomeLoadingButton>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    )
}