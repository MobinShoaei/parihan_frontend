import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Wrapper } from '../common/Wrapper';
import { Grid, Typography } from '@mui/material';
import { HttpMethod, sendRequest } from '../../utils/axios';
import { BackendUrls } from '../../utils/backend-urls';
import { catchRequestError } from '../../utils/functions';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CustomLegend } from '../common/CustomLegend';

Chart.defaults.font.family = 'iransans';

interface ContactsStatusChartProps {
    projectId: number;
}

type chartValueType = {
    tag__title: string;
    tag__color_hex: string;
    count: number;
};

export const ContactsStatusChart = (props: ContactsStatusChartProps) => {
    const [chartValue, setChartValue] = useState<{ counts: number[]; colors: string[] }>({
        counts: [],
        colors: [],
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [labels, setLabels] = useState<string[]>([]);
    const [legendValue, setLegendValue] = useState<chartValueType[]>([]);
    useEffect(() => {
        sendRequest<chartValueType[]>(BackendUrls.contents_chart_report, HttpMethod.GET, {
            form__project: props.projectId,
        })
            .then((response) => {
                makeChartLabels(response.data);
                makeChartValue(response.data);
                setLegendValue(response.data);
            })
            .catch(catchRequestError)
            .finally(() => {
                setLoading(false);
            });
    }, [props.projectId]);

    const makeChartValue = (v: chartValueType[]) => {
        let finalChartValue: { counts: number[]; colors: string[] } = { counts: [], colors: [] };
        let counts: number[] = [];
        let colors: string[] = [];
        v.map((date) => {
            counts.push(date.count);
            colors.push(date.tag__color_hex);
        });
        finalChartValue.counts = counts;
        finalChartValue.colors = colors;
        setChartValue(finalChartValue);
    };

    const makeChartLabels = (v: chartValueType[]) => {
        let labels: string[] = [];
        v.map((label) => {
            labels.push(label.tag__title);
        });
        setLabels(labels);
    };

    const data = {
        labels: labels,
        datasets: [
            {
                data: chartValue.counts,
                backgroundColor: chartValue.colors,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                // Disable the on-canvas tooltip
                displayColors: false,
                bodyFont: { size: 12 },
                padding: 5,
            },
        },
        cutoutPercentage: 70,
    };

    return (
        <Wrapper sx={{ padding: '16px', height: '100%' }}>
            <Typography sx={{ mb: '15px' }}>نمودار وضعیت مخاطبان</Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: '50px' }}>
                    <Box sx={{ width: '250px' }}>
                        <Doughnut data={data} options={options} />
                    </Box>
                </Box>
                <Grid container spacing={[0,2]} justifyContent={'space-evenly'}>
                    {legendValue.map((value, index) => {
                        return (
                            <Grid md={5} xs={12} item key={index} >
                                <CustomLegend
                                    label={value.tag__title}
                                    color={value.tag__color_hex}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </Wrapper>
    );
};
