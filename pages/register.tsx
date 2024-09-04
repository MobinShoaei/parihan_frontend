import type {NextPage} from 'next';
import {PageProvider} from '../src/common/PageProvider';
import Register from "../src/auth/register/Register";


const RegisterPage: NextPage = () => {
    return (
        <PageProvider title="سامانه مدیریت همکار | ثبت نام">
            <Register/>
        </PageProvider>
    );
};

export default RegisterPage;
