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


interface RegisterFormProps {
    setActiveStep: Dispatch<SetStateAction<number>>
    setFormData: Dispatch<SetStateAction<FormValues>>
    formData: FormValues
}

export type FormValues = typeof initialValues;

const initialValues = {
    username: '',
    password: '',
    phone: ''
};


// @ts-ignore

const formValidation = Yup.object().shape({
    phone: Yup.string()
        .matches(
            /^((09[0-9]{9})$|(۰۹[۰۱۲۳۴۵۶۷۸۹]{9}))$/,
            'شماره صحیح نمی‌باشد'
        )
        .required('این فیلد الزامی است'),
    username: Yup.string()
        .matches(/^[^\u0600-\u06FF]+$/, 'نام کاربری باید شامل حروف انگلیسی یا سایر کاراکترها باشد.')
        .min(5, 'نام کاربری باید حداقل ۵ حرف داشته باشد.')
        .required('این فیلد الزامی است')
        .test('unique-username', 'این نام کاربری قبلا استفاده شده است', async function (
            value,
        ) {
            if (
                this.parent &&
                this.parent.username &&
                this.parent.username.length >= 5
            ) {
                // Assuming checkIfUsernameExists returns a boolean
                const isUsernameExists = await checkIfUsernameExists(value as string);
                return isUsernameExists;
            }
            return true;
        }) as Yup.StringSchema<string | undefined>,
    password: Yup.string()
        .min(8, 'پسورد باید حداقل ۸ کارکتر باشد.')
        .required('این فیلد الزامی است'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'رمز عبور و تکرار آن باهم یکسان نیست!'),
});


async function checkIfUsernameExists(username: string): Promise<boolean> {

    return new Promise((resolve) => {
        axios({
            method: 'post',
            url: backendUrl + BackendUrls.check_username,
            data: {username: username},
        })
            .then((response) => {
                resolve(true)
            })
            .catch((e) => {
                resolve(false)
            });
    });
};

export const RegisterForm = (props: RegisterFormProps) => {

    // state
    const [loading, setLoading] = useState<boolean>(false);
    const [initialValues, setInitialValues] = useState<FormValues>(props.formData)
    // router
    const router = useRouter();


    useEffect(() => {
        setInitialValues(props.formData)
    }, [props.formData])

    const registerFormHandler = (obj: FormValues) => {
        props.setFormData(obj)

        obj.phone = convertNumberToEn(obj.phone, 'string') as string
        setLoading(true);

        axios({
            method: 'post',
            url: backendUrl + BackendUrls.register,
            data: obj,
        })
            .then((response) => {
                props.setActiveStep(1);
                toast.success("کد ورود با موفقیت برای شما ارسال شد")
            })
            .catch(catchRequestError)
            .finally(() => setLoading(false));
    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={formValidation}
            onSubmit={registerFormHandler}
            validateOnBlur={false}
        >
            <Form>
                <Grid container rowSpacing="20px">
                    <Grid item xs={24}>
                        <TextField
                            label="نام کاربری"
                            name="username"
                            placeholder="نام کاربری خود را وارد کنید"
                        />
                    </Grid>
                    <Grid item xs={24}>
                        <TextField
                            label="شماره تماس"
                            name="phone"
                            placeholder="شماره تماس خود را وارد کنید"
                        />
                    </Grid>
                    <Grid item xs={24}>
                        <TextField
                            label="رمز عبور"
                            name="password"
                            placeholder="رمز عبور خود را وارد کنید"
                            type="password"
                            autoComplete={'new-password'}
                        />
                    </Grid>
                    <Grid item xs={24}>
                        <TextField
                            label="تکرار رمز عبور"
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
                            ثبت نام در همکار
                        </CustomeLoadingButton>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    )
}