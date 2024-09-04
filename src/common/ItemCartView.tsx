import React, {Dispatch, SetStateAction, useState} from 'react';
import {Box, Button, Tooltip, Typography} from '@mui/material';
import {MdOutlineContentCopy} from 'react-icons/md';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {toast} from 'react-toastify';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import {FormContentType} from '../dashboard/InformationTable';
import jmoment from 'jalali-moment';
import Modal from './Modal';
import {InformationModal} from '../data-display/InformationModal';
import {formFieldsType} from '../dashboard/InformationForm';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import {IconWithText} from './IconWithText';
import {useDispatch} from 'react-redux';
import {setRecordId} from '../../redux/actions/record_id';
import {ellipsisText} from "../../utils/functions";
import {getToken} from "../../utils/cookies";
import jwt_decode from "jwt-decode";

interface ItemCartView {
    data: FormContentType;
    index: number;
    setTabValue: Dispatch<SetStateAction<string>>;
    formFields: formFieldsType[];
    isOperator: boolean
}

export const ItemCartView = (props: ItemCartView) => {
    const [showInformationModal, setShowInformationModal] = useState<boolean>(false);

    const dispatch = useDispatch();
    const token = getToken();
    const profile: any = token ? jwt_decode(token) : undefined;

    return (
        <>
            <Box
                sx={{
                    padding: '12px 10px',
                    background: '#fff',
                    border: '0.747929px solid #EAD3D3',
                    borderRadius: '4.48757px',
                    // cursor: 'pointer',
                }}
                onClick={(e: any) => {
                    if (e.target.nodeName == 'DIV') {
                        setShowInformationModal((r) => !r);
                    }
                }}

            >
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Box sx={{display: 'flex', gap: '15px', alignItems: 'center'}}>
                            <Typography variant="body2">{props.data.order_id}</Typography>
                            {/* <Typography>{props.data.responder_name}</Typography> */}
                        </Box>
                        <Typography variant="body2">
                            {jmoment(props.data.created_at)
                                .locale('fa')
                                .format(' YYYY/MM/DD HH:mm')}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            background: 'rgb(234, 211, 211,0.2)',
                            padding: '7px 5px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderRadius: '4px',
                        }}
                    >
                        <Tooltip title={props.data.responder_name}>
                            <Typography>{ellipsisText(props.data.responder_name, 20)}</Typography>
                        </Tooltip>

                        <Box sx={{display: 'flex', gap: '5px'}}>
                            <Typography variant="button">{props.data.responder_phone}</Typography>
                            <CopyToClipboard
                                text={`9${props.data.responder_phone}`}
                                onCopy={() =>
                                    toast.success(
                                        '"' + `9${props.data.responder_phone}` + '" کپی شد',
                                    )
                                }
                            >
                                <MdOutlineContentCopy
                                    style={{
                                        color: '#00AACC',
                                        fontSize: '20px',
                                        cursor: 'pointer',
                                    }}
                                />
                            </CopyToClipboard>
                        </Box>
                    </Box>
                    {(props.data.linked_user || props.data.dio_date) && <Box
                        sx={{
                            background: 'rgb(6, 239, 239,0.05)',
                            padding: '7px 5px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderRadius: '4px',
                        }}
                    >
                        {props.data.linked_user && <IconWithText
                            text={`${props.data.linked_user?.first_name} ${props.data.linked_user?.last_name}`}/>}
                        {props.data?.dio_date && <IconWithText text={props.data.dio_date} date/>}
                    </Box>}
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                            {/*    <ContactPhoneIcon color="secondary" sx={{ fontSize: '16px' }} />*/}
                            {/*<Typography sx={{ display: 'flex', gap: '10px', fontSize: '12px' }}>*/}
                            {/*    {ellipsisText('محمدمهدی پورطاهر همدانی', 35)}*/}
                            {/*</Typography>*/}
                        </Box>
                        {props.data.editable ? (
                            <SaveAsIcon
                                onClick={() => {
                                    dispatch(setRecordId(props.data.id));
                                    props.setTabValue('1');
                                }}
                                sx={{
                                    border: '0.895238px solid #EAD3D3',
                                    color: '#2276D8',
                                    cursor: 'pointer',
                                    width: '35px',
                                    height: '100%',
                                    borderRadius: '4px',
                                    padding: '6px',
                                    // background: '',
                                }}
                            />) : <></>}
                    </Box>
                </Box>
            </Box>
            <Modal
                open={showInformationModal}
                onClose={() => setShowInformationModal(false)}
                containerSx={{minWidth: '850px', background: '#D8D8D8', padding: '12px 16px'}}
            >
                <InformationModal
                    setShowInformationModal={setShowInformationModal}
                    data={props.data}
                    formFields={props.formFields}
                    setTabValue={props.setTabValue}
                    cartMode={true}
                />
            </Modal>
        </>
    );
};
