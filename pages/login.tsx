import type {GetServerSideProps, NextPage} from 'next';
import Login from '../src/auth/Login';
import {PageProvider} from '../src/common/PageProvider';

const LoginPage: NextPage = () => {
    return (
        <PageProvider title="سامانه مدیریت همکار | ورود">
            <Login/>
        </PageProvider>
    );
};

export default LoginPage;
