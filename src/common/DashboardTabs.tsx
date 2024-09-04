import React from 'react';
import {Tab, Tabs} from '@mui/material';
import {useDispatch} from "react-redux";
import {setRecordId} from "../../redux/actions/record_id";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import CallIcon from '@mui/icons-material/Call';
import InsertChartOutlinedRoundedIcon from '@mui/icons-material/InsertChartOutlinedRounded';
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined';

interface DashboardTabsProps {
    tabId: string;
    onChange: any;
}

export const DashboardTabs = (props: DashboardTabsProps) => {

    const dispatch = useDispatch();

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
                '& button': {fontSize: {md: '14px', xs: '12px'}, minHeight: '40px'},
                '& button svg': {
                    width: '20px',
                    height: '20px',
                }

            }}
            onClick={() => dispatch(setRecordId(0))}
        >
            <Tab label="فرم ثبت اطلاعات" value="1" iconPosition="start" icon={<ArticleOutlinedIcon/>}/>
            <Tab label="جدول اطلاعات ثبت‌شده" value="2" iconPosition="start" icon={<RecordVoiceOverIcon/>}/>
            <Tab label="جدول تماس‌ها" value="3" iconPosition="start" icon={<CallIcon/>}/>
            <Tab label="داشبورد" value="4" iconPosition="start" icon={<InsertChartOutlinedRoundedIcon/>}/>
            {/*<Tab label="مخاطبین" value="5" iconPosition="start" icon={<PortraitOutlinedIcon/>}/>*/}

        </Tabs>
    );
};
