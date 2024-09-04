import {Box, Button, CircularProgress, Typography} from '@mui/material';
import Image from 'next/image';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {HttpMethod, sendRequest} from '../../utils/axios';
import {BackendUrls} from '../../utils/backend-urls';
import {catchRequestError} from '../../utils/functions';
import jwt_decode from 'jwt-decode';
import {InformationFilter} from '../data-display/InformationFilter';
import {formFieldsType} from './InformationForm';
import {CustomPagination} from '../common/CustomPagination';
import {getToken} from '../../utils/cookies';
import Modal from '../common/Modal';
import Upload from '../inputs/Upload';
import {toast} from 'react-toastify';
import {LoadingButton} from '@mui/lab';
import {SelectedFooter} from './SelectedFooter';
import {useSelector} from "react-redux";
import {State} from "../../redux/reducers";

type TableFooterProps = {
    count: number;
    formFields: formFieldsType[];
    setFilterItems: Dispatch<SetStateAction<{ [key: string]: number | string | boolean }>>;
    setPage: Dispatch<SetStateAction<number>>;
    page: number;
    projectId: number;
    tags: { id: number; title: string }[];
    checkedItems: number[];
    setCheckedItems: Dispatch<SetStateAction<number[]>>;
    setReload: Dispatch<SetStateAction<boolean>>;
    setPageSize: Dispatch<SetStateAction<number>>
    pageSize: number
};

export const TableFooter: React.FC<TableFooterProps> = (props) => {
    const [exportLoading, setExportLoading] = useState<boolean>(false);
    const [importExelModalVisiblity, setImportExelModalVisiblity] = useState<boolean>(false);
    const [importLoading, setImportLoading] = useState<boolean>(false);
    const [files, setFiles] = useState<File[]>([]);

    const token = getToken();
    const profile: any = jwt_decode(token !== null ? token : '');
    const importCSV = useSelector((state: State) => state.accesses).includes("import_data")

    const formExport = () => {
        setExportLoading(true);
        sendRequest<{ download_url: string }>(BackendUrls.export, HttpMethod.POST, {
            form: props.projectId,
        })
            .then((res) => {
                window.open(res.data.download_url);
            })
            .catch((err) => catchRequestError)
            .finally(() => {
                setExportLoading(false);
            });
    };

    const importExlHandler = () => {
        if (files.length > 0) {
            setImportLoading(true);
            let formData = new FormData();
            formData.append('file', files[0]);
            formData.append('project', props.projectId.toString());
            sendRequest(BackendUrls.import_excel, HttpMethod.POST, formData)
                .then((res) => {
                    toast.success(res.data.detail);
                    setImportExelModalVisiblity(false);
                })
                .catch(catchRequestError)
                .finally(() => setImportLoading(false));
        } else {
            toast.error('حداقل یک فایل انتخاب کنید');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                height: '100%',
                alignItems: 'center',
                flexDirection: {sm: 'row', xs: 'column'},
                background: props.checkedItems.length > 0 ? '#35BBD6' : 'unset',
            }}
        >
            {props.checkedItems.length > 0 ? (
                <SelectedFooter
                    selectedCount={props.checkedItems.length}
                    selectedItems={props.checkedItems}
                    setCheckedItems={props.setCheckedItems}
                    setReload={props.setReload}
                    projectId={props.projectId}
                />
            ) : (
                <React.Fragment>
                    <Box
                        sx={{
                            padding: '12px 15px',
                            width: '100%',
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                            justifyContent: {sm: 'start', xs: 'center'},
                        }}
                    >
                        <InformationFilter
                            formFields={props.formFields}
                            setFilterItems={props.setFilterItems}
                            tags={props.tags}
                        />

                        {(profile?.role == 'employer' || profile?.role == 'admin' || profile?.role == 'supervisor') &&
                        <Image
                            src={'/images/exel.png'}
                            width={37}
                            height={37}
                            alt=""
                            style={{cursor: 'pointer'}}
                            onClick={formExport}
                        />
                            // ) : (
                            //     <Box sx={{display: 'flex'}}>
                            //         <CircularProgress size={20}/>
                            //     </Box>
                        }

                        <Image
                            src={'/images/import-csv.png'}
                            width={37}
                            height={37}
                            alt=""
                            style={profile.role == 'admin' || importCSV ? {
                                cursor: 'pointer',
                                filter: 'grayscale(0)'
                            } : {cursor: 'not-allowed', filter: 'grayscale(1)'}}
                            onClick={() => (profile.role == 'admin' || importCSV) && setImportExelModalVisiblity(true)}
                        />

                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <CustomPagination
                            count={props.count}
                            page={props.page}
                            setPage={props.setPage}
                            setPageSize={props.setPageSize}
                            pageSize={props.pageSize}
                        />

                    </Box>
                </React.Fragment>
            )}
            <Modal
                open={importExelModalVisiblity}
                onClose={() => setImportExelModalVisiblity(false)}
            >
                <Box sx={{direction: 'ltr'}}>
                    <Upload maxFiles={1} setFiles={setFiles}/>
                    <LoadingButton
                        variant="contained"
                        onClick={importExlHandler}
                        sx={{mt: '10px'}}
                        loading={importLoading}
                    >
                        ارسال
                    </LoadingButton>
                </Box>
            </Modal>
        </Box>
    );
};
