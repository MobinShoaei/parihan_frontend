import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '../../_app';
import { PageProvider } from '../../../src/common/PageProvider';
import { ConstLayout } from '../../../src/layout/Layout';
import { SeenWords } from '../../../src/dashboard/courses/SeenWords';

const SeeLessonsPage: NextPageWithLayout = (props) => {
    return (
        <PageProvider title="پریحان انگلیش | آموزش و دوره‌ها">
            <SeenWords />
        </PageProvider>
    );
};
SeeLessonsPage.getLayout = function getLayout(page: ReactElement) {
    return <ConstLayout pageTitle="آموزش و دوره‌ها">{page}</ConstLayout>;
};
export default SeeLessonsPage;
