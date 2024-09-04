import type {NextPage} from 'next';
import {PageProvider} from '../src/common/PageProvider';
import Register from "../src/auth/register/Register";
import {ForgetPassword} from "../src/auth/forgetpassword";


const ForgetPasswordPage: NextPage = () => {
    return (
        <PageProvider title="سامانه مدیریت همکار | فراموشی رمز عبور">
            <ForgetPassword/>
        </PageProvider>
    );
};

export default ForgetPasswordPage;
