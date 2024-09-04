import React from 'react';
import type {ReactElement} from 'react';
import {NextPageWithLayout} from './_app';
import {Plans} from '../src/dashboard/Plans';
import {PageProvider} from '../src/common/PageProvider';
import {ConstLayout} from '../src/layout/Layout';

const PlansPage: NextPageWithLayout = (props) => {
    return (
        <PageProvider title="همکار | طرح‌های اشتراک">
            <Plans/>
        </PageProvider>
    );
};

PlansPage.getLayout = function getLayout(page: ReactElement) {
    return <ConstLayout>{page}</ConstLayout>;
};

export default PlansPage;
