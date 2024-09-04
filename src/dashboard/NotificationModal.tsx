import { TabContext, TabPanel } from '@mui/lab';
import { Alert, Box, Tab, Tabs } from '@mui/material';
import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { HttpMethod, sendRequest } from '../../utils/axios';
import { BackendUrls } from '../../utils/backend-urls';
import { NotifItem } from '../common/NotifItem';

export type notifType = {
    is_read: boolean;
    project: { id: number; name: string; logo: string };
    created_at: string;
    record: number;
    text: string;
};

interface NotificationModalProps {
    setNotifModal: Dispatch<SetStateAction<boolean>>;
}

export const NotificationModal = (props: NotificationModalProps) => {
    const [tabValue, setTabValue] = useState<string>('1');
    const [notifs, setNotifs] = useState<notifType[]>([]);

    const handleChange = (event: React.SyntheticEvent, newTabValue: string) => {
        setTabValue(newTabValue);
    };

    useEffect(() => {
        let params = {};
        if (tabValue == '1') params = { is_read: false };
        sendRequest(BackendUrls.notification, HttpMethod.GET, params).then((res) =>
            setNotifs(res.data.results),
        );
    }, [tabValue]);

    return (
        <Box sx={{ direction: 'ltr' }}>
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                    >
                        <Tab label="خوانده نشده‌ها" value="1" />
                        <Tab label="همه اعلان‌ها" value="2" />
                    </Tabs>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px',
                        minHeight: '250px',
                        p: '20px',
                    }}
                >
                    {notifs.map((notif, index) => {
                        return (
                            <NotifItem
                                key={index}
                                read={notif.is_read}
                                notif={notif}
                                setNotifModal={props.setNotifModal}
                            />
                        );
                    })}
                    {notifs.length == 0 && (
                        <Alert severity="warning">اعلان‌ خوانده نشده ندارید</Alert>
                    )}
                </Box>
            </TabContext>
        </Box>
    );
};
