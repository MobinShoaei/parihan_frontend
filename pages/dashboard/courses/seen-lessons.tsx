import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '../../_app';
import { PageProvider } from '../../../src/common/PageProvider';
import { ConstLayout } from '../../../src/layout/Layout';
import { Courses } from '../../../src/dashboard/courses';
import { SeenLessons } from '../../../src/dashboard/courses/SeenLessons';

const SeeLessonsPage: NextPageWithLayout = (props) => {
    return (
        <PageProvider title="پریحان انگلیش | آموزش و دوره‌ها">
            <SeenLessons />
        </PageProvider>
    );
};
SeeLessonsPage.getLayout = function getLayout(page: ReactElement) {
    return <ConstLayout pageTitle="آموزش و دوره‌ها">{page}</ConstLayout>;
};
export default SeeLessonsPage;
