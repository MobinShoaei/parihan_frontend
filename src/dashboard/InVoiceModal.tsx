import { Button, CircularProgress, Dialog, Grid, Slide, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ProjectApiResponse } from './Dashboard';
import jmoment from 'jalali-moment';
import { useRouter } from 'next/router';
import { Chart, ArcElement } from 'chart.js';
import { ChartProgress } from '../data-display/ChartProgress';
import { TransitionProps } from '@mui/material/transitions';
import { RemainingBox } from '../common/RemainingBox';
import { sendRequest } from '../../utils/axios';
import { BackendUrls } from '../../utils/backend-urls';
import useUpdateEffect from '../hook/useUpdateEffect';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reducers';

Chart.register(ArcElement);

export const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="down" ref={ref} {...props} />;
});

interface InVoiceModalProps {
    setModalVisible: Dispatch<SetStateAction<boolean>>;
    modalVisible: boolean;
    id?: number;
}

type planDataType = {
    credit: number;
    decrease_credit: number;
    subscription_plan: {
        credit_remaining: number;
        name: string;
        end_of_subscriptionplan?: string;
        last_updated?: string;
        credit_type?: string;
    };
    phone_number?: string;
};

export const InVoiceModal = (props: InVoiceModalProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [planData, setPlanData] = useState<planDataType>();
    const projectId = useSelector((state: State) => state.projectId);
    const router = useRouter();

    const handleClose = () => {
        props.setModalVisible(false);
    };

    useEffect(() => {
        if (projectId) {
            sendRequest<planDataType>(BackendUrls.get_plan + projectId + '/').then((response) => {
                setPlanData(response.data);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectId, props.modalVisible == true]);

    const durationHandler = (s: string | undefined, e: string | undefined, type: string) => {
        const start = jmoment(s);
        const end = jmoment(e);
        const now = jmoment().format();
        switch (type) {
            case 'number':
                return jmoment.duration(end.diff(start)).asDays();
            case 'percent':
                const percent: number =
                    (jmoment.duration(end.diff(now)).asDays() /
                        Math.round(durationHandler(s, e, 'number'))) *
                    100;
                return percent;
            default:
                return 1;
        }
    };

    const percent = Math.round(
        durationHandler(
            planData?.subscription_plan?.last_updated,
            planData?.subscription_plan?.end_of_subscriptionplan,
            'percent',
        ),
    );

    const TextBox = (props: { title: string; children: JSX.Element }) => {
        return (
            <Box
                sx={{
                    gap: '5px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    '& p': {
                        textAlign: { md: 'left', xs: 'center' },
                    },
                    backgroundColor: 'rgb(140, 140, 140,0.05)',
                    minHeight: '94px',
                    borderRadius: '6px',
                    p: '0 20px',
                }}
            >
                <Typography variant="body2">{props.title}</Typography>
                {props.children}
            </Box>
        );
    };

    return (
        <Dialog
            TransitionComponent={Transition}
            onClose={handleClose}
            PaperProps={{ sx: { position: 'fixed', top: 50, right: 10 } }}
            open={props.modalVisible}
        >
            <Box
                sx={{
                    border: '1px solid',
                    borderColor: 'secondary.light',
                    boxShadow: ' 1px 6px 15px rgba(0, 0, 0, 0.15)',
                    borderRadius: '6px',
                    width: { md: '570px', sm: '300px' },
                    padding: '12px',
                    direction: 'ltr',
                }}
            >
                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            height: '100%',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <CircularProgress color={'primary'} size={40} />
                    </Box>
                ) : (
                    <Grid spacing="8px" container>
                        <Grid item md={6} sm={12} xs={12}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                    width: '100%',
                                }}
                            >
                                <TextBox title="شماره اختصاصی">
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: '20px',
                                        }}
                                        color="secondary.main"
                                    >
                                        {planData?.phone_number}
                                    </Typography>
                                </TextBox>
                                <TextBox title="آخرین شارژ حساب">
                                    <Typography
                                        sx={{
                                            color: '#2B2828',
                                            fontSize: '18px',
                                        }}
                                    >
                                        {planData?.subscription_plan?.last_updated
                                            ? jmoment(planData?.subscription_plan?.last_updated)
                                                  .locale('fa')
                                                  .format('HH:mm - YYYY/MM/DD')
                                            : '-'}
                                    </Typography>
                                </TextBox>
                                {planData?.subscription_plan?.name && (
                                    <TextBox
                                        title={`${Math.round(
                                            durationHandler(
                                                jmoment().format(),
                                                planData?.subscription_plan
                                                    ?.end_of_subscriptionplan,
                                                'number',
                                            ),
                                        )} روز (${percent}٪) مانده از`}
                                    >
                                        <RemainingBox
                                            used={percent}
                                            name={planData?.subscription_plan?.name}
                                        />
                                    </TextBox>
                                )}
                            </Box>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '15px',
                                    justifyContent: 'space-between',
                                    height: '100%',
                                    width: '100%',
                                    backgroundColor: 'rgb(234, 211, 211, 0.4)',
                                    borderRadius: '6px',
                                    p: '10px 15px',
                                }}
                            >
                                <Typography sx={{ textAlign: 'center' }} variant="body2">
                                    میزان شارژ باقی مانده
                                </Typography>
                                <ChartProgress
                                    value={planData?.subscription_plan?.credit_remaining}
                                    text={
                                        <>
                                            <Typography
                                                color="black"
                                                fontSize={18}
                                                sx={{ textAlign: 'center' }}
                                            >
                                                {planData && planData?.credit.toFixed(1)}
                                            </Typography>
                                            <Typography
                                                color="black"
                                                fontSize={18}
                                                sx={{ textAlign: 'center' }}
                                            >
                                                {planData?.subscription_plan?.credit_type === 'C'
                                                    ? 'تماس'
                                                    : 'دقیقه'}
                                            </Typography>
                                        </>
                                    }
                                />

                                <Button
                                    sx={{
                                        padding: '10px',
                                        background: '#fff',
                                        border: '1px solid #35BBD6',
                                        color: '#385A86',
                                    }}
                                    onClick={() => {
                                        router.push('/pricing');
                                    }}
                                >
                                    مشاهده همه تعرفه ها
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Dialog>
    );
};
