import React from 'react';
import {Tab, Tabs} from '@mui/material';
import HttpsIcon from '@mui/icons-material/Https';
import {useSelector} from 'react-redux';
import {State} from '../../redux/reducers';
import {ProjectApiResponse} from '../dashboard/Dashboard';

interface SettingTabsProps {
    tabId: string;
    onChange: any;
    accesses: string[]
}

export const SettingTabs = (props: SettingTabsProps) => {
    const access = useSelector((state: State) => state.accesses);
    return (
        <Tabs
            value={props.tabId}
            onChange={props.onChange}
            indicatorColor="secondary"
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
            textColor="inherit"
            sx={{
                borderBottom: '1px solid #EAD3D3',
                '& button': {fontSize: {md: '14px', xs: '12px'}},
            }}
        >
            <Tab
                label="مدیریت کاربران"
                value="1"
                disabled={!props.accesses.includes('user_access')}
                icon={!props.accesses.includes('user_access') ? <HttpsIcon/> : <></>}
                iconPosition="start"
            />
            <Tab
                label="مدیریت فرم"
                value="2"
                disabled={!props.accesses.includes('form_access')}
                icon={!props.accesses.includes('form_access') ? <HttpsIcon/> : <></>}
                iconPosition="start"
            />
            <Tab
                label="سوالات متداول"
                value="3"
                disabled={!props.accesses.includes('faq_access')}
                icon={!props.accesses.includes('faq_access') ? <HttpsIcon/> : <></>}
                iconPosition="start"
            />
            <Tab
                label="متن مکالمه"
                value="4"
                disabled={!props.accesses.includes('call_text_access')}
                icon={!props.accesses.includes('call_text_access') ? <HttpsIcon/> : <></>}
                iconPosition="start"
            />
            <Tab
                label="مدیریت وضعیت‌ها"
                value="5"
                iconPosition="start"
                disabled={!props.accesses.includes('tag_access')}
                icon={!props.accesses.includes('tag_access') ? <HttpsIcon/> : <></>}
            />
            <Tab
                label="اطلاعات پایه کسب‌وکار"
                value="6"
                disabled={!props.accesses.includes('information_access')}
                icon={!props.accesses.includes('information_access') ? <HttpsIcon/> : <></>}
                iconPosition="start"
            />
        </Tabs>
    );
};
