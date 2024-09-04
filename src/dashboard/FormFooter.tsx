import {
    Box,
    Button,
    Drawer,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import Modal from '../common/Modal';
import {CommentBox} from './CommentBox';
import {useField, useFormikContext} from 'formik';
import {LoadingButton} from '@mui/lab';
import AutoComplete from '../data-display/AutoComplete';
import {formFieldsType, keys} from './InformationForm';
import {BsCheckSquare} from 'react-icons/bs';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useIsMobile} from '../hook/useIsMobile';
import AdapterJalali from '@date-io/date-fns-jalali';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import {Responsible} from '../common/Responsible';
import {MdMoreHoriz} from 'react-icons/md';
import {IoAddCircleOutline} from 'react-icons/io5';
import {MdOutlineEditNote, MdOutlineCommentBank} from 'react-icons/md';
import {CommentModal} from '../comment/CommentModal';
import {useDispatch, useSelector} from 'react-redux';
import {setRecordId} from '../../redux/actions/record_id';
import {State} from "../../redux/reducers";
import {findIndexOfId} from "../../utils/functions";
import {setEditRecordAccess} from "../../redux/actions/edit_record_access";

type FormFooterProps = {
    tags: { id: number; title: string }[];
    loading: boolean;
    recordId: number;
    initialTag?: number;
    formFields: formFieldsType[];
    saveHandler: (
        values: unknown | { [key: string | number]: string[] | string | number },
        resetForm?: any,
        setErrors?: any,
        action?: 'save' | 'next',
    ) => void;
    projectId: number;
    itemIndex: number;
    setItemIndex: Dispatch<SetStateAction<number>>
    hasNextRecord: boolean
    modelView: string
};

export const FormFooter: React.FC<FormFooterProps> = (props) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [options, setOptions] = useState<{ label: string; value: number }[]>([]);
    const {resetForm, setErrors, values, getFieldMeta} = useFormikContext();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);


    const dispatch = useDispatch();
    const matches = useIsMobile();
    const {setFieldValue} = useFormikContext();
    const [field, meta] = useField('dio_date');

    const open = Boolean(anchorEl);

    const edit_record_access = useSelector((state: State) => state.editRecordAccess);
    const recordId = useSelector((state: State) => state.recordId);
    const tableValue = useSelector((state: State) => state.table_values)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    useEffect(() => {
        const data = props.tags.map((item, index: number) => {
            return {
                label: item.title,
                value: item.id,
            };
        });
        setOptions(data);
    }, [props.tags]);


    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                height: {md: '100%', xs: 'unset'},
                width: '100%',
                flexDirection: {sm: 'row', xs: 'column'},

            }}
        >
            <Box
                sx={{
                    padding: '12px 15px',
                    width: '100%',
                    display: 'flex',
                    gap: '15px',
                    alignItems: 'center',
                    flexDirection: {sm: 'row'},
                    justifyContent: 'space-between',
                    minWidth: {md: '700px', xs: 'unset'}
                }}
            >
                {(props.recordId !== 0 && matches && edit_record_access) && (
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon/>
                    </IconButton>
                )}
                <Box
                    sx={{
                        display: 'flex',
                        gap: '10px',
                        flexDirection: {md: 'row', xs: 'column'},
                    }}
                >
                    <AutoComplete
                        options={options}
                        name="tag"
                        label="وضعیت"
                        sx={{
                            width: {
                                xs: '180px',
                                borderColor: 'red',
                            },
                        }}
                        disabled={!edit_record_access}
                        color="info"
                    />
                    <Box
                        sx={{
                            width: {
                                xs: '180px',
                                borderColor: 'red',
                            },
                        }}
                    >
                        <LocalizationProvider dateAdapter={AdapterJalali}>
                            <DatePicker
                                disabled={!edit_record_access}
                                label="تاریخ انجام"
                                mask="____/__/__"
                                value={
                                    field.value?.length > 0
                                        ? dayjs(field.value, 'YYYY-MM-DD')
                                        : null
                                }
                                onChange={(newValue) => {
                                    setFieldValue(
                                        'dio_date',
                                        newValue &&
                                        dayjs(newValue).locale('fa').format('YYYY-MM-DD'),
                                    );
                                }}
                                renderInput={(params) => <TextField size="small" {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Responsible projectId={props.projectId} disabled={!edit_record_access}/>
                </Box>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            width: '20ch',
                        },
                    }}

                >
                    <MenuItem onClick={handleClose} sx={{color: '#385A86'}}>
                        <Typography
                            onClick={() => {
                                resetForm({values: keys(props.formFields)});
                                setTimeout(() => {
                                    setErrors({});
                                }, 1);
                                dispatch(setRecordId(0));
                            }}
                            sx={{display: 'flex', alignItems: 'center', gap: '5px'}}
                        >
                            فرم جدید
                            <IoAddCircleOutline/>
                        </Typography>
                    </MenuItem>
                    {matches && (
                        <MenuItem onClick={handleClose} sx={{color: '#385A86'}}>
                            <Typography
                                onClick={() => setShowModal((r) => !r)}
                                sx={{display: 'flex', alignItems: 'center', gap: '5px'}}
                            >
                                ثبت نظر
                                <MdOutlineCommentBank/>
                            </Typography>
                        </MenuItem>
                    )}
                </Menu>
                <Box sx={{display: 'flex', gap: '10px'}}>
                    {!matches && (
                        <React.Fragment>
                            {(props.recordId !== 0 && edit_record_access) && <MessageOutlinedIcon
                                sx={{
                                    cursor: 'pointer',
                                    border: '0.856936px solid #00AACC',
                                    height: '100%',
                                    fontSize: '40px',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    color: '#385A86',
                                }}
                                onClick={() => setShowModal((r) => !r)}
                            />}
                            {edit_record_access && <MdMoreHoriz
                                onClick={(e: any) => handleClick(e)}
                                style={{
                                    cursor: 'pointer',
                                    border: '0.856936px solid #00AACC',
                                    height: '100%',
                                    fontSize: '40px',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    color: '#385A86',
                                }}
                            />}
                        </React.Fragment>
                    )}
                </Box>
            </Box>
            {(props.recordId !== 0 && props.itemIndex < tableValue.length - 1 && props.hasNextRecord && props.modelView == '10') && (
                <LoadingButton
                    // type="submit"
                    variant="contained"
                    sx={{borderRadius: '0px', width: {sm: '200px', xs: '100%'}, color: '#fff', minWidth: '110px',}}
                    loading={props.loading}
                    loadingIndicator="درحال ثبت..."
                    color="info"
                    onClick={() => {
                        props.saveHandler(values, resetForm, setErrors, props.itemIndex < tableValue.length - 1 && edit_record_access ? 'next' : 'save')
                    }}
                >
                    {props.itemIndex < tableValue.length - 1 && edit_record_access ? 'ذخیره و بعدی' : 'بعدی'}
                </LoadingButton>
            )}
            {(props.recordId == 0 || !(props.itemIndex < tableValue.length - 1) || !props.hasNextRecord) && (
                <LoadingButton
                    // type="submit"
                    variant="contained"
                    sx={{borderRadius: '0px', width: {sm: '200px', xs: '100%'}, color: '#fff', minWidth: '110px',}}
                    loading={props.loading}
                    loadingIndicator="درحال ثبت..."
                    color="info"
                    // disabled={!edit_record_access}
                    onClick={() => {
                        resetForm({values: keys(props.formFields)});
                        setTimeout(() => {
                            setErrors({});
                        }, 1);
                        dispatch(setRecordId(0));
                        dispatch(setEditRecordAccess(true))
                    }}
                >
                    {'فرم جدید'}
                </LoadingButton>
            )}
            <LoadingButton
                variant="contained"
                sx={{
                    borderRadius: '0px 0px 3px 0px',
                    width: {sm: '200px', xs: '100%'},
                    minWidth: '110px',
                    background: '#2E4057',
                    '&:hover': {
                        background: '#2E4057',
                    },
                    '& .MuiButton-startIcon svg ': {
                        fontSize: '25px',
                    },
                }}
                loading={props.loading}
                loadingIndicator="درحال ثبت..."
                startIcon={<BsCheckSquare/>}
                // onClick={() => props.saveHandler(values, resetForm, setErrors, 'save')}
                type={'submit'}
                disabled={!edit_record_access}
            >
                {'ذخیره'}
            </LoadingButton>
            <Drawer
                anchor={'right'}
                open={showModal}
                onClose={() => setShowModal(false)}
                sx={{p: 0, width: '450px'}}
            >
                <CommentModal setShowMessageModal={setShowModal} record_id={props.recordId}/>
            </Drawer>
        </Box>
    );
};
