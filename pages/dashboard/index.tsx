import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import { Dashboard } from '../../src/dashboard/Dashboard';
import { GetServerSideProps } from 'next';
import { PageProvider } from '../../src/common/PageProvider';
import { ConstLayout } from '../../src/layout/Layout';
import { DashboardIndex } from '../../src/dashboard/index/Index';

const DashboardPage: NextPageWithLayout = (props) => {
    return (
        <PageProvider title="پریحان انگلیش | داشبورد">
            <DashboardIndex />
        </PageProvider>
    );
};
DashboardPage.getLayout = function getLayout(page: ReactElement) {
    return <ConstLayout pageTitle="داشبورد">{page}</ConstLayout>;
};
export default DashboardPage;
