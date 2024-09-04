import {Divider, Pagination, Typography} from '@mui/material';
import {Box} from '@mui/system';
import React, {Dispatch, ReactNode, SetStateAction} from 'react';
import {CallType} from './CallType';
import jmoment from 'jalali-moment';
import {CallApiResponseType} from '../dashboard/CallTable';
import AudioPlayer from '../data-display/AudioPlayer';
import {CustomPagination} from './CustomPagination';

export interface TableBoxProps {
    pagination?: {
        page: number;
        count: number;
        rowsPerPage: number;
    };
    calls?: CallApiResponseType[];
    loading?: boolean;
    setPage: Dispatch<SetStateAction<number>>;
    setPageSize: Dispatch<SetStateAction<number>>
    pageSize: number
}

export const MobileTable: React.FC<TableBoxProps> = (props) => {
    const MobileRow = (props: { children: ReactNode }) => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                }}
            >
                {props.children}
            </Box>
        );
    };

    return (
        <Box sx={{background: '#fff', border: '0.678571px solid #EAD3D3', borderRadius: '4px'}}>
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: 'secondary.light',
                    padding: '10px ',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    alignItems: 'start',
                }}
            >
                <Typography sx={{fontSize: '12px'}} variant="caption">
                    جدول تماس‌ها
                </Typography>
            </Box>
            {props.loading ? (
                <Box
                    sx={{
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                    }}
                />
            ) : (
                props.calls?.map((item, index) => {
                    return (
                        <>
                            <Box
                                sx={{
                                    display: 'flex',
                                    padding: '15px 0',
                                }}
                            >
                                <Typography
                                    sx={{
                                        borderRight: 1,
                                        borderColor: 'secondary.light',
                                        padding: '0 20px',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        display: 'flex',
                                    }}
                                >
                                    {props.pagination &&
                                    String((props.pagination.page - 1) * 7 + index + 1)}
                                </Typography>
                                <Box
                                    sx={{
                                        width: '100%',
                                        padding: '0 16px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '12px',
                                    }}
                                >
                                    <MobileRow>
                                        <Typography
                                            sx={{
                                                fontWeight: 'bold',
                                                fontSize: '15px',
                                            }}
                                        >
                                            {item.user_phone}
                                        </Typography>

                                        <CallType type={item.call_type}/>
                                    </MobileRow>
                                    <MobileRow>
                                        <Typography variant="body2">تاریخ و زمان تماس</Typography>
                                        <Typography
                                            sx={{
                                                color: '#2B2828',
                                                fontSize: '14px',
                                            }}
                                        >
                                            {jmoment(item.calldate)
                                                .locale('fa')
                                                .format('HH:mm:ss YYYY/MM/DD')}
                                        </Typography>
                                    </MobileRow>
                                    {item.url == 'DELETED' ? (
                                        <Typography color="error">حذف شده</Typography>
                                    ) : (
                                        <AudioPlayer url={item.url}/>
                                    )}
                                </Box>
                            </Box>
                            <Divider sx={{borderColor: 'secondary.light'}}/>
                        </>
                    );
                })
            )}
            {props.pagination && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 3,
                        gap: '10px',
                        '& p': {
                            textAlign: 'center',
                            fontSize: '14px',
                        },
                        justifyContent: {sm: 'space-between', xs: 'center'},
                    }}
                >
                    <Typography>{`نمایش رکوردهای ${
                        props.pagination.page == 1 ? 1 : (props.pagination.page - 1) * 7 + 1
                    }-${props.pagination.page * 7} از مجموع ${
                        props.pagination.count
                    } تماس ضبط شده`}</Typography>
                    <CustomPagination
                        count={props.pagination.count}
                        page={props.pagination.page}
                        setPage={props.setPage}
                        setPageSize={props.setPageSize}
                        pageSize={props.pageSize}
                    />
                </Box>
            )}
        </Box>
    );
};
