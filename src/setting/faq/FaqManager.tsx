import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { FaqList } from './FaqList';
import { NewFaq } from './NewFaq';

export const FaqManager = () => {
    const [faqId, setFaqId] = useState<number>(0);
    const [reRender, setReRender] = useState<boolean>(false);
    return (
        <Grid container spacing={'20px'}>
            <Grid item md={7.8} xs={12}>
                <FaqList setFaqId={setFaqId} reRender={reRender} />
            </Grid>
            <Grid item md={4.2} xs={12}>
                <NewFaq faqId={faqId} setReRender={setReRender} setFaqId={setFaqId} />
            </Grid>
        </Grid>
    );
};
