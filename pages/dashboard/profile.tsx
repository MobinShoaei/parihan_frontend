import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import { Dashboard } from '../../src/dashboard/Dashboard';
import { GetServerSideProps } from 'next';
import { PageProvider } from '../../src/common/PageProvider';
import { ConstLayout } from '../../src/layout/Layout';

const ProfilePage: NextPageWithLayout = (props) => {
    return (
        <PageProvider title="همکار | پنل کاربری">
            <Dashboard />
        </PageProvider>
    );
};
ProfilePage.getLayout = function getLayout(page: ReactElement) {
    return <ConstLayout>{page}</ConstLayout>;
};
export default ProfilePage;
