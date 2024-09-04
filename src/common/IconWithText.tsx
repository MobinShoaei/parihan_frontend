import { Box, Typography } from '@mui/material';
import React from 'react';
import jmoment from 'jalali-moment';
import { RiUserSettingsFill } from 'react-icons/ri';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { ellipsisText } from '../../utils/functions';

interface IconWithTextProps {
    text: string;
    date?: boolean;
}

export const IconWithText = (props: IconWithTextProps) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            {props.date ? (
                <CalendarTodayIcon sx={{ fontSize: '17px', color: '#385A86' }} />
            ) : (
                <RiUserSettingsFill style={{ fontSize: '17px', color: '#385A86' }} />
            )}
            <Typography sx={{ color: '#385A86', fontSize: '14px' }}>
                {props.date
                    ? jmoment(props.text).locale('fa').format('dddd D MMMM ')
                    : ellipsisText(props.text, 20)}
            </Typography>
        </Box>
    );
};
