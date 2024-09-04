import {Box, Grid, Stack, Typography} from '@mui/material';
import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import {HttpMethod, sendRequest} from '../../utils/axios';
import {BackendUrls} from '../../utils/backend-urls';
import {catchRequestError, checkProperties, convertToEn, findIndexOfId} from '../../utils/functions';
import {InputBox} from '../data-display/InputBox';
import {FormFooter} from './FormFooter';
import {Form, Formik, FormikProps} from 'formik';
import {toast} from 'react-toastify';
import {FormContentType} from './InformationTable';
import {FormSkeleton} from '../common/DashboardSkeleton';
import * as Yup from 'yup';
import useUpdateEffect from '../hook/useUpdateEffect';
import {useDispatch, useSelector} from 'react-redux';
import {setRecordId} from '../../redux/actions/record_id';
import {State} from "../../redux/reducers";
import {setEditRecordAccess} from "../../redux/actions/edit_record_access";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useRouter} from "next/router";
import {setInformationTableValues} from "../../redux/actions/information_table_values";

export type formFieldsType = {
    color_hex: string;
    field_type: string;
    form: number;
    id: number;
    is_required: boolean;
    order: number;
    title: string;
    values: { id: number, title: string }[];
    label: string;
    filter_value?: string | boolean;
    is_visible_in_list: boolean
};

const formValidation = Yup.object().shape({
    responder_name: Yup.string().required('این فیلد الزامی است'),
    responder_phone: Yup.string()
        .required('این فیلد الزامی است')
        .matches(/^\d{1,15}$/, 'شماره صحیح نمی‌باشد'),
});

type dataTypes = {
    tag: number;
    form?: number;
    answers?: { field: number; answer: string }[];
    responder_phone: string;
    responder_name: string;
    record?: number;
    dio_date?: string;
    linked_user?: number;

};

interface InformationFormProps {

    tags: { id: number; title: string }[];
    formFields: formFieldsType[];
    tabId: string;
    setTabId: Dispatch<SetStateAction<string>>
    setPage: Dispatch<SetStateAction<number>>
    modelView: string
    page: number;
    pageSize: number
};

export const keys = (formFields: formFieldsType[]) => {
    let temp: { [key: number | string]: string } = {responder_phone: '', responder_name: ''};
    formFields.map((item) => {
        temp[item.id] = '';
    });
    return temp;
};

export const InformationForm: React.FC<InformationFormProps> = (props) => {
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [initialValues, setInitialValues] = useState<{
        [key: string | number]: string[] | string | number;
    }>({});

    const [orderId, setOrderId] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasNextRecord, setHasNextRecord] = useState<boolean>(false);
    const [retrieveData, setRetrieveData] = useState<FormContentType>();
    const [itemIndex, setItemIndex] = useState<number>(0)
    const [counter, setCounter] = useState<number>(1)
    const [initPage, setInitPage] = useState<number>(props.page)

    const contentParams = useSelector((state: State) => state.content_params)
    const edit_record_access = useSelector((state: State) => state.editRecordAccess);
    const form__access = useSelector((state: State) => state.formVisibility);
    const recordId = useSelector((state: State) => state.recordId);
    const tableValue = useSelector((state: State) => state.table_values)
    const projectId = useSelector((state: State) => state.projectId);
    const formId = useSelector((state: State) => state.formId)
    const formikRef =
        useRef<FormikProps<{ [key: string | number]: string[] | string | number }>>(null);

    const dispatch = useDispatch();

    let url = BackendUrls.form_answer;
    let method = HttpMethod.POST;


    useEffect(() => {
        setItemIndex(findIndexOfId(tableValue, recordId))
        console.log(tableValue)
    }, [tableValue])


    useUpdateEffect(() => {
       
        props.setPage(initPage + Math.floor(findIndexOfId(tableValue, recordId) / props.pageSize))
        if (findIndexOfId(tableValue, recordId) == (props.pageSize * counter) - 2) {
            // setFetchData(false)
            let params = contentParams
            params.page = contentParams.page as number + 1

            sendRequest<{
                count: number;
                next: null | string;
                previous: null | string;
                results: FormContentType[];
            }>(BackendUrls.form_contents, HttpMethod.GET, params)
                .then((res) => {
                    const data = [...tableValue, ...res.data.results]
                    dispatch(setInformationTableValues(data));
                    setCounter(r => r + 1)
                })
        }

    }, [recordId])
    const makeInitialValues = (data: FormContentType) => {
        let values: { [key: string | number]: string[] | string | number } = {
            responder_name: data?.responder_name,
            responder_phone: data?.responder_phone,
            tag: data?.tag.id,
            dio_date: data?.dio_date,
            linked_user: data?.linked_user?.id,
        };

        props.formFields.map((field) => {
            let temp: { [key: number | string]: string | string[] } = {};
            const labeles = data && Object.keys(data.answers);
            labeles?.map((label) => {
                if (field.label == label) {
                    temp[field.id] = data
                        ? field.field_type == 'SelectBox'
                            ? data.answers[label].split(',')
                            : data.answers[label] !== undefined
                                ? data.answers[label]
                                : ''
                        : '';
                }
            });

            const item: string = Object.keys(temp)[0];

            values[field.id] = temp[item] == undefined ? '' : temp[item];
        });

        return values;
    };

    useEffect(() => {

        // setHasNextRecord(retrieveData?.next_record != null)
        if (recordId !== 0 && retrieveData) {
            setOrderId(retrieveData.order_id);
            setInitialValues(makeInitialValues(retrieveData));
        } else {
            setInitialValues(keys(props.formFields));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.formFields, retrieveData]);

    const buildFormData = (values: any) => {
        const formDataValues = Object.assign({}, checkProperties(values));
        let finalData: dataTypes = {
            tag: formDataValues.tag,
            form: formId,
            responder_phone: formDataValues.responder_phone,
            responder_name: formDataValues.responder_name,
            dio_date: formDataValues.dio_date,
            linked_user: formDataValues.linked_user,
        };

        let answers: { field: number; answer: string }[] = [];
        delete formDataValues.tag;
        delete formDataValues.dio_date;
        delete formDataValues.linked_user;
        delete formDataValues.responder_phone;
        delete formDataValues.responder_name;
        const keys = Object.keys(formDataValues);

        keys.map((item) => {
            if (formDataValues[item].length > 0) {
                if (typeof formDataValues[item] == 'object') {
                    answers.push({
                        field: parseInt(item),
                        answer: formDataValues[item].join(','),
                    });
                } else {
                    answers.push({
                        field: parseInt(item),
                        answer: formDataValues[item],
                    });
                }
            }
        });
        finalData.answers = answers;

        return finalData;
    };

    const sendFormData = (
        values: unknown | { [key: string | number]: string[] | string | number },
        resetForm?: any,
        setErrors?: any,
        action?: 'save' | 'next',
    ) => {

        let data = buildFormData(values);
        if (recordId !== 0) {
            url = BackendUrls.update_record;
            method = HttpMethod.PATCH;
            data.record = recordId;
        }
        if (data.tag && edit_record_access) {
            setSubmitLoading(true);
            sendRequest<FormContentType>(url, method, data)
                .then((response) => {
                    if (action === 'next') {
                        setItemIndex(r => r + 1)

                    }
                    if (recordId === 0) {

                        setOrderId(response.data.order_id);
                        dispatch(setRecordId(response.data.id))

                    }
                    toast.success(
                        <Typography>
                            {recordId === 0
                                ? 'اطلاعات با موفقیت ذخیره شد'
                                : 'اطلاعات بروزرسانی شد'}
                        </Typography>,
                    );
                })
                .catch((error) => {
                    catchRequestError(error);
                })
                .finally(() => {
                    setSubmitLoading(false);
                });
        } else {
            if (!edit_record_access) {
                setItemIndex(r => r + 1)
                setHasNextRecord(true)
            } else {
                toast.error(
                    <Box>
                        <Typography>انتخاب وضعیت الزامی است</Typography>
                    </Box>,
                );
            }

        }
    };

    useUpdateEffect(() => {
        formikRef.current?.resetForm({values: keys(props.formFields)});
        formikRef.current?.setErrors({});
    }, [props.tabId, projectId]);


    useEffect(() => {
        if (recordId !== 0) {
            setLoading(true)
            setRetrieveData(tableValue[itemIndex])
            setHasNextRecord(true)
            setTimeout(() => {
                setLoading(false)
            }, 10);
            dispatch(setRecordId(tableValue[itemIndex].id))

            if (form__access) {
                if (tableValue[itemIndex].editable) dispatch(setEditRecordAccess(true))
                else dispatch(setEditRecordAccess(false))
            }
        }
    }, [itemIndex]);


    return (
        <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            onSubmit={(values, {resetForm, setErrors}) => {
                sendFormData(values, resetForm, setErrors, 'save');
            }}
            enableReinitialize
            validationSchema={formValidation}
            validateOnBlur={false}

        >
            <Form>
                <Box
                    sx={{
                        height: 'calc(100vh - 195px)',
                        backgroundColor: 'rgba(236,236,236,255)',
                        borderRadius: '3px',
                        overflow: 'auto'
                    }}
                >
                    {loading ? (
                        <Grid
                            container
                            sx={{
                                padding: '10px 20px',
                                height: 'calc(100% - 63px)',
                                overflow: 'auto',
                            }}
                            columnSpacing={4}
                        >
                            {[...Array(7)].map((item, key) => {
                                return <FormSkeleton key={key}/>;
                            })}
                        </Grid>
                    ) : (
                        <Box
                            sx={{
                                padding: '14px',
                                height: 'calc(100% - 63px)',
                                overflow: 'auto',
                                border: '0.957215px solid #EAD3D3',
                                borderRadius: '4px 4px 0 0',
                                minWidth: {md: '920px', xs: 'unset'}
                            }}
                        >
                            <Stack direction={'row'} justifyContent={'space-between'} sx={{mb: 1}}>
                                {(recordId !== 0 && orderId !== null) && (
                                    <Typography variant="body2" sx={{marginBottom: '10px'}}>
                                        {'ردیف شماره ' + orderId}
                                    </Typography>
                                )}
                                {recordId !== 0 && <ArrowBackIcon color={'primary'} sx={{cursor: 'pointer'}}
                                                                  onClick={() => {
                                                                      props.setTabId("2");
                                                                      // dispatch(setRecordId(0));
                                                                  }}/>}
                            </Stack>

                            <Grid container spacing={[1, 1]}>
                                <Grid item md={6} xs={12}>
                                    <InputBox
                                        index={1}
                                        title="نام مشتری"
                                        inputType="TextField"
                                        options={[]}
                                        name={'responder_name'}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <InputBox
                                        index={2}
                                        title={'شماره مشتری'}
                                        inputType={'IntegerField'}
                                        options={[]}
                                        name={'responder_phone'}
                                    />
                                </Grid>
                                {props.formFields.map((field, index) => {
                                    return (
                                        <Grid item md={6} key={field.id} xs={12}>
                                            <InputBox
                                                index={index + 3}
                                                title={field.title}
                                                inputType={field.field_type}
                                                options={field.values}
                                                name={field.id}
                                            />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                    )}
                    <Box
                        sx={{
                            height: {sm: '63px', xs: 'unset'},
                            width: '100%',
                            background: '#FFF',
                            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.25)',
                            borderRadius: '0px 0px 6px 6px',
                            position: 'relative',
                        }}
                    >
                        <FormFooter
                            tags={props.tags}
                            loading={submitLoading}
                            recordId={recordId}
                            initialTag={retrieveData?.tag.id}
                            formFields={props.formFields}
                            saveHandler={sendFormData}
                            projectId={projectId}
                            itemIndex={itemIndex}
                            setItemIndex={setItemIndex}
                            hasNextRecord={hasNextRecord}
                            modelView={props.modelView}
                        />
                    </Box>
                </Box>
            </Form>
        </Formik>
    );
};
