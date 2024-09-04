import { LoadingButton } from '@mui/lab';
import { Box, Typography } from '@mui/material';
import { TextField } from '../data-display/TextField';
import { Form, Formik } from 'formik';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';
import { HttpMethod, sendRequest } from '../../utils/axios';
import { BackendUrls } from '../../utils/backend-urls';
import { catchRequestError } from '../../utils/functions';
import { Wrapper } from '../common/Wrapper';

interface VoiceCommentProps {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    id: number;
    message: string;
    setRerender: Dispatch<SetStateAction<boolean>>;
}

const formInitialValues = {
    comment: '',
};

export const VoiceComment = (props: VoiceCommentProps) => {
    const [loading, setLoading] = useState<boolean>(false);

    const onFinishForm = (values: typeof formInitialValues) => {
        setLoading(true);

        let params: { [key: number | string]: string | number } = Object.assign({}, values);
        params.call = props.id;
        sendRequest(BackendUrls.call_comment, HttpMethod.POST, params)
            .then((res) => {
                toast.success('توضیجات شما ثبت شد');
                props.setShowModal((r) => !r);
                props.setRerender((r) => !r);
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
                    {props.message && (
                        <Wrapper sx={{ padding: '10px' }}>
                            <Typography
                                sx={{ whiteSpace: 'pre-line', width: '100%', overflow: 'auto' }}
                            >
                                {props.message}
                            </Typography>
                        </Wrapper>
                    )}
                    <TextField
                        name="comment"
                        label=" توضیحات جدید"
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
