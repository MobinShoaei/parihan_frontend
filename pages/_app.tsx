import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../src/theme';
import { NextPage } from 'next';
import { ToastContainer } from 'react-toastify';
import createEmotionCache from '../src/helpers/createEmotionCache';
import { DeviceProvider } from '../src/common/DeviceProvider';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Router } from 'next/router';
import React from 'react';
import moment from 'moment';
import 'moment-timezone';

moment.tz.setDefault('Iran');

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
    emotionCache?: EmotionCache;
    userAgent: string;
};

const clientSideEmotionCache = createEmotionCache();

function MyApp(props: AppPropsWithLayout) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    const getLayout = Component.getLayout ?? ((page) => page);
    return (


        <DeviceProvider userAgent={props.userAgent}>
            <CacheProvider value={emotionCache}>
                <ThemeProvider theme={theme}>
                    <div dir="rtl" id="direction">
                        <CssBaseline />
                        {getLayout(<Component {...pageProps} />)}
                    </div>
                    <ToastContainer rtl hideProgressBar closeButton={false} />
                </ThemeProvider>
            </CacheProvider>
        </DeviceProvider>


    );
}

Router.events.on('routeChangeStart', (url) => {
    NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

MyApp.getInitialProps = async (context: any) => {
    // Get user agent from nextjs request
    const req = context.ctx.req;
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;

    return {
        userAgent: userAgent,
    };
};
export default MyApp;
