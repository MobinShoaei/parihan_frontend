import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import { PageProvider } from '../../src/common/PageProvider';
import { ConstLayout } from '../../src/layout/Layout';
import { MyScors } from '../../src/dashboard/my-scors';

const ScorePage: NextPageWithLayout = (props) => {
    return (
        <PageProvider title="پریحان انگلیش | صندوق امتیازات من">
            <MyScors />
        </PageProvider>
    );
};
ScorePage.getLayout = function getLayout(page: ReactElement) {
    return <ConstLayout pageTitle="صندوق امتیازات من">{page}</ConstLayout>;
};
export default ScorePage;
