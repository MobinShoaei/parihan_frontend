import {Box, Button, FilledInput, Grid, Stack, Typography} from '@mui/material';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {State} from '../../../redux/reducers';
import {HttpMethod, sendRequest} from '../../../utils/axios';
import {BackendUrls} from '../../../utils/backend-urls';
import {catchRequestError, checkProperties} from '../../../utils/functions';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {fieldItemType, FieldList} from './FieldList';
import {InputList} from './InputList';
import {Form, Formik, FormikHelpers, useFormikContext} from 'formik';
import {LoadingButton} from '@mui/lab';
import {ProjectApiResponse} from '../../dashboard/Dashboard';
import {setAccesses} from '../../../redux/actions/accesses';
import {useRouter} from 'next/router';
import {MainForm} from './MainForm';

export type fieldType = { [key: string]: string[] | string | number | boolean | null };
export type finalDataType = {
    id: string;
    title: string;
    field_type: string;
    is_visible: boolean;
    values?: { [key: string]: string }[];
    order: number;
};

type formType = {
    id: number | null;
    title: string;
    field_type: string;
    is_visible: boolean;
    values?: { [key: string]: string }[];
    order: number;
};

export const formatDataForSubmit = (values: fieldType) => {

    let finalData: finalDataType[] = [];
    Object.keys(values).map((item, index) => {
        if (!item.includes('_') && values[item] !== null) {
            let fieldItem: finalDataType = {
                id: item,
                title: values[item] as string,
                field_type: values[`${item}_type`] as string,
                is_visible: values[`${item}_visible`] as boolean,
                order: values[`${item}_order`] as number,
            };

            if (values[`${item}_type`] == 'RadioBox' || values[`${item}_type`] == 'SelectBox') {
                fieldItem.values = [];
                for (const subKey in values) {
                    if (subKey.startsWith(item + '_')) {
                        let subKeyId: number | string = parseInt(subKey.split('_')[1]);
                        subKeyId = isNaN(subKeyId)
                            ? subKeyId
                            : subKeyId.toString().padStart(2, '0');

                        !Number.isNaN(subKeyId) &&
                        values[subKey] !== null &&
                        fieldItem.values.push({
                            id:
                                typeof subKeyId == 'number' && subKeyId > 9999
                                    ? 'new'
                                    : subKeyId.toString(),
                            title: values[subKey] as string,
                        });
                    }
                }
            }
            finalData.push(fieldItem);
        }
    });

    return finalData;
};

export const FormManager = (props: { project?: ProjectApiResponse }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [initialValues, setInitialValues] = useState<fieldType>({});
    const [lastUpdate, setLastUpdate] = useState<string | undefined>(props.project?.form_last_update)
    const projectId = useSelector((state: State) => state.projectId);


    useEffect(() => {
        setLoading(true);
        sendRequest(BackendUrls.form_field)
            .then((response) => {
                setInitialValues(makeInitialValues(response.data.results));

            })
            .catch(catchRequestError)
            .finally(() => setLoading(false));
    }, [projectId]);


    const makeInitialValues = (data: finalDataType[]) => {
        let values: fieldType = {};
        data.map((item, index) => {
            values[item.id] = item.title;
            values[`${item.id}_visible`] = item.is_visible;
            values[`${item.id}_order`] = item.order;
            values[`${item.id}_type`] = item.field_type;

            if (item.values) {
                item.values.map((value) => {
                    values[`${item.id}_${value.id}`] = value.title;
                });
            }
        });

        return values;
    };

    const sendFormData = (values: fieldType, actions: FormikHelpers<fieldType>) => {
        if (!editMode) setEditMode(true);
        else pushData(values, actions);
    };

    const removeEmptyItem = (data: formType[]) => {
        const values: formType[] = []
        data.map((item) => {
            item.values = item.values?.filter((value, index, self) => value.title !== "" && self.findIndex(item => item.title === value.title) === index)
            if (item.title) values.push(item)
        })
        return values
    }

    const pushData = (value: fieldType, actions: FormikHelpers<fieldType>) => {
        const data = refactorData(formatDataForSubmit(value));

        setSubmitLoading(true);
        sendRequest(BackendUrls.form_field, HttpMethod.POST, {
            form: props.project?.form,
            fields: removeEmptyItem(data),
        })
            .then((response) => {
                toast.success('فرم با موفقیت بروزرسانی شد');
                actions.resetForm()
                setInitialValues(makeInitialValues(response.data.form_fields));
                setLastUpdate(response.data.last_update);
                setEditMode(false);
            })
            .catch(catchRequestError)
            .finally(() => setSubmitLoading(false));
    };

    const refactorData = (data: any) => {
        let temp = data;

        temp.map((item: any, index: number) => {
            if (item.id.includes('new')) item.id = null;
            else item.id = parseInt(item.id);
            if (item.field_type == 'RadioBox' || item.field_type == 'SelectBox') {
                item.values.map((value: { [key: string]: any }) => {
                    if (value.id > 9999) value.id = null;
                    else value.id = parseInt(value.id);
                });
            }
        });
        return temp;
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                sendFormData(values, actions);
            }}
            enableReinitialize
            validateOnBlur={false}
        >
            <MainForm loading={loading} editMode={editMode} submitLoading={submitLoading}
                      lastUpdate={lastUpdate}/>
        </Formik>
    );
};
