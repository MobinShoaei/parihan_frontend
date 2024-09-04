import {Box, Drawer, Typography, useMediaQuery} from '@mui/material';
import moment from 'jalali-moment'
import React, {useEffect, useState} from 'react';
import {HttpMethod, sendRequest} from '../../utils/axios';
import {BackendUrls} from '../../utils/backend-urls';
import {CallType} from '../common/CallType';
import {TableBox} from '../data-display/TableBox';
import theme from '../theme';
import {MobileTable} from '../common/MobileTable';
import AudioPlayer from '../data-display/AudioPlayer';
import {BiCommentCheck} from 'react-icons/bi';
import 'react-audio-player-pro/dist/style.css';
import Modal from '../common/Modal';
import {VoiceComment} from './VoiceComment';
import AudioWaveform from '../common/WaveForm';
import {CommentModal} from '../comment/CommentModal';
import {useSelector} from "react-redux";
import {State} from "../../redux/reducers";

export type CallApiResponseType = {
    id: number;
    project: string;
    calldate: string;
    // as second
    billsec: number;
    user_phone: string;
    url: string;
    operator: string;
    call_type: string;
    comment: string;
};

export const audioElement = (url: string) => (
    <Box
        sx={{
            '& .audio-tag': {
                maxWidth: '100%',
            },
        }}
    >
        <audio controls className="audio-tag" preload="none">
            <source src={url} type="audio/ogg"/>
            <source src={url} type="audio/mpeg"/>
        </audio>
    </Box>
);

export const CallTable: React.FC<{ id: number; isImployer?: boolean }> = (props) => {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [loading, setLoading] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);
    const [calls, setCalls] = useState<CallApiResponseType[]>();
    const [searchValue, setSearchValue] = useState<string>('');
    const [rerender, setRerender] = useState<boolean>(false);
    const [showMessageModal, setShowMessageModal] = useState<boolean>(false);
    const [callId, setCallId] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [columns, setColumns] = useState<string[]>([
        'ردیف',
        'تاریخ و زمان تماس',
        'نام اپراتور',
        'شماره کاربر',
        'مدت زمان مکالمه',
        'نوع تماس',
        'فایل ضبط شده',
    ])

    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const accessCall = useSelector((state: State) => state.accesses).includes("call_access");

    useEffect(() => {
        if (!accessCall) columns[columns.length - 1] = 'نظرات'
    }, [accessCall])

    useEffect(() => {
        if (!props.isImployer) {
            columns.splice(5, 0, 'نام کسب وکار');
        }
    }, [props.isImployer])


    useEffect(() => {
        setLoading(true);
        setPage(page);
        let params: { [key: string]: string | number } = {
            project: props.id,
            page: page,
            page_size: pageSize,
        };
        if (searchValue) {
            params.search = searchValue;
        }

        sendRequest<{
            results: CallApiResponseType[];
            count: number;
            next: null | string;
            previous: null | string;
        }>(BackendUrls.call, HttpMethod.GET, params)
            .then((res) => {
                setCalls(res.data.results);
                setCount(res.data.count);
            })
            .catch(() => {
            })
            .finally(() => {
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.id, rerender, page, pageSize]);

    function data(item: CallApiResponseType, index: number) {
        const data = [
            {text: String((page - 1) * pageSize + index + 1)},
            {
                text: moment(item.calldate).format('HH:mm jYYYY-jMM-jDD '),
            },
            {text: item.operator},
            {text: item.user_phone},
            {
                text: moment('00:00:00', 'HH:mm:ss')
                    .locale('fa')
                    .add('seconds', item.billsec)
                    .format('HH:mm:ss'),
            },

            {text: <CallType type={item.call_type}/>},
            {
                text:
                    item.url == 'DELETED' ? (
                        <Typography color="error">حذف شده</Typography>
                    ) : (
                        <Box sx={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            {accessCall && <AudioPlayer url={item.url}/>}
                            {/* <AudioWaveform /> */}
                            {
                                <BiCommentCheck
                                    style={{
                                        color: '#fff',
                                        cursor: 'pointer',
                                        width: '40px',
                                        height: '100%',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        background: '#00AACC',
                                    }}
                                    onClick={() => {
                                        setComment(item.comment);
                                        setShowMessageModal((r) => !r);
                                        setCallId(item.id);
                                    }}
                                />
                            }
                        </Box>
                    ),
            },
        ];

        if (!props.isImployer) {
            data.splice(5, 0, {
                text: item.project,
            });
        }

        return data;
    }

    return (
        <Box>
            {matches ? (
                <TableBox
                    setSearchValue={setSearchValue}
                    setRerender={setRerender}
                    searchValue={searchValue}
                    headerRow={columns.map((item) => ({
                        text: item,
                        sx: {
                            color: '#959595',
                        },
                    }))}
                    align="center"
                    pagination={{
                        page,
                        count,
                        rowsPerPage: 10,
                    }}
                    loading={loading}
                    rows={calls?.map((item, index) => {
                        return {
                            options: data(item, index),
                        };
                    })}
                    setPage={setPage}
                    setPageSize={setPageSize}
                    pageSize={pageSize}
                />
            ) : (
                <MobileTable
                    calls={calls}
                    pagination={{
                        page,
                        count,
                        rowsPerPage: 10,
                    }}
                    loading={loading}
                    setPage={setPage}
                    setPageSize={setPageSize}
                    pageSize={pageSize}
                />
            )}
            <Drawer
                anchor={'right'}
                open={showMessageModal}
                onClose={() => setShowMessageModal(false)}
                sx={{p: 0, width: '450px'}}
            >
                <CommentModal
                    setShowMessageModal={setShowMessageModal}
                    callTable
                    record_id={callId}
                />
            </Drawer>
        </Box>
    );
};
