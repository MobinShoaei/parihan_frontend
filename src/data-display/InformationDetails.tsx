import { Box, Grid, Typography } from '@mui/material';
import moment from 'jalali-moment';
import React from 'react';
import { ellipsisText } from '../../utils/functions';
import { formFieldsType } from '../dashboard/InformationForm';
import { FormContentType } from '../dashboard/InformationTable';

interface InformationDetailsProps {
    formFields: formFieldsType[];
    data: FormContentType;
}

export const InformationDetails: React.FC<InformationDetailsProps> = (props) => {
    const answerKeys: string[] = props.data?.answers && Object.keys(props.data?.answers);

    return (
        <Grid container spacing={[2, 2]} sx={{ marginBottom: '10px' }}>
            {props.formFields.map((item, index) => {
                return (
                    <Grid item md={4} key={index}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Typography
                                sx={{
                                    color: 'rgba(229, 63, 76, 1)',
                                    border: '1px solid rgba(229, 63, 76, 1)',
                                    minWidth: '18px',
                                    height: '18px',
                                    textAlign: 'center',
                                    borderRadius: '3px',
                                    fontSize: '12px',
                                }}
                            >
                                {index + 3}
                            </Typography>
                            {answerKeys.includes(item.label) ? (
                                <Typography sx={{ color: '#8C8C8C', fontSize: '14px' }}>
                                    {/^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/.test(
                                        props.data?.answers[item.label],
                                    )
                                        ? moment(props.data?.answers[item.label])
                                              .locale('fa')
                                              .format('YYYY/MM/DD')
                                        : ellipsisText(props.data?.answers[item.label], 50)}
                                </Typography>
                            ) : (
                                <Typography> - </Typography>
                            )}
                        </Box>
                    </Grid>
                );
            })}
        </Grid>
    );
};
