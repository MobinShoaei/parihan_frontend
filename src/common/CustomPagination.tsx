import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import {Box, FormControl, MenuItem, Select, SelectChangeEvent, TextField, Typography} from '@mui/material';
import {toast} from 'react-toastify';
import {containsOnlyNumbers, convertNumberToEn, convertToEn} from '../../utils/functions';
import AutoComplete from "../data-display/AutoComplete";
import InputLabel from "@mui/material/InputLabel";

interface CustomPaginationProps {
    count: number;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    setPageSize: Dispatch<SetStateAction<number>>
    pageSize: number
}

export const CustomPagination = (props: CustomPaginationProps) => {
    const [page, setPage] = useState<string>('1');
    const [pageSize, setPageSize] = useState<number>(props.pageSize);

    const handleChangePage = (number: number, pageSelection?: 'next' | 'previous') => {
        const pagesCount = Math.ceil(props.count / props.pageSize);
        if (pagesCount >= number && number > 0) {
            props.setPage(number);
        } else toast.error('صفحه وارد شده وجود ندارد');
    };

    useEffect(() => {
        setPage(props.page.toString());
    }, [props.page]);

    useEffect(() => {
        setPageSize(props.pageSize);
    }, [props.pageSize]);

    const arrowStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40px',
        height: '40px',
        border: '0.895238px solid #EAD3D3',
        borderRadius: '4px',
        fontWeight: '400',
        color: '#EAD3D3',
        cursor: 'pointer',
        '&:hover': {
            color: '#E53F4C',
            borderColor: '#E53F4C',
        },
    };

    return (
        <Box sx={{
            display: 'flex',
            gap: {md: '10px', xs: '15px'},
            alignItems: 'center',
            flexDirection: {md: 'row', xs: 'column'}
        }}>

            <Typography sx={{minWidth: '170px'}}>{`صفحه ${props.page} از ${Math.ceil(
                props.count / props.pageSize,
            )} (${props.count} رکورد)`}</Typography>
            <FormControl size="small">
                <InputLabel id="demo-simple-select-label">تعداد نمایش در صفحه</InputLabel>
                <Select
                    value={pageSize}
                    onChange={(e) => {
                        props.setPage(1)
                        props.setPageSize(typeof e.target.value == "number" ? e.target.value : 10)
                    }}
                    size="small"
                    sx={{width: '150px'}}
                    label={'تعداد نمایش در صفحه'}
                >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={200}>200</MenuItem>
                </Select>
            </FormControl>
            <Box
                sx={{
                    display: 'flex',
                    mb: {md: 0, xs: 1},
                    pr: '15px',
                    gap: '5px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            border: '0.741869px solid #EAD3D3',
                        },
                        '&:hover fieldset': {
                            borderColor: '#E53F4C',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#E53F4C',
                        },
                    },
                    '& .MuiTextField-root .MuiOutlinedInput-input': {textAlign: 'center'},
                }}
            >
                <KeyboardArrowRightOutlinedIcon
                    sx={arrowStyle}
                    onClick={() =>
                        handleChangePage(props.page > 1 ? props.page - 1 : 1, 'previous')
                    }
                />
                <TextField
                    variant="outlined"
                    sx={{width: '100px'}}
                    size="small"
                    value={page}
                    onChange={(e) => setPage(e.target.value)}
                    onKeyDown={(e: any) => {
                        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
                            if (!e.shiftKey) {
                                handleChangePage(convertToEn(e.target.value));
                            }
                        }
                    }}
                />
                <KeyboardArrowLeftOutlinedIcon
                    sx={arrowStyle}
                    onClick={() => handleChangePage(props.page + 1, 'next')}
                />
            </Box>
        </Box>
    );
};
