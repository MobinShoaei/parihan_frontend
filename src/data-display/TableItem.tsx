import {Box, Button, Checkbox, Drawer, Grid, Tooltip, Typography} from '@mui/material';
import React, {Dispatch, MouseEvent, SetStateAction, useEffect, useState} from 'react';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import {FormContentType} from '../dashboard/InformationTable';
import jmoment from 'jalali-moment';
import Modal from '../common/Modal';
import {MdOutlineContentCopy} from 'react-icons/md';
import {checkProperties, ellipsisText, hexToRgb} from '../../utils/functions';
import {useIsMobile} from '../hook/useIsMobile';
import {getToken} from '../../utils/cookies';
import jwt_decode from 'jwt-decode';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {toast} from 'react-toastify';
import {BiCommentCheck} from 'react-icons/bi';
import {answersType, InformationModal} from './InformationModal';
import {formFieldsType} from '../dashboard/InformationForm';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {RiUserSettingsFill} from 'react-icons/ri';
import {TagBox} from '../common/TagBox';
import {IconWithText} from '../common/IconWithText';
import {CommentModal} from '../comment/CommentModal';
import {setRecordId} from '../../redux/actions/record_id';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import {State} from "../../redux/reducers";

interface TableItemProps {
    opened: boolean;
    data: FormContentType;
    index: number;
    setTabValue: Dispatch<SetStateAction<string>>;
    setCheckedItems: Dispatch<SetStateAction<number[]>>;
    formFields: formFieldsType[];
    checkedItems: number[];
    isOperator: boolean;
    setEndIndex: Dispatch<SetStateAction<number | undefined>>;
    setStartIndex: Dispatch<SetStateAction<number | undefined>>;
    page: number;
}

export const TableItem: React.FC<TableItemProps> = (props) => {
    const [showMessageModal, setShowMessageModal] = useState<boolean>(false);
    const [showInformationModal, setShowInformationModal] = useState<boolean>(false);

    const dispatch = useDispatch();
    const formVisibility = useSelector((state: State) => state.formVisibility)

    const selectItem = (e: MouseEvent) => {
        selectOrinSelect();
        if (!props.checkedItems.includes(props.data.id)) {
            if (e.shiftKey) {
                props.setEndIndex(props.index);
            } else {
                props.setStartIndex(props.index);
                props.setEndIndex(undefined);
            }
        } else {
            props.setEndIndex(undefined);
            props.setStartIndex(undefined);
        }
    };

    useEffect(() => {
        let temp = Object.keys(checkProperties(props.data.answers));
        let names: answersType[] = [];

        temp.map((item, index) => {
            let found = props.formFields.find(
                (element) => element.label == item && element.is_visible_in_list,
            );
            if (found) {
                found.filter_value = props.data.answers[item];
                names.push(found);
            }
        });
    }, []);

    const selectOrinSelect = () => {
        if (props.checkedItems.includes(props.data.id)) {
            let temp = props.checkedItems.filter(function (item) {
                return item !== props.data.id;
            });
            props.setCheckedItems(temp);
        } else props.setCheckedItems((ides) => [...ides, props.data.id]);
    };

    return (
        <React.Fragment>
            <Box
                id={props.data.id.toString()}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '30px',
                    width: '100%',
                    background: '#fff',
                    border: '0.747929px solid #EAD3D3',
                    borderRadius: '4.48757px',
                    minHeight: '45px',
                    padding: '7px 12px',
                    cursor: 'pointer',
                    overflowY: 'hidden',
                }}
                onClick={(e: any) => {
                    if (e.target.nodeName == 'DIV') {
                        setShowInformationModal((r) => !r);
                    }
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '90px',
                        justifyContent: 'space-between',
                        gap: '5px',
                        minWidth: '70px',
                    }}
                >
                    <Checkbox
                        onClick={(e) => selectItem(e)}
                        checked={props.checkedItems.includes(props.data.id)}
                    />
                    <Typography
                        sx={{
                            fontSize: '16px',
                            color: '#8C8C8C',
                            marginTop: {md: '0px', xs: '8px'},
                        }}
                    >
                        {props.data.order_id}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        width: '100%',
                        alignItems: 'center',
                        minWidth: '920px',
                    }}
                >
                    <Grid
                        container
                        sx={{
                            width: '100%',
                            marginBottom: 0,
                        }}
                        rowSpacing={1}
                    >
                        <Grid item xs={2}>
                            <Typography
                                sx={{
                                    marginTop: {md: '0px', xs: '5px'},
                                    width: 'fit-content',
                                }}
                            >
                                {jmoment(props.data?.created_at)
                                    .locale('fa')
                                    .format('HH:mm YYYY/MM/DD')}
                            </Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <Typography sx={{display: 'flex', gap: '10px', width: 'fit-content'}}>
                                <ContactPhoneIcon color="secondary" sx={{display: 'unset'}}/>
                                {ellipsisText(props.data?.responder_name, 20)}
                            </Typography>
                        </Grid>

                        <Grid
                            item
                            xs={2}
                            sx={{
                                display: 'flex',
                                justifyContent: {md: 'start'},
                                '& svg': {
                                    ml: '10px',
                                    color: '#00AACC',
                                    fontSize: '18px',
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            {props.data?.responder_phone && (
                                <>
                                    <Typography
                                        variant="button"
                                        sx={{color: '#385A86', fontWeight: '700'}}
                                    >
                                        {props.data?.responder_phone}
                                    </Typography>
                                    <CopyToClipboard
                                        text={`9${props.data.responder_phone}`}
                                        onCopy={() =>
                                            toast.success(
                                                '"' + `9${props.data.responder_phone}` + '" کپی شد',
                                            )
                                        }
                                    >
                                        <MdOutlineContentCopy/>
                                    </CopyToClipboard>
                                </>
                            )}
                        </Grid>
                        <Grid item xs={2}>
                            {props.data?.linked_user !== null && (
                                <IconWithText
                                    text={
                                        props.data?.linked_user?.first_name +
                                        ' ' +
                                        props.data?.linked_user?.last_name
                                    }
                                />
                            )}
                        </Grid>
                        <Grid item xs={2}>
                            {props.data?.dio_date && (
                                <IconWithText text={props.data?.dio_date} date/>
                            )}
                        </Grid>
                        <Grid item xs={2}>
                            {props.data.tag && (
                                <TagBox
                                    color={props.data.tag.color_hex}
                                    content={props.data.tag.title}
                                />
                            )}
                        </Grid>
                    </Grid>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                        minWidth: '141px',
                        justifyContent: 'end',
                    }}
                >
                    <BiCommentCheck
                        style={{
                            color: '#fff',
                            cursor: 'pointer',
                            width: '35px',
                            height: '100%',
                            borderRadius: '4px',
                            padding: '6px',
                            background: '#00AACC',
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowMessageModal((r) => !r);
                        }}
                    />

                    {formVisibility && <SaveAsIcon
                        onClick={() => {
                            props.data.editable && dispatch(setRecordId(props.data.id));
                            props.data.editable && props.setTabValue('1');
                        }}
                        sx={{
                            border: '0.895238px solid #EAD3D3',
                            color: props.data.editable ? '#2276D8' : '#908f8f',
                            cursor: props.data.editable ? 'pointer' : 'not-allowed',
                            width: '35px',
                            height: '100%',
                            borderRadius: '4px',
                            padding: '6px',
                            // background: '',
                        }}
                    />}
                </Box>
            </Box>
            <Drawer
                anchor={'right'}
                open={showMessageModal}
                onClose={() => setShowMessageModal(false)}
                sx={{width: '450px'}}
            >
                <CommentModal setShowMessageModal={setShowMessageModal} record_id={props.data.id}/>
            </Drawer>
            <Modal
                open={showInformationModal}
                onClose={() => setShowInformationModal(false)}
                containerSx={{
                    minWidth: {md: '850px', xs: '90%'},
                    background: '#D8D8D8',
                    padding: '12px 16px',
                }}
            >
                <InformationModal
                    setShowInformationModal={setShowInformationModal}
                    data={props.data}
                    formFields={props.formFields}
                    setTabValue={props.setTabValue}
                />
            </Modal>
        </React.Fragment>
    );
};
