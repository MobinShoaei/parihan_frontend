import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '../../../../_app';
import { PageProvider } from '../../../../../src/common/PageProvider';
import { ConstLayout } from '../../../../../src/layout/Layout';
import { Words } from '../../../../../src/dashboard/courses/general-cours/Words';

const GeneralCoursPage: NextPageWithLayout = (props) => {
    return (
        <PageProvider title="پریحان انگلیش | دوره عمومی زبان انگلیسی">
            <Words />
        </PageProvider>
    );
};
GeneralCoursPage.getLayout = function getLayout(page: ReactElement) {
    return <ConstLayout pageTitle="دوره عمومی زبان انگلیسی">{page}</ConstLayout>;
};
export default GeneralCoursPage;
