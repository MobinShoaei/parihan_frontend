import {Box} from '@mui/material';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {sendRequest} from "../../utils/axios";
import {BackendUrls} from "../../utils/backend-urls";
import {catchRequestError} from "../../utils/functions";

type durationType = {
    title: string
    id: number
}

interface PlansType {
    activePlan: number | undefined;
    setActivePlan: Dispatch<SetStateAction<number | undefined>>;
    // setPlansLoading:boolean
}

export const Planstype = (props: PlansType) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [durations, setDurations] = useState<durationType[]>([])
    const handleChange = (v: number) => {
        props.setActivePlan(v);
    };

    useEffect(() => {
        setLoading(true)
        // props.setPlansLoading(true)
        sendRequest(BackendUrls.time_duration)
            .then((res) => {
                props.setActivePlan(res.data.results[0].id)
                // props.setPlansLoading(false)
                setDurations(res.data.results)
            })
            .catch((e) => catchRequestError(e))
            .finally(() => setLoading(false))
    }, [])

    return (
        <Box
            className="plansTypeWrapper"
            sx={{
                // width: {md:'510px',xs:'220px'},
                height: {md: '50px', xs: 'auto'},
                backgroundColor: '#fff',
                border: '1px solid #C9CBD1',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: {md: 'row', xs: 'column'},
                alignItems: {md: 'unset', xs: 'center'},
                justifyContent: 'space-between',
                '& .MuiBox-root': {
                    width: {md: '170px', xs: '90px'},
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(140, 140, 140, 1)',
                    fontWeight: 500,
                    cursor: 'pointer',
                    height: {md: 'auto', xs: '40px'}
                },
                '& .selected': {
                    backgroundColor: 'secondary.main',
                    borderRadius: '8px',
                    color: 'white',
                },
            }}
        >
            {
                durations.map((item, index) => {
                    return (
                        <Box
                            key={index}
                            className={props.activePlan == item.id ? 'selected' : ''}
                            onClick={() => handleChange(item.id)}
                        >
                            {item.title}
                        </Box>
                    )
                })
            }


        </Box>
    );
};
