import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import { NextPage } from 'next';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import AdapterJalali from '@date-io/jalaali';
import theme from '../theme';
import { ToastContainer } from 'react-toastify';
import { DashboardHeader } from './Header';
import { Grid, Stack } from '@mui/material';
import { SideBar } from './SideBar';
import { DasboardWrapper } from './DasboardWrapper';
import { useIsMobile } from '../hook/useIsMobile';

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
};

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

export const ConstLayout = (props: { children: JSX.Element; pageTitle?: string }) => {
    const matches = useIsMobile();

    return (
        <LocalizationProvider dateAdapter={AdapterJalali}>
            <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                    <Grid
                        container
                        sx={{
                            maxWidth: '1600px',
                            margin: '0 auto',
                            height: '100%',
                            padding: { md: '20px 25px', xs: '10px 12px' },
                        }}
                        gap={2}
                    >
                        <Grid item md={'auto'} xs={12}>
                            <SideBar />
                        </Grid>
                        <Grid item xs position={'relative'}>
                            <DasboardWrapper pageTitle={props.pageTitle}>
                                {props.children}
                            </DasboardWrapper>
                        </Grid>
                    </Grid>
                    <ToastContainer rtl hideProgressBar closeButton={true} />
                </ThemeProvider>
            </CacheProvider>
        </LocalizationProvider>
    );
};
