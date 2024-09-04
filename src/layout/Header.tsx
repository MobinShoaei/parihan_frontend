import {Badge, Typography, Tooltip} from '@mui/material';
import {Box} from '@mui/system';
import Image from 'next/image';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {InVoiceModal} from '../dashboard/InVoiceModal';
import {MdOutlineDataUsage, MdLogout, MdNotifications} from 'react-icons/md';
import {useIsMobile} from '../hook/useIsMobile';
import useIsFirstRender from '../hook/useIsFirstRender';
import {NotificationModal} from '../dashboard/NotificationModal';
import Modal from '../common/Modal';
import {useDispatch, useSelector} from 'react-redux';
import {setProjectsDrawer} from '../../redux/actions/projects_drawer';
import {getToken} from '../../utils/cookies';
import jwt_decode from 'jwt-decode';
import {AiFillHome} from 'react-icons/ai';
import {IoMdSettings} from 'react-icons/io';
import {State} from '../../redux/reducers';

export const DashboardHeader = () => {
    // state
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [notifVisible, setNotifVisible] = useState<boolean>(true);
    const [notifModal, setNotifModal] = useState<boolean>(false);
    const [isEmployer, setIsEmployer] = useState<boolean>(false);
    const [profile, setProfile] = useState<any>();

    const token = getToken();
    const notifCount = useSelector((state: State) => state.notifCount);
    const projectId = useSelector((state: State) => state.projectId);
    const formId = useSelector((state: State) => state.formId)

    useEffect(() => {
        if (token && token !== null) setProfile(jwt_decode(token));
    }, []);

    const matches = useIsMobile();
    // router
    const router = useRouter();
    const isFirst = useIsFirstRender();
    const dispatch = useDispatch();

    const handleDrawerOpen = () => {
        dispatch(setProjectsDrawer(true));
    };

    useEffect(() => {
        if (profile) {
            setIsEmployer(profile.role == 'employer');
        }
    }, [profile]);

    useEffect(() => {
        setModalVisible(false);
    }, [router.pathname]);

    const Logo = (): JSX.Element => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                }}
            >
                <Image
                    src={'/images/hamcall logo.png'}
                    width={40}
                    height={40}
                    alt="#"
                    objectFit="cover"
                    unoptimized={true}
                />
                {profile && (
                    <Typography
                        sx={{
                            fontSize: {sm: '14px', xs: '12px'},
                            color: '#2B2828',
                            fontWeight: '700',
                        }}
                    >
                        پنل مدیریت ارتباط با مشتری همکار |{' '}
                        {profile?.first_name + '' + ' ' + profile?.last_name}
                    </Typography>
                )}
            </Box>
        );
    };

    return (
        <Box
            sx={{
                width: '100%',
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.25)',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: {md: '6px 55px', xs: '8px 16px'},
                position: 'relative',
            }}
        >
            {matches ? <MenuIcon onClick={handleDrawerOpen}/> : <Logo/>}

            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center',
                    '& span': {
                        cursor: 'pointer',
                    },
                    minWidth: {sm: '185px', xs: '70px'},
                    justifyContent: 'end',
                    fontSize: '28px',
                    color: '#385A86',
                }}
            >
                <Tooltip title="خانه">
                    <AiFillHome
                        style={{
                            // width: '27px',
                            // height: '27px',
                            cursor: 'pointer',

                            color: router.pathname == '/dashboard' ? '#35BBD6' : '#385A86',
                        }}
                        onClick={() => router.push('/dashboard')}
                    />
                </Tooltip>

                {router.pathname !== '/pricing' && (
                    <Tooltip title="اعلان‌ها">
                        <Badge
                            color="primary"
                            badgeContent={notifCount}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <MdNotifications
                                onClick={() => {
                                    setNotifModal(true);
                                }}
                            />
                        </Badge>
                    </Tooltip>
                )}
                {router.pathname !== '/pricing' && (
                    <Tooltip title="جزئیات تعرفه">
                        <MdOutlineDataUsage
                            onClick={() => setModalVisible(true)}
                            style={{
                                // width: '27px',
                                // height: '27px',
                                cursor: 'pointer',
                            }}
                        />
                    </Tooltip>
                )}
                {isEmployer && (
                    <Tooltip title="تنظیمات">
                        <IoMdSettings
                            style={{
                                // width: '27px',
                                // height: '27px',
                                cursor: 'pointer',
                                color: router.pathname == '/setting' ? '#35BBD6' : '#385A86',
                            }}
                            onClick={() => router.push(`/setting?id=${projectId}&&form=${formId}`)}
                        />
                    </Tooltip>
                )}
                <Tooltip title="خروج">
                    <MdLogout
                        fontSize="small"
                        style={{
                            color: '#E53F4C',
                            paddingRight: '2px',
                            marginRight: '2px',
                            fontSize: '30px',
                            cursor: 'pointer',
                            transform: 'rotate(180deg)',
                        }}
                        onClick={() => router.push('/logout')}
                    />
                </Tooltip>
            </Box>

            <InVoiceModal setModalVisible={setModalVisible} modalVisible={modalVisible}/>

            <Modal
                open={notifModal}
                onClose={() => setNotifModal(false)}
                containerSx={{padding: 0}}
            >
                <NotificationModal setNotifModal={setNotifModal}/>
            </Modal>
        </Box>
    );
};
