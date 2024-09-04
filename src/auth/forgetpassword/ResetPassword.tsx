import React, {useState} from 'react'
import {Form, Formik} from "formik";
import {Grid} from "@mui/material";
import {TextField} from "../../inputs/TextField";
import {CustomeLoadingButton} from "../../inputs/CustomLoadingButton";
import * as Yup from "yup";
import {backendUrl, HttpMethod, sendRequest} from "../../../utils/axios";
import {BackendUrls} from "../../../utils/backend-urls";
import {catchRequestError} from "../../../utils/functions";
import {toast} from "react-toastify";
import axios from "axios";
import {useRouter} from "next/router";

export type FormValues = typeof initialValues;

const initialValues = {
    password: '',
};


// @ts-ignore

const formValidation = Yup.object().shape({

    password: Yup.string()
        .min(8, 'پسورد باید حداقل ۸ کارکتر باشد.')
        .required('این فیلد الزامی است'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'رمز عبور و تکرار آن باهم یکسان نیست!'),
});

interface ResetPasswordType {
    token: string
    phoneNumber: string
}

export const ResetPassword = (props: ResetPasswordType) => {
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter()

    const formHandler = (v: FormValues) => {

        const data = {
            phone: props.phoneNumber,
            token: props.token,
            password: v.password
        }

        setLoading(true);

        axios({
            method: 'post',
            url: backendUrl + BackendUrls.change_password,
            data: data,
        })
            .then((response) => {
                toast.success("رمز عبور شما با موفقیت تغییر یافت")
                router.push('/login')
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
                <Grid container rowSpacing="20px">

                    <Grid item xs={24}>
                        <TextField
                            label="رمز عبور جدید"
                            name="password"
                            placeholder="رمز عبور خود را وارد کنید"
                            type="password"
                            autoComplete={'new-password'}
                        />
                    </Grid>
                    <Grid item xs={24}>
                        <TextField
                            label="تکرار رمز عبور جدید"
                            name="passwordConfirmation"
                            placeholder="رمز عبور خود را وارد کنید"
                            type="password"
                            autoComplete={'new-password'}
                        />
                    </Grid>
                    <Grid item xs={24}>
                        <CustomeLoadingButton
                            loading={loading}
                            sx={{marginTop: {md: 4, xs: 2}, padding: '11px 22px'}}
                        >
                            تغییر رمز عبور
                        </CustomeLoadingButton>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    )
}