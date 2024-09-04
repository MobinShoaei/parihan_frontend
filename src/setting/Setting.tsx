import {Alert, TabContext, TabPanel} from '@mui/lab';
import {Box} from '@mui/material';
import React, {useEffect, useState} from 'react';
import styles from '../../styles/const.module.css';
import {SettingTabs} from '../common/SettingTabs';
import {CallTextManager} from './call-text/CallTextManager';
import {FaqManager} from './faq/FaqManager';
import {FormManager} from './form-manager/FormManager';
import {TagManager} from './tags/TagManager';
import {UsersManager} from './UsersManager';
import {BaseInformationsManager} from './base-informations/BaseInformationsManager';

import {ProjectApiResponse} from '../dashboard/Dashboard';
import {useDispatch} from "react-redux";
import {setProjectId} from "../../redux/actions/project_id";

export const Setting = (props: any) => {
    const [project, setProject] = useState<ProjectApiResponse>();
    const [tabValue, setTabValue] = useState<string>('');

    const dispatch = useDispatch()

    const tabHandleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };

    const dict: { [key: string]: string } = {
        user_access: '1',
        form_access: '2',
        faq_access: '3',
        call_text_access: '4',
        tag_access: '5',
        information_access: '6',
    };

    useEffect(() => {
        tabValueHandler(props.data);
        setProject(props.data)
        dispatch(setProjectId(props.data.id))
    }, [props.data]);

    const tabValueHandler = (data: { [key: string]: string | boolean | any }) => {
        for (let item of Object.keys(dict)) {
            if (data.accesses.includes(item)) {
                setTabValue(dict[item]);
                break;
            }
        }
    };

    return (
        <Box className={styles.wrapper} sx={{width: '100%'}}>
            <TabContext value={tabValue}>
                <SettingTabs tabId={tabValue} onChange={tabHandleChange} accesses={props.data.accesses}/>
                <TabPanel
                    value="1"
                    sx={{
                        padding: {md: '19px 13px', xs: '13px 9px'},
                    }}
                >
                    <UsersManager/>
                </TabPanel>
                <TabPanel
                    value="2"
                    sx={{
                        padding: {md: '19px 13px', xs: '13px 9px'},
                        height: '90%',
                    }}
                >
                    <FormManager project={project}/>
                </TabPanel>
                <TabPanel
                    value="3"
                    sx={{
                        padding: {md: '19px 13px', xs: '13px 9px'},
                    }}
                >
                    <FaqManager/>
                </TabPanel>
                <TabPanel
                    value="4"
                    sx={{
                        padding: {md: '19px 13px', xs: '13px 9px'},
                    }}
                >
                    <CallTextManager/>
                </TabPanel>
                <TabPanel
                    value="5"
                    sx={{
                        padding: {md: '19px 13px', xs: '13px 9px'},
                    }}
                >
                    <TagManager/>
                </TabPanel>
                <TabPanel
                    value="6"
                    sx={{
                        padding: {md: '19px 13px', xs: '13px 9px'},
                    }}
                >
                    <BaseInformationsManager/>
                </TabPanel>
                {props.data.accesses.length < 0 && (
                    <Alert severity="error">
                        شما دسترسی لازم برای انجام تنظیمات را ندارید! درصورت نیاز با پشتبانی تماس
                        بگیرید.
                    </Alert>
                )}
            </TabContext>
        </Box>
    );
};
