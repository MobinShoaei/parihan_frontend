import {Box, Button, Divider, Grid, Typography} from '@mui/material';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {InformationBox} from './InformationBox';
import {FormContentType} from '../dashboard/InformationTable';
import {catchRequestError, checkProperties, findIndexOfId} from '../../utils/functions';
import {formFieldsType} from '../dashboard/InformationForm';
import jmoment from 'jalali-moment';
import jwt_decode from 'jwt-decode';
import {values} from './InputBox';
import {Options} from './Options';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import {BackendUrls} from '../../utils/backend-urls';
import {sendRequest} from '../../utils/axios';
import {MdOutlineEditNote} from 'react-icons/md';
import {getToken} from '../../utils/cookies';
import {useDispatch, useSelector} from 'react-redux';
import {setRecordId} from "../../redux/actions/record_id";
import {State} from "../../redux/reducers";

interface InformationModalProps {
    setShowInformationModal: Dispatch<SetStateAction<boolean>>;
    data: FormContentType;
    formFields: formFieldsType[];
    setTabValue: Dispatch<SetStateAction<string>>;
    cartMode?: boolean;
}

export type answersType = { [key: string | number]: string | number | boolean | any };
export type filterValuesType = {};

export const InformationModal = (props: InformationModalProps) => {

    const [itemIndex, setItemIndex] = useState<number>(0)
    const [answers, setAnswers] = useState<answersType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [orderId, setOrderId] = useState<number>(props.data.order_id);
    const [recordId, setId] = useState<number>(props.data.id);
    const [record, setRecord] = useState<FormContentType>(props.data);
    const [editable, setEditable] = useState(props.data.editable)
    const dispatch = useDispatch();
    const token = getToken();
    const profile: any = token ? jwt_decode(token) : undefined;
    const tableValue = useSelector((state: State) => state.table_values)

    useEffect(() => {
        setItemIndex(findIndexOfId(tableValue, recordId))
    }, [tableValue, recordId])

    useEffect(() => {

        let names: answersType[] = [];
        props.formFields.map((item, index) => {
            let temp = item
            temp.filter_value = record.answers[item.label];
            names.push(temp);
        });
        ordering(names)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [record]);


    const nexPrevStyle = {display: 'flex', gap: {md: '10px', xs: '1px'}, cursor: 'pointer'};

    const convertValues = (
        type: string | number | boolean,
        value: string | number | boolean,
        option: { id: number, title: string }[],
    ) => {

        switch (type) {
            case 'DateField':
                return (
                    (value && typeof value == 'string') ? jmoment(value).locale('fa').format('YYYY/MM/DD ') : '-'
                );
            case 'SelectBox':
            case 'RadioBox':
                return (
                    (
                        <Options
                            options={values(option)}
                            name={'select-input'}
                            value={(value && typeof value == 'string') ? value.split(',') : []}
                        />
                    )
                );
            default:
                return value ? value : '-';
        }
    };

    const ordering = (value: answersType[]) => {
        value.sort(function (a: any, b: any) {
            return a.order - b.order;
        });
        setAnswers(value);
    }

    const getRecord = (status: 'next' | 'prev') => {
        let data = tableValue[itemIndex + 1]
        if (status == 'prev') data = tableValue[itemIndex - 1];
        setRecord(data);
        setId(data.id);
        setOrderId(data.order_id);
        setEditable(data.editable)
    };

    return (
        <Box sx={{direction: 'ltr', maxHeight: '90vh'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: '10px'}}>
                <Typography variant="body2">ردیف شماره {orderId}</Typography>
                <CloseIcon color="error" onClick={() => props.setShowInformationModal((r) => !r)}/>
            </Box>
            <Grid container spacing={[1, 1]} sx={{maxHeight: '500px', overflow: 'auto'}}>
                <Grid item md={6} xs={12}>
                    <InformationBox index={1} title={'نام مشتری'}>
                        <Typography>{record.responder_name}</Typography>
                    </InformationBox>
                </Grid>
                <Grid item md={6} xs={12}>
                    <InformationBox index={2} title={'شماره مشتری'}>
                        <Typography>{record.responder_phone}</Typography>
                    </InformationBox>
                </Grid>
                {answers.map((item, index) => {
                    return (
                        <Grid item md={6} xs={12} key={index}>
                            <InformationBox index={index + 3} title={item.title}>
                                <Typography
                                    sx={{
                                        maxHeight: '100px',
                                        overflow: 'auto',
                                        whiteSpace: 'pre-line',
                                    }}
                                >
                                    {convertValues(item.field_type, item.filter_value, item.values)}
                                </Typography>
                            </InformationBox>
                        </Grid>
                    );
                })}
            </Grid>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '10px',
                    mt: '20px',
                    alignItems: 'center',
                }}
            >
                <Box sx={{display: 'flex', gap: '10px'}}>
                    {!props.cartMode && itemIndex < tableValue.length - 1 && (
                        <Box sx={nexPrevStyle} onClick={() => getRecord('next')}>
                            <Typography color={'info'} sx={{color: '#00AACC', fontWeight: '500'}}>
                                رکورد بعدی
                            </Typography>
                            <ArrowDropDownCircleIcon color={'info'}/>
                        </Box>
                    )}
                    {!props.cartMode && itemIndex > 0 && itemIndex < tableValue.length - 1 && (
                        <Divider orientation={'vertical'} sx={{height: '30px'}}/>
                    )}
                    {!props.cartMode && itemIndex > 0 && (
                        <Box sx={nexPrevStyle} onClick={() => getRecord('prev')}>
                            <ArrowDropDownCircleIcon
                                color={'secondary'}
                                sx={{transform: 'rotate(0.5turn)'}}
                            />
                            <Typography color={'secondary'} sx={{fontWeight: '500'}}>
                                رکورد قبلی
                            </Typography>
                        </Box>
                    )}
                </Box>
                {editable && (
                    <Button
                        sx={{background: '#385A86'}}
                        variant="contained"
                        onClick={() => {
                            dispatch(setRecordId(recordId));
                            props.setTabValue('1');
                        }}
                        startIcon={<MdOutlineEditNote/>}
                    >
                        ویرایش رکورد
                    </Button>
                )}
            </Box>
        </Box>
    );
};
