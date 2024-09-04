import React from 'react';
import { CustomSelectBox } from './CustomSelectBox';
import { Box, Typography } from '@mui/material';
import { SelectGpProps } from './SelectGp';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

export const Options = (props: SelectGpProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: '5px',
                flexWrap: 'wrap',
            }}
        >
            {props.options.map((item, index) => {
                const checked = props.value?.includes(item.name);
                return (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            gap: '5px',
                            border: checked
                                ? '0.747929px solid #00AACC'
                                : '0.747929px solid #8C8C8C',
                            borderRadius: '5px',
                            padding: '6px 18px',
                            alignItems: 'center',

                            backgroundColor: checked ? 'rgba(6, 239, 239, 0.1)' : 'unset',
                            fontWeight: checked ? '700' : 'unset',
                            width: 'fit-content',
                            marginBottom: { md: '0px', xs: '10px' },
                        }}
                    >
                        {checked ? (
                            <CheckBoxOutlinedIcon
                                sx={{ fontSize: '17px', color: checked ? '#00AACC' : 'unset' }}
                            />
                        ) : (
                            <CheckBoxOutlineBlankIcon sx={{ fontSize: '17px', color: '#8C8C8C' }} />
                        )}
                        <Typography variant="body2" sx={{ color: checked ? '#00AACC' : '#8C8C8C' }}>
                            {item.text}
                        </Typography>
                    </Box>
                );
            })}
        </Box>
    );
};
