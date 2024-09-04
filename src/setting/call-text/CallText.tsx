import {Box, Grid, Typography} from '@mui/material';
import {Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {State} from '../../../redux/reducers';
import {HttpMethod, sendRequest} from '../../../utils/axios';
import {BackendUrls} from '../../../utils/backend-urls';
import {catchRequestError} from '../../../utils/functions';
import {ProjectListApiResponse} from '../../dashboard/Customers';
import {CustomeLoadingButton} from '../../inputs/CustomLoadingButton';
import {TextField} from '../../inputs/TextField';
import * as Yup from 'yup';
import RichTextEditor from '../../inputs/RichTextEditor';
import {toast} from 'react-toastify';

const formValidation = Yup.object().shape({
    call_text: Yup.string().required('این فیلد الزامی است'),
});

export const CallText = () => {
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [initialValues, setInitialValues] = useState<{
        [key: string]: string;
    }>({});
    const projectId = useSelector((state: State) => state.projectId);

    useEffect(() => {
        if (projectId !== 0) {
            sendRequest(BackendUrls.project + projectId + '/')
                .then((res) => {
                    setInitialValues(makeInitialValues(res.data.call_text));
                })
                .catch((err) => {
                    catchRequestError(err);
                });
        }
    }, [projectId]);

    const makeInitialValues = (call_text: string) => {
        let values: { [key: string]: string } = {
            call_text: call_text,
        };

        return values;
    };

    const saveCallText = (v: { [key: string]: string }, reset: any) => {
        setSubmitLoading(true);
        sendRequest(BackendUrls.project + projectId + '/', HttpMethod.PATCH, {
            call_text: v.call_text,
        })
            .then((res) => {
                toast.success('تغییرات شما ثبت شد');
            })
            .catch((err) => {
                catchRequestError(err);
            })
            .finally(() => setSubmitLoading(false));
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
                <Typography>متن مکالمه با مشتری</Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexDirection: 'column',
                    alignItems: 'center',
                    // height: 'calc(100vh - 250px)',
                    p: '10px 0',
                }}
            >
                <Formik
                    initialValues={initialValues}
                    validationSchema={formValidation}
                    onSubmit={(values, {resetForm, setErrors}) => {
                        saveCallText(values, resetForm);
                    }}
                    enableReinitialize
                >
                    <Form>
                        <Grid container rowSpacing="10px" sx={{maxWidth: '450px'}}>
                            <Grid
                                item
                                xs={24}
                                sx={{
                                    '& .ql-editor': {
                                        height: '400px',
                                        textAlign: 'left',
                                        width: '100%',
                                        direction: 'ltr',
                                        fontFamily: 'iranSans',
                                        'li:not(.ql-direction-rtl)::before': {
                                            marginRight: 'unset '
                                        }
                                    },
                                    '& .ql-toolbar': {
                                        direction: 'rtl',
                                    },
                                }}
                            >
                                <RichTextEditor name="call_text"/>
                            </Grid>

                            <Grid item xs={24}>
                                <CustomeLoadingButton
                                    loading={submitLoading}
                                    sx={{
                                        // marginTop: { md: 4, xs: 2 },
                                        padding: '11px 22px',
                                        backgroundColor: '#385A86',
                                    }}
                                >
                                    ثبت تغییرات
                                </CustomeLoadingButton>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </Box>
        </Box>
    );
};
