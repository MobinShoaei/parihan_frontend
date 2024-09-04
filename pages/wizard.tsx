import React, {ReactElement} from 'react'
import {NextPageWithLayout} from "./_app";
import {PageProvider} from "../src/common/PageProvider";
import {ConstLayout} from "../src/layout/Layout";
import {WizardWrapper} from "../src/wizard";


const WizardPage: NextPageWithLayout = (props) => {
    return (
        <PageProvider title="همکار | پنل کاربری">
            <WizardWrapper/>
        </PageProvider>
    );
};
// WizardPage.getLayout = function getLayout(page: ReactElement) {
//     return <ConstLayout>{page}</ConstLayout>;
// };
export default WizardPage;
