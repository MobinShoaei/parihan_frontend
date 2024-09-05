import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import { Dashboard } from '../../src/dashboard/Dashboard';
import { GetServerSideProps } from 'next';
import { PageProvider } from '../../src/common/PageProvider';
import { ConstLayout } from '../../src/layout/Layout';
import { Profile } from '../../src/dashboard/profile';

const ProfilePage: NextPageWithLayout = (props) => {
    return (
        <PageProvider title="پریحان انگلیش | اطلاعات کاربری">
            <Profile />
        </PageProvider>
    );
};
ProfilePage.getLayout = function getLayout(page: ReactElement) {
    return <ConstLayout pageTitle="اطلاعات کاربری">{page}</ConstLayout>;
};
export default ProfilePage;
