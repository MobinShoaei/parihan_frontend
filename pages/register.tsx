import type { NextPage } from 'next';
import { PageProvider } from '../src/common/PageProvider';
import Register from '../src/auth/register/Register';

const RegisterPage: NextPage = () => {
    return (
        <PageProvider title="پریحان انگلیش | ثبت نام">
            <Register />
        </PageProvider>
    );
};

export default RegisterPage;
