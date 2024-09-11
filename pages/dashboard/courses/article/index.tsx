import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '../../../_app';
import { PageProvider } from '../../../../src/common/PageProvider';
import { Courses } from '../../../../src/dashboard/courses';
import { ConstLayout } from '../../../../src/layout/Layout';

const ScorePage: NextPageWithLayout = (props) => {
    return (
        <PageProvider title="پریحان انگلیش | آموزش و دوره‌ها">
            <Courses />
        </PageProvider>
    );
};
ScorePage.getLayout = function getLayout(page: ReactElement) {
    return <ConstLayout pageTitle="آموزش و دوره‌ها">{page}</ConstLayout>;
};
export default ScorePage;
