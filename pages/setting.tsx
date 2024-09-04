import React from 'react';
import type {ReactElement} from 'react';
import {NextPageWithLayout} from './_app';
import {PageProvider} from '../src/common/PageProvider';
import {ConstLayout} from '../src/layout/Layout';
import {Setting} from '../src/setting/Setting';
import {GetServerSideProps} from "next";
import {serverSideFetch} from "../utils/axios";
import {ProjectApiResponse} from "../src/dashboard/Dashboard";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query.id;
    if (id) return await serverSideFetch(context, `/main/project/${id}/`);
    else return await serverSideFetch(context, `/main/project/`);
};

const SettingPage: NextPageWithLayout = (props: any) => {

    return (
        <PageProvider title="همکار | تنظیمات ">
            <Setting data={props.data.results ? props.data.results[0] : props.data}/>
        </PageProvider>
    );
};

SettingPage.getLayout = function getLayout(page: ReactElement) {
    return <ConstLayout pageBackgroundColor={'#FAFAFA'}>{page}</ConstLayout>;
};

export default SettingPage;
