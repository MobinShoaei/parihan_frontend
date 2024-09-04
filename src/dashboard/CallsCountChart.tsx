import React, {useEffect, useState} from 'react';
import {Box} from '@mui/system';
import {Wrapper} from '../common/Wrapper';
import {MenuItem, Select, SelectChangeEvent, TextField, Typography} from '@mui/material';
import dayjs, {Dayjs} from 'dayjs';
import {CustomDatePicker} from '../inputs/CustomDatePicker';
import moment from 'jalali-moment';
import {HttpMethod, sendRequest} from '../../utils/axios';
import {BackendUrls} from '../../utils/backend-urls';
import {catchRequestError} from '../../utils/functions';
import jmoment from 'jalali-moment';
import {Bar} from 'react-chartjs-2';
// @ts-ignore
import Chart from 'chart.js/auto';
import {toast} from 'react-toastify';

Chart.defaults.font.family = 'iransans';

interface CallsCountChartProps {
    projectId: number;
}

type chartValueType = {
    [key: string]: { input_call_count: number; output_call_count: number };
};

type finalChartValueType = {
    name: string;
    خروجی: number;
    ورودی: number;
};
const startDay = dayjs(Date.now());
export const CallsCountChart = (props: CallsCountChartProps) => {
    const [dateRange, setDateRange] = useState<string>('10');
    const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(startDay);
    const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(startDay.subtract(6, 'day'));
    const [labels, setLabels] = useState<string[]>([]);
    const [chartValue, setChartValue] = useState<{ input: number[]; output: number[] }>({
        input: [],
        output: [],
    });

    const dateRangeHandleChange = (event: SelectChangeEvent) => {
        setStartDate(startDay);
        if (event.target.value == '10') setEndDate(startDay.subtract(6, 'day'));
        else if (event.target.value == '20') setEndDate(startDay.subtract(29, 'day'));
        else {
            setEndDate(null);
            setStartDate(null);
        }
        setDateRange(event.target.value.toString());
    };

    useEffect(() => {
        const params = {
            calldate__gte: dayjs(endDate)?.format('YYYY-MM-DD'),
            calldate__lte: dayjs(startDate)?.format('YYYY-MM-DD'),
            project: props.projectId,
        };
        if (endDate?.isBefore(startDate)) {
            sendRequest(BackendUrls.chart_report, HttpMethod.GET, params)
                .then((response) => {
                    makeChartValue(response.data);
                    makeChartLabels(Object.keys(response.data));
                })
                .catch(catchRequestError);
        } else if (startDate !== null && endDate !== null)
            toast.error('تاریخ پایان باید بعد از تاریخ شروع باشد');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate, props.projectId]);

    const makeChartValue = (v: chartValueType) => {
        const dates = Object.keys(v);
        let finalChartValue: { input: number[]; output: number[] } = {input: [], output: []};
        let input: number[] = [];
        let output: number[] = [];
        dates.map((date) => {
            input.push(v[date].input_call_count);
            output.push(v[date].output_call_count);
        });
        finalChartValue.input = input;
        finalChartValue.output = output;
        setChartValue(finalChartValue);
    };

    const makeChartLabels = (v: string[]) => {
        let labels: string[] = [];
        v.map((label) => {
            labels.push(jmoment(label).locale('fa').format('YYYY/MM/DD'));
        });
        setLabels(labels);
    };

    return (
        <Wrapper sx={{padding: '16px'}}>
            <Box>

                <Typography sx={{mb: '15px'}}>نمودار تعداد تماس‌ها</Typography>
                <Box
                    sx={{
                        background: 'rgb(140, 140, 140,0.1)',
                        padding: '12px 14px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderRadius: '6px',
                        mb: '45px',
                    }}
                >
                    <Select
                        value={dateRange}
                        onChange={dateRangeHandleChange}
                        size="small"
                        sx={{width: '250px'}}
                    >
                        <MenuItem value={10}>هفتگی</MenuItem>
                        <MenuItem value={20}>ماهانه</MenuItem>
                        <MenuItem value={30}>بازه زمانی دلخواه</MenuItem>
                    </Select>
                    {dateRange == '30' && (
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <CustomDatePicker
                                value={endDate}
                                setValue={setEndDate}
                                label="تاریخ شروع"
                            />
                            <Box sx={{mx: 2}}> تا </Box>
                            <CustomDatePicker
                                value={startDate}
                                setValue={setStartDate}
                                label="تاریخ پایان"
                            />
                        </Box>
                    )}
                </Box>
                <Box sx={{height: '400px'}}>
                    <Bar
                        height={300}
                        data={{
                            labels: labels,
                            datasets: [
                                {
                                    label: 'ورودی',
                                    data: chartValue.input,
                                    backgroundColor: ['#385A86'],
                                },
                                {
                                    label: 'خروجی',
                                    data: chartValue.output,
                                    backgroundColor: ['#E53F4C'],
                                },
                            ],
                        }}
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: true,
                                    labels: {
                                        boxWidth: 20,
                                        
                                    }
                                },
                            },
                        }}
                    />
                </Box>
            </Box>
        </Wrapper>
    );
};
