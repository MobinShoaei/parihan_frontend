import { Divider, Drawer, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState, Dispatch, SetStateAction, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProjectsDrawer } from '../../redux/actions/projects_drawer';
import { setProjectId } from '../../redux/actions/project_id';
import { State } from '../../redux/reducers';
import { sendRequest } from '../../utils/axios';
import { BackendUrls } from '../../utils/backend-urls';
import { mergeArraysById } from '../../utils/functions';
import { CustomerSkeleton } from '../common/CustomerSkeleton';
import { CustomerCard } from './CustomerCard';
import { UnreadMessageCountsType, unreadMessageTypes } from './Dashboard';
import { setRecordId } from '../../redux/actions/record_id';

interface CustomersProps {
    setChatDrawerVisible: Dispatch<SetStateAction<boolean>>;
    unread_message_counts: UnreadMessageCountsType[];
    isImployer?: boolean;
}

export type ProjectListApiResponse = {
    id: number;
    name: string;
    logo: string;
    count: unreadMessageTypes;
    is_active: boolean;
};

export const Customers = (props: CustomersProps) => {
    const dispatch = useDispatch();
    // state
    const [data, setData] = useState<ProjectListApiResponse[]>();
    const [customers, setCustomers] = useState<ProjectListApiResponse[]>();
    const [loading, setLoading] = useState<boolean>(true);

    const projectsDrawerVisible = useSelector((state: State) => state.projectsDrawerVisible);
    const projectId = useSelector((state: State) => state.projectId);

    useEffect(() => {
        sendRequest(BackendUrls.project)
            .then((response) => {
                setCustomers(response.data.results);
                const temp = mergeArraysById(
                    response.data.results,
                    props.unread_message_counts,
                    'id',
                );

                setData(temp);
                if (response.data.results.length > 0 && !projectId) {
                    dispatch(setProjectId(response.data.results[0].id));
                }
            })
            .catch((error) => {})
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (customers) {
            const temp = mergeArraysById(customers, props.unread_message_counts, 'id');
            setData(temp);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.unread_message_counts]);

    const handleDrawerClose = () => {
        dispatch(setProjectsDrawer(false));
    };

    const Customers = (): JSX.Element => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    gap: '15px',
                    overflowX: 'auto',
                    width: '100%',
                    flexDirection: 'column',
                    height: 'calc( 100vh - 100px )',
                }}
            >
                {data?.map((item, id) => {
                    return (
                        <CustomerCard
                            count={item.count}
                            name={item.name}
                            logo={item.logo}
                            key={id.toString()}
                            disabled={!item.is_active}
                            is_active={item.id === projectId}
                            onClick={(e) => {
                                item.is_active && dispatch(setProjectId(item.id));
                                dispatch(setProjectsDrawer(false));
                                dispatch(setRecordId(0));
                            }}
                            setChatDrawerVisible={props.setChatDrawerVisible}
                        />
                    );
                })}
            </Box>
        );
    };

    return (
        <Box
            sx={{
                display: { sm: 'flex', xs: 'none' },
                flexDirection: 'column',
                gap: '8px',
                background: '#fff',
                boxShadow: ' 0px 4px 15px rgba(0, 0, 0, 0.25)',
                padding: '25px 10px ',
            }}
        >
            {!loading ? (
                <Customers />
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        gap: '15px',
                        overflowX: 'auto',
                        width: '100%',
                        flexDirection: 'column',
                    }}
                >
                    {[...Array(3)].map((item, key) => {
                        return <CustomerSkeleton key={key} />;
                    })}
                </Box>
            )}
            <Drawer open={projectsDrawerVisible} onClose={handleDrawerClose} dir="rtl">
                <Box sx={{ p: '10px 5px' }}>
                    <Typography
                        sx={{
                            fontSize: '16px',
                            color: '#E53F4C',
                            fontWeight: '700',
                            textAlign: 'center',
                        }}
                    >
                        همکار
                    </Typography>
                    <Divider sx={{ mb: '10px' }} />
                    <Customers />
                </Box>
            </Drawer>
        </Box>
    );
};
