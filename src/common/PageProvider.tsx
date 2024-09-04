import React from 'react';

import Head from 'next/head';

export interface PageDataProviderProps {
    title: string;
    children: React.ReactNode;
}

export const PageProvider = (props: PageDataProviderProps): JSX.Element => {
    return (
        <>
            {
                <>
                    <Head>
                        <title>{props.title}</title>
                        <link rel="stylesheet" href="https://use.typekit.net/ehy5ork.css"></link>
                    </Head>
                    {props.children}
                </>
            }
        </>
    );
};
