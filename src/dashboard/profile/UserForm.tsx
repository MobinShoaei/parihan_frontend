import { Box, Grid, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { CustomeLoadingButton } from '../../inputs/CustomLoadingButton';
import * as Yup from 'yup';
import { CustomDatePicker } from '../../inputs/CustomDatePicker';
import dayjs, { Dayjs } from 'dayjs';

const initialValues = {
    name: '',
    email: '',
    phone: '',
};

// @ts-ignore
export type FormValues = typeof initialValues;

const formValidation = Yup.object().shape({
    name: Yup.string().required('این فیلد الزامی است'),
    email: Yup.string().email('ایمیل صحیح نمی‌باشد'),
    phone: Yup.string()
        .matches(/^((09[0-9]{9})$|(۰۹[۰۱۲۳۴۵۶۷۸۹]{9}))$/, 'شماره صحیح نمی‌باشد')
        .required('این فیلد الزامی است'),
});

export const UserForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [date, setDate] = useState<dayjs.Dayjs | null>(null);

    const formHandler = (v: FormValues) => {
        console.log('asdasd');
    };

    return (
        <Box
            sx={{
                background: '#E1D0C3',
                p: '20px 25px',
                borderRadius: '20px 20px 20px 20px',
                position: 'relative',
            }}
        >
            <Formik
                initialValues={initialValues}
                validationSchema={formValidation}
                onSubmit={formHandler}
                enableReinitialize
                validateOnBlur={false}
            >
                <Form>
                    <Grid container spacing="20px">
                        <Grid item md={6} xs={12}>
                            <TextField label="نام و نام خانوادگی" name="name" fullWidth />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <CustomDatePicker label="تاریخ تولد" setValue={setDate} value={date} />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField label="ایمیل" name="email" fullWidth />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField label="شماره موبایل" name="phone" fullWidth />
                        </Grid>
                        <Grid item md={6} xs={12}></Grid>
                        <Grid item md={6} xs={12}>
                            <CustomeLoadingButton loading={loading}>بروزرسانی</CustomeLoadingButton>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </Box>
    );
};
