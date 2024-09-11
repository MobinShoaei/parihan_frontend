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

export const InvitedUsers = () => {
    function createData(
        name: string,
        calories: number,
        fat: number,
        carbs: number,
        protein: number,
    ) {
        return { calories, name, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 1, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 2, 9.0, 37, 4.3),
        createData('Eclair', 3, 16.0, 24, 6.0),
        createData('Cupcake', 4, 3.7, 67, 4.3),
        createData('Gingerbread', 5, 16.0, 49, 3.9),
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
                <Typography variant="h2">لیست کاربران دعوت شده</Typography>
            </Stack>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="center">نام و نام خانوادگی</TableCell>
                            <TableCell align="center">وضعیت خرید دوره</TableCell>
                            <TableCell align="center">شماره موبایل</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    {row.calories}
                                </TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.fat}</TableCell>
                                <TableCell align="center">{row.carbs}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
};
