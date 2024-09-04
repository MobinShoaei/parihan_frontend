import {Box, Grid, IconButton, Typography} from '@mui/material';
import {Form, Formik} from 'formik';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {HttpMethod, sendRequest} from '../../../utils/axios';
import {BackendUrls} from '../../../utils/backend-urls';
import {catchRequestError} from '../../../utils/functions';
import {CustomeLoadingButton} from '../../inputs/CustomLoadingButton';
import {TextField} from '../../inputs/TextField';
import {FaqDataType} from './FaqList';
import * as Yup from 'yup';
import {toast} from 'react-toastify';
import {useSelector} from "react-redux";
import {State} from "../../../redux/reducers";

interface NewFaqProps {
    faqId: number;
    setReRender: Dispatch<SetStateAction<boolean>>;
    setFaqId: Dispatch<SetStateAction<number>>;
}

const formValidation = Yup.object().shape({
    question: Yup.string().required('این فیلد الزامی است'),
    answer: Yup.string().required('این فیلد الزامی است'),
});

export const NewFaq = (props: NewFaqProps) => {
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [initialValues, setInitialValues] = useState<{
        [key: string]: string | boolean | undefined | number;
    }>({});

    const projectId = useSelector((state: State) => state.projectId)


    useEffect(() => {
        if (props.faqId !== 0) {
            sendRequest<FaqDataType>(BackendUrls.faq + props.faqId + '/')
                .then((res) => {
                    setInitialValues(makeInitialValues(res.data));
                })
                .catch((err) => catchRequestError(err));
        }
    }, [props.faqId]);

    useEffect(() => {
        if (props.faqId == 0) setInitialValues(keys());
    }, []);

    const makeInitialValues = (data: FaqDataType) => {
        let values: { [key: string]: string | boolean | undefined | number } = {
            question: data.question,
            answer: data.answer,
        };

        return values;
    };

    const keys = () => {
        let values: { [key: string]: string } = {
            question: '',
            answer: '',
        };

        return values;
    };

    const saveFaq = (
        values: { [key: string]: string | boolean | undefined | number },
        resetForm: any,
    ) => {
        let url = BackendUrls.faq;
        let method = HttpMethod.POST;
        if (props.faqId !== 0) {
            url = BackendUrls.faq + props.faqId + '/';
            method = HttpMethod.PATCH;
        }
        sendRequest<FaqDataType>(url, method, {...values, project: projectId})
            .then((res) => {
                toast.success(props.faqId == 0 ? 'سوال شما ثبت شد' : 'تغییرات شما ثبت شد');
                props.setReRender((r) => !r);
                resetForm({
                    values: keys(),
                });
                props.setFaqId(0);
            })
            .catch((err) => catchRequestError(err));
    };

    return (
        <Box sx={{border: ' 0.747929px solid #EAD3D3', borderRadius: '6px', background: '#fff'}}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    borderBottom: '1px solid #8C8C8C',
                    padding: '13px 0 ',
                }}
            >
                <Typography>{props.faqId == 0 ? 'افزودن سوال جدید' : 'ویرایش سوال'}</Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: 'calc(100vh - 250px)',
                }}
            >
                <Formik
                    initialValues={initialValues}
                    validationSchema={formValidation}
                    onSubmit={(values, {resetForm, setErrors}) => {
                        saveFaq(values, resetForm);
                    }}
                    enableReinitialize
                    validateOnBlur={false}
                >
                    <Form>
                        <Grid container rowSpacing="20px" sx={{maxWidth: '350px'}}>
                            <Grid item xs={24}>
                                <TextField
                                    label="عنوان و متن سوال"
                                    name="question"
                                    placeholder="لطفا سوال را در این کادر بنویسید"
                                    multiline
                                    rows={3}
                                />
                            </Grid>
                            <Grid item xs={24}>
                                <TextField
                                    label="پاسخ سوال مطرح شده"
                                    name="answer"
                                    placeholder="پاسخ سوال را در این کادر بنویسید"
                                    multiline
                                    rows={6}
                                />
                            </Grid>

                            <Grid item xs={24}>
                                <CustomeLoadingButton
                                    loading={submitLoading}
                                    sx={{
                                        marginTop: {md: 4, xs: 2},
                                        padding: '11px 22px',
                                        backgroundColor: '#385A86',
                                    }}
                                >
                                    {props.faqId == 0 ? 'ثبت سوال جدید' : 'ثبت تغییرات'}
                                </CustomeLoadingButton>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </Box>
        </Box>
    );
};
