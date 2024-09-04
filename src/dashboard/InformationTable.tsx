import {
    Box,
    CircularProgress,
    Grid,
    InputAdornment,
    MenuItem,
    Select,
    SelectChangeEvent,
    Skeleton,
    Stack,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import React, {Dispatch, SetStateAction, useEffect, useState, useRef} from 'react';
import {HttpMethod, sendRequest} from '../../utils/axios';
import {BackendUrls} from '../../utils/backend-urls';
import {
    catchRequestError,
    checkProperties,
    isValidDateFormat,
    mergeAndRemoveDuplicates,
} from '../../utils/functions';
import {InformationTableItem} from '../data-display/InformationTableItem';
import jwt_decode from 'jwt-decode';
import {formFieldsType, keys} from './InformationForm';
import {TableFooter} from './TableFooter';
import {EmptyBox} from '../common/EmptyBox';
import SearchIcon from '@mui/icons-material/Search';
import {DnD} from '../data-display/DnD';
import jmoment from 'jalali-moment';
import {CustomCheckBox} from '../common/CustomCheckBox';
import {FaqWrapper} from './FaqWrapper';
import {commentType} from '../comment/CommentModal';
import {getToken} from '../../utils/cookies';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import useUpdateEffect from '../hook/useUpdateEffect';
import {filterItemsType, filtersNameType} from './Dashboard';
import {useDispatch, useSelector} from 'react-redux';
import {State} from '../../redux/reducers';
import {setInformationTableValues} from '../../redux/actions/information_table_values';
import {Form, Formik} from 'formik';
import {setContentParams} from "../../redux/actions/content_params";

export type FormContentType = {
    created_at: string;
    comments: commentType[];
    color_hex: string;
    answers: { [key: string]: string };
    id: number;
    responder_name: string;
    responder_phone: string;
    tag: { title: string; color_hex: string; id: number };
    order_id: number;
    previous_record: number;
    next_record: number;
    dio_date: string;
    linked_user: { first_name: string; last_name: string; id: number };
    submitted_by: number;
    editable: boolean;
};

type InformationTableProps = {
    id: number;
    formFields: formFieldsType[];
    reRender: boolean;
    setTabValue: Dispatch<SetStateAction<string>>;
    setPage: Dispatch<SetStateAction<number>>;
    page: number;
    tabId: string;
    tags: { id: number; title: string; color_hex: string }[];
    callText: string;
    isEmployer: boolean;
    information: string;
    filterItems: filterItemsType;
    setFilterItems: Dispatch<SetStateAction<filterItemsType>>;
    setFiltersName: Dispatch<SetStateAction<filtersNameType>>;
    filterName: filtersNameType;
    userId: number | undefined;
    setUserId: Dispatch<SetStateAction<number | undefined>>;
    setPageSize: Dispatch<SetStateAction<number>>;
    pageSize: number;
    setChecked: Dispatch<SetStateAction<boolean>>;
    setModelView: Dispatch<SetStateAction<string>>;
    modelView: string;
    checked: boolean;
    searchValue?: string
    setSearchValue: Dispatch<SetStateAction<string | undefined>>
};
export const InformationTable: React.FC<InformationTableProps> = (props) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [reload, setReload] = useState<boolean>(true);
    const [showFaq, setShowFaq] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const [data, setData] = useState<FormContentType[]>([]);
    const [responsibles, setResponsibles] = useState<{ label: string; value: number }[]>([]);
    const [checkedItems, setCheckedItems] = useState<number[]>([]);


    const [isOperator, setIsOperator] = useState<boolean>(false);
    const [myWorkCount, setMyWorksCount] = useState<number>();
    const [startIndex, setStartIndex] = useState<number>();
    const [endIndex, setEndIndex] = useState<number>();
    const [scrollToIndex, setScrollToIndex] = useState<number | null>(null);

    const recordId = useSelector((state: State) => state.recordId);

    const targetRef = useRef<HTMLLIElement | null>(null);
    const dispatch = useDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setChecked(event.target.checked);
    };

    const token = getToken();
    const profile: any = token ? jwt_decode(token) : undefined;
    const prevDependencies = useRef({reload});

    const viewHandleChange = (event: SelectChangeEvent) => {
        props.setModelView(event.target.value);
    };

    useEffect(() => {
        if (!loading) {
            setScrollToIndex(recordId);
        }
    }, [recordId, loading]);

    useUpdateEffect(() => {
        filterItemsName();
        props.setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.filterItems]);

    useEffect(() => {
        if (profile) setIsOperator(profile.role == 'operator');
    }, [profile]);

    useEffect(() => {
        if (targetRef.current) {
            targetRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [scrollToIndex]);

    useEffect(() => {
        selectWithShift();
    }, [startIndex, endIndex]);

    useEffect(() => {
        setCheckedItems([]);
        sendRequest(BackendUrls.org_user, HttpMethod.GET, {project: props.id})
            .then((res) => {
                let persons: { label: string; value: number }[] = [];
                res.data.results.map(
                    (item: {
                        first_name: string;
                        last_name: string;
                        id: number;
                        is_active: boolean;
                    }) => {
                        if (item.is_active)
                            persons.push({
                                label: item.first_name + ' ' + item.last_name,
                                value: item.id,
                            });
                    },
                );
                setResponsibles(persons);
            })
            .catch((err) => catchRequestError(err));
    }, [props.id]);

    const selectWithShift = () => {
        if (startIndex !== undefined && endIndex !== undefined) {
            let s = startIndex,
                e = endIndex;
            if (startIndex > endIndex) {
                s = endIndex;
                e = startIndex;
            }
            let temp: number[] = [];
            data.map((item, index) => {
                if (index >= s && index < e) {
                    temp.push(item.id);
                }
            });
            setCheckedItems(mergeAndRemoveDuplicates(checkedItems, temp));
        }
    };

    const filterItemsName = () => {
        let temp = Object.keys(checkProperties(props.filterItems));
        let names: { [key: string | number]: string | number | boolean | any }[] = [];
        temp.map((item) => {
            if (
                item == 'responder_name' ||
                item == 'responder_phone' ||
                item == 'comment_is_null' ||
                item == 'tag' ||
                item == 'linked_user' ||
                item.includes('dio_date') ||
                item.includes('created_at')
            ) {
                if (item == 'responder_name')
                    names.push({
                        title: 'نام مشتری',
                        filter_value: props.filterItems['responder_name'],
                    });
                else if (item == 'responder_phone')
                    names.push({
                        title: 'شماره تماس مشتری',
                        filter_value: props.filterItems['responder_phone'],
                    });
                else if (item == 'comment_is_null')
                    names.push({
                        title: 'کامنت‌دارها',
                        filter_value: props.filterItems['comment_is_null'] !== true ? 'بله' : 'خیر',
                    });
                else if (item == 'tag')
                    names.push({
                        title: 'وضعیت',
                        filter_value:
                            props.tags.find((tag) => props.filterItems['tag'] === tag.id)?.title ||
                            'خالی',
                    });
                else if (item == 'linked_user')
                    names.push({
                        title: 'مسئول',
                        filter_value:
                            responsibles.find(
                                (responsible) =>
                                    props.filterItems['linked_user'] === responsible.value,
                            )?.label || 'خالی ',
                    });
                else if (item == 'dio_date__lte')
                    names.push({
                        title: 'تا تاریخ انجام',
                        filter_value: jmoment(props.filterItems[item] as string)
                            .locale('fa')
                            .format('YYYY-MM-DD'),
                    });
                else if (item == 'dio_date__gte')
                    names.push({
                        title: 'از تاریخ انجام',
                        filter_value: jmoment(props.filterItems[item] as string)
                            .locale('fa')
                            .format('YYYY-MM-DD'),
                    });
                else if (item == 'created_at__lte')
                    names.push({
                        title: 'تا تاریخ ایجاد',
                        filter_value: jmoment(props.filterItems[item] as string)
                            .locale('fa')
                            .format('YYYY-MM-DD'),
                    });
                else if (item == 'created_at__gte')
                    names.push({
                        title: 'از تاریخ ایجاد',
                        filter_value: jmoment(props.filterItems[item] as string)
                            .locale('fa')
                            .format('YYYY-MM-DD'),
                    });
            } else {
                let found = props.formFields.find((element) => element.label == item);
                if (found) {
                    found.filter_value =
                        item == 'datefield'
                            ? jmoment(props.filterItems[item] as string)
                                .locale('fa')
                                .format('YYYY/MM/DD')
                            : (props.filterItems[item] as string);
                    names.push(found);
                }
            }
        });
        props.setFiltersName(names);
    };

    useEffect(() => {
        if (props.tabId == '2') {
            if (prevDependencies.current.reload !== reload) {
                setLoading(false);
            } else setLoading(true);

            let params = checkProperties(props.filterItems);
            params.form__project = props.id;
            params.page = props.page;
            params.page_size = props.pageSize;

            if (props.searchValue) {
                params.search = props.searchValue;
                params.page = props.page;
            }
            if (props.userId) {
                params.linked_user = props.userId;
                params.page = props.page;
            }
            if (props.checked) {
                params.ordering = 'order_id';
            }
            dispatch(setContentParams(checkProperties(params)))
            sendRequest<{
                count: number;
                next: null | string;
                previous: null | string;
                results: FormContentType[];
            }>(BackendUrls.form_contents, HttpMethod.GET, checkProperties(params))
                .then((res) => {
                    if (props.userId) setMyWorksCount(res.data.count);
                    setCount(res.data.count);
                    setData(res.data.results);
                    dispatch(setInformationTableValues(res.data.results));
                })
                .catch(() => {
                    catchRequestError;
                })
                .finally(() => {
                    setLoading(false);
                });
            prevDependencies.current.reload = reload;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        props.id,
        props.filterItems,
        props.page,
        props.reRender,
        props.modelView,
        props.searchValue,
        reload,
        props.userId,
        props.pageSize,
        props.checked,
    ]);


    const getMyWorks = () => {
        if (props.userId) props.setUserId(undefined);
        else props.setUserId(profile.user_id);
        props.setPage(1);
    };

    return (
        <Box sx={{display: 'flex', gap: '10px', flexDirection: {sm: 'row', xs: 'column'}}}>
            <Box
                sx={{
                    width: {
                        md: showFaq ? '30%' : '0px',
                        xs: showFaq ? '100%' : 0,
                    },
                    height: {xs: showFaq ? '340px' : 0},
                    visibility: showFaq ? 'visible' : 'hidden',
                    transition: {
                        md: 'visibility 0.1s, width 0.2s linear',
                        xs: 'visibility 0.1s, height 0.2s linear',
                    },
                }}
            >
                <FaqWrapper
                    loading={false}
                    id={props.id}
                    callText={props.callText}
                    information={props.information}
                />
            </Box>
            <Box
                sx={{
                    height: '100%',
                    width: {md: showFaq ? '70%' : '100%', xs: showFaq ? '100%' : '100%'},
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 2,
                        gap: 2,
                        flexDirection: {sm: 'row', xs: 'column'},
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: {md: '40px', xs: '2px'},
                            flexDirection: {sm: 'row', xs: 'column'},
                            alignItems: {xs: 'start'},
                        }}
                    >
                        <Select
                            value={props.modelView}
                            onChange={viewHandleChange}
                            size="small"
                            sx={{width: {sm: '250px', xs: '100%'}}}
                        >
                            <MenuItem value={10}>نمایش لیستی</MenuItem>
                            <MenuItem value={20}>نمایش کارتی</MenuItem>
                        </Select>
                        {props.modelView == '10' && (
                            <CustomCheckBox
                                label="نمایش سوالات و متن مکالمه"
                                onChange={() => setShowFaq((r) => !r)}
                            />
                        )}
                        <CustomCheckBox
                            label={`فقط کارهای من${
                                myWorkCount !== undefined ? `(${myWorkCount})` : ``
                            }`}
                            icon={<AssignmentIndIcon/>}
                            onChange={getMyWorks}
                            checked={!!props.userId}
                        />
                        {props.modelView == '10' && (
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="body2" sx={{fontSize: '16px'}}>
                                    صعودی
                                </Typography>
                                <Switch checked={props.checked} onChange={handleChange}/>
                                <Typography variant="body2" sx={{fontSize: '16px'}}>
                                    نزولی
                                </Typography>
                            </Stack>
                        )}
                    </Box>

                    {
                        // <Formik
                        //     initialValues={{search: ''}}
                        //     onSubmit={(e) => handelSearch(searchInputValue ? searchInputValue : '')}
                        // >
                        //     <Form>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon
                                            // onClick={(e: any) => setSearchValue(e.target.value)}
                                            // sx={{cursor: 'pointer'}}
                                        />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position={'end'}>
                                        {props.searchValue && (
                                            <HighlightOffIcon
                                                sx={{cursor: 'pointer'}}
                                                onClick={() => {
                                                    props.setSearchValue('');
                                                }}
                                            />
                                        )}
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                            placeholder="جستجو در بین ورودی‌ها"
                            sx={{fontSize: '12px'}}
                            onKeyDown={(e: any) => {
                                if (e.code === 'Enter' || e.code === 'NumpadEnter' || e.code) {
                                    // e.preventDefault();
                                    if (!e.shiftKey) {
                                        props.setSearchValue(e.target.value);
                                    }
                                }
                            }}
                            value={props.searchValue}
                            onChange={(e) => props.setSearchValue(e.target.value)}
                            autoCapitalize={'none'}
                            autoCorrect={'off'}
                        />
                        //     </Form>
                        // </Formik>
                    }
                </Box>
                {props.modelView == '10' ? (
                    <Box sx={{height: 'calc( 100% - 46px)'}}>
                        <Box
                            sx={{
                                height: 'calc(100vh - 330px)',
                                overflow: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                borderRadius: '4px 4px 0 0 ',
                            }}
                        >
                            {Object.keys(props.filterItems).length > 0 && (
                                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                                    <Box sx={{display: 'flex', gap: '15px'}}>
                                        {props.filterName.map((item, index) => {
                                            return (
                                                <Box
                                                    key={index}
                                                    sx={{
                                                        display: 'flex',
                                                        gap: '5px',
                                                        alignItems: 'center',
                                                        border: '1px solid #8C8C8C ',
                                                        padding: '5px',
                                                        borderRadius: '5px',
                                                        backgroundColor: '#fff',
                                                    }}
                                                >
                                                    <Typography variant="body2">
                                                        {item.title}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="primary"
                                                        sx={{
                                                            backgroundColor: '#fff',
                                                            padding: '2px 5px',
                                                            width: 'fit-content',
                                                            borderRadius: '5px',
                                                        }}
                                                    >
                                                        {typeof item.filter_value == 'object'
                                                            ? item.filter_value.join(',')
                                                            : isValidDateFormat(
                                                                item.filter_value as string,
                                                            )
                                                                ? jmoment(item.filter_value as string)
                                                                    .locale('fa')
                                                                    .format('YYYY/MM/DD')
                                                                : item.filter_value !== 'none'
                                                                    ? item.filter_value
                                                                    : 'خالی'}
                                                    </Typography>
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                    <Box
                                        sx={{
                                            border: '1px solid #8C8C8C ',
                                            borderRadius: '4px',
                                            display: 'flex',
                                            padding: '0 7px',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            width: 'fit-content',
                                            backgroundColor: '#fff',
                                        }}
                                        onClick={() => props.setFilterItems({})}
                                    >
                                        <Typography variant="body2">حذف فیلتر</Typography>
                                    </Box>
                                </Box>
                            )}
                            {loading ? (
                                [...Array(5)].map((item, key) => {
                                    return <Skeleton height={'63px'} key={key}/>;
                                })
                            ) : data.length > 0 ? (
                                data.map((item, index) => {
                                    return (
                                        <InformationTableItem
                                            key={index}
                                            data={item}
                                            index={index}
                                            setTabValue={props.setTabValue}
                                            formFields={props.formFields}
                                            setCheckedItems={setCheckedItems}
                                            checkedItems={checkedItems}
                                            isOperator={isOperator}
                                            setStartIndex={setStartIndex}
                                            setEndIndex={setEndIndex}
                                            page={props.page}
                                            inputRef={item.id === scrollToIndex ? targetRef : null}
                                        />
                                    );
                                })
                            ) : (
                                <EmptyBox/>
                            )}
                        </Box>

                        <Box
                            sx={{
                                height: {sm: '63px', xs: 'auto'},
                                width: '100%',
                                background: '#FFF',
                                boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.25)',
                                borderRadius: '0px 0px 6px 6px',
                                position: 'relative',
                            }}
                        >
                            <TableFooter
                                count={count}
                                formFields={props.formFields}
                                setFilterItems={props.setFilterItems}
                                setPage={props.setPage}
                                page={props.page}
                                projectId={props.id}
                                tags={props.tags}
                                checkedItems={checkedItems}
                                setCheckedItems={setCheckedItems}
                                setReload={setReload}
                                setPageSize={props.setPageSize}
                                pageSize={props.pageSize}
                            />
                        </Box>
                    </Box>
                ) : (
                    !loading &&
                    data.length > 0 && (
                        <DnD
                            tags={props.tags}
                            data={data}
                            setTabValue={props.setTabValue}
                            formFields={props.formFields}
                            searchValue={props.searchValue}
                            userId={props.userId}
                        />
                    )
                    // : <Box sx={{height: 'calc(100vh - 330px)'}}><EmptyBox/></Box>
                )}
            </Box>
        </Box>
    );
};
