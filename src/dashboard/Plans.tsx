import {Typography, useMediaQuery} from '@mui/material';
import {Box} from '@mui/system';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import {DashboardHeader} from '../layout/Header';
import theme from '../theme';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {Planstype} from '../common/PlansType';
import {PlansCard} from '../data-display/PlansCard';
import {HttpMethod, sendRequest} from '../../utils/axios';
import {BackendUrls} from '../../utils/backend-urls';
import {catchRequestError} from '../../utils/functions';
import {Autoplay, Navigation} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import {Swiper, SwiperSlide} from 'swiper/react';
import {getToken} from '../../utils/cookies';

export interface PlanType {
    id: number;
    name: string;
    price: number;
    description: string;
    attributes: string[];
    time_duration: string;
    icon: string;
    is_not_buyable: boolean;
}

export const Plans = () => {
    const [activePlan, setActivePlan] = useState<number>();
    const [loading, setLoading] = useState<boolean>(false);
    const [plans, setPlans] = useState<PlanType[]>([]);
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const token = getToken();

    useEffect(() => {
        if (activePlan) {
            setLoading(true);
            const params = {
                time_duration: activePlan,
            };
            sendRequest(BackendUrls.plans, HttpMethod.GET, params)
                .then((response) => setPlans(response.data.results))
                .catch(catchRequestError)
                .finally(() => {
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                });
        }

    }, [activePlan]);

    return (
        <Box>
            <Box
                sx={{
                    maxWidth: '1300px',
                    margin: '0 auto',
                    padding: '30px 0',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: '40px',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 'bold',
                        }}
                    >
                        تعرفه دفتر مجازی همکار
                    </Typography>
                    {token && (
                        <Link href="/dashboard">
                            <Typography sx={{color: 'secondary.main', cursor: 'pointer'}}>
                                بازگشت به پنل کاربری
                            </Typography>
                        </Link>
                    )}
                    <Planstype activePlan={activePlan} setActivePlan={setActivePlan}/>

                    <Box sx={{width: '100%', padding: '15px 25px'}}>
                        <Swiper
                            slidesPerView={matches ? 1 : 4}
                            spaceBetween={30}
                            modules={[Autoplay, Navigation]}
                            navigation={true}
                            autoplay={{
                                delay: 3500,
                                disableOnInteraction: false,
                            }}
                            centeredSlides={false}
                            centerInsufficientSlides={true}
                        >
                            {activePlan && plans.map((plan: PlanType, index: number) => {
                                return (
                                    <SwiperSlide key={index.toString()}>
                                        <PlansCard
                                            data={plan}
                                            loading={loading}
                                            special={plan.is_not_buyable}
                                        />
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
