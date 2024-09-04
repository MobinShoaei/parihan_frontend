import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        redirect: {
            destination: '/login',
            permanent: false,
        },
    };
};

const Home: NextPage = () => {
    return <div />;
};

export default Home;
