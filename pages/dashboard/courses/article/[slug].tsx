import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '../../../_app';
import { PageProvider } from '../../../../src/common/PageProvider';
import { Courses } from '../../../../src/dashboard/courses';
import { ConstLayout } from '../../../../src/layout/Layout';
import { Article } from '../../../../src/dashboard/courses/article';
import { SingleArticle } from '../../../../src/dashboard/courses/article/SingleArticle';

const SingleArticlePage: NextPageWithLayout = (props) => {
    return (
        <PageProvider title="پریحان انگلیش | آموزش و دوره‌ها">
            <SingleArticle />
        </PageProvider>
    );
};
SingleArticlePage.getLayout = function getLayout(page: ReactElement) {
    return <ConstLayout pageTitle="آموزش و دوره‌ها">{page}</ConstLayout>;
};
export default SingleArticlePage;
