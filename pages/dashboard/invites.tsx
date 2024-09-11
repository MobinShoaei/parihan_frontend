import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import { Dashboard } from '../../src/dashboard/Dashboard';
import { GetServerSideProps } from 'next';
import { PageProvider } from '../../src/common/PageProvider';
import { ConstLayout } from '../../src/layout/Layout';
import { Profile } from '../../src/dashboard/profile';
import { Invite } from '../../src/dashboard/invite';

const InvitesPage: NextPageWithLayout = (props) => {
    return (
        <PageProvider title="پریحان انگلیش | دعوت از دوستان">
            <Invite />
        </PageProvider>
    );
};
InvitesPage.getLayout = function getLayout(page: ReactElement) {
    return <ConstLayout pageTitle="دعوت از دوستان">{page}</ConstLayout>;
};
export default InvitesPage;
