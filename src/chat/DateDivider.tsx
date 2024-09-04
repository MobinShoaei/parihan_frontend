import React from 'react';
import moment from 'jalali-moment';
import { Box } from '@mui/material';

export const DateDivider = (props: { date: string | any }): JSX.Element => {
    return (
        <Box
            sx={{
                display: 'table',
                fontSize: '10px',
                textAlign: 'center',
                mb: '10px',
                '& span': {
                    display: 'table-cell',
                    position: 'relative',
                },
                '& span:first-child,& span:last-child': {
                    width: '50%',
                    top: '9px',
                    mozBackgroundSize: '100% 2px',
                    backgroundSize: '100% 1px',
                    backgroundPosition: '0 0, 0 100%',
                    backgroundRepeat: 'no-repeat',
                },
                '& span:first-child': {
                    backgroundImage: 'linear-gradient(90deg, #F2F5FA, #F2F5FA)',
                },
                '& span:nth-child(2)': {
                    background: '#F2F5FA',
                    borderRadius: '29px',
                    color: '#00000073',
                    padding: '2px 25px',
                    width: 'auto',
                    whiteSpace: 'nowrap',
                },
                '& span:last-child': {
                    backgroundImage: 'linear-gradient(90deg, #F2F5FA, #F2F5FA)',
                },
            }}
        >
            <span></span>
            <span>{moment(props.date).locale('fa').format('dddd D MMMM YYYY')}</span>
            <span></span>
        </Box>
    );
};
