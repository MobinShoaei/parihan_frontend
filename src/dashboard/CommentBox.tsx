import { LoadingButton } from '@mui/lab';
import { Box, Button, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { HttpMethod, sendRequest } from '../../utils/axios';
import { BackendUrls } from '../../utils/backend-urls';
import { catchRequestError } from '../../utils/functions';
import { TextField } from '../data-display/TextField';

interface CommentBoxProps {
    recordId: number;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

const formInitialValues = {
    comment: '',
};

const formValidation = Yup.object().shape({
    comment: Yup.string().required('این فیلد الزامی است'),
});

export const CommentBox: React.FC<CommentBoxProps> = (props) => {
    const [loading, setLoading] = useState<boolean>(false);

    const onFinishForm = (values: typeof formInitialValues) => {
        setLoading(true);
        let params: { [key: number | string]: string | number } = Object.assign({}, values);
        params.record = props.recordId;
        sendRequest(BackendUrls.comment, HttpMethod.POST, params)
            .then((res) => {
                toast.success('توضیجات شما ثبت شد');
                props.setShowModal((r) => !r);
            })
            .catch((err) => {
                catchRequestError(err.data);
            })
            .finally(() => setLoading(false));
    };

    return (
        <Formik
            initialValues={formInitialValues}
            // validationSchema={formValidation}
            onSubmit={(values) => {
                onFinishForm(values);
            }}
        >
            <Form>
                <Box
                    sx={{ direction: 'ltr', display: 'flex', gap: '10px', flexDirection: 'column' }}
                >
                    <Typography>ارسال توضیحات </Typography>
                    <TextField
                        name="comment"
                        label="متن توضیحات"
                        placeholder="وارد کنید"
                        multiline
                        minRows={4}
                    />
                    <LoadingButton
                        variant="contained"
                        size="large"
                        type="submit"
                        loading={loading}
                        // sx={{ width: { md: 'fit-content', xs: '100%' } }}
                    >
                        ثبت{' '}
                    </LoadingButton>
                </Box>
            </Form>
        </Formik>
    );
};
