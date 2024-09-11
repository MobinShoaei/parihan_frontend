import {
    Box,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const ScoreList = () => {
    function createData(name: string, calories: number) {
        return { calories, name };
    }

    const rows = [
        createData('ثبت کد معرف توسط شما', 100),
        createData('ثبت کد معرف توسط شما', 10),
        createData('ثبت کد معرف توسط شما', 150),
        createData('ثبت کد معرف توسط شما', 11),
    ];

    return (
        <Stack
            sx={{
                background: '#E1D0C3',
                p: '20px 25px',
                borderRadius: '20px 20px 20px 20px',
                position: 'relative',
            }}
            gap={2}
        >
            <Stack direction={'row'} alignItems={'center'}>
                <MoreVertIcon fontSize="small" color="primary" />
                <Typography variant="h2">لیست امیتازات شما</Typography>
            </Stack>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="center">میزان امتیاز</TableCell>
                            <TableCell align="center">کسب شده بابت</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell component="th" scope="row" align="center">
                                    <Stack
                                        direction={'row'}
                                        alignItems={'center'}
                                        justifyContent={'space-between'}
                                    >
                                        {row.calories}
                                        <img
                                            src="/images/coin.png"
                                            alt=""
                                            style={{ width: '25px' }}
                                        />
                                    </Stack>
                                </TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
};
