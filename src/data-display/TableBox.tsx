import {
    Box,
    CircularProgress,
    Pagination,
    Skeleton,
    SxProps,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Theme,
    Typography,
} from '@mui/material';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {CustomPagination} from '../common/CustomPagination';
import {Wrapper} from '../common/Wrapper';
import {SearchInput} from '../inputs/SearchInput';

export type TableCell = {
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
    text: string | JSX.Element;
    sx?: SxProps<Theme>;
};

export interface TableBoxProps {
    headerRow: Array<TableCell>;
    rows?: Array<{
        options: Array<TableCell>;
    }>;
    pagination?: {
        page: number;
        count: number;
        rowsPerPage: number;
    };
    align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
    loading?: boolean;
    setSearchValue?: Dispatch<SetStateAction<string>>;
    searchValue?: string;
    setRerender?: Dispatch<SetStateAction<boolean>>;
    setPage: Dispatch<SetStateAction<number>>;
    setPageSize: Dispatch<SetStateAction<number>>
    pageSize: number
}

export const TableBox: React.FC<TableBoxProps> = (props) => {
    const [searchLoading, setSearchLoading] = useState<boolean>(false);

    return (
        <>
            {' '}
            <Wrapper sx={{position: 'relative', height: 'calc(100vh - 195px)'}}>
                <TableContainer sx={{border: 'none', position: 'relative', height: '100%'}}>
                    <Box
                        sx={{
                            borderBottom: 1,
                            borderColor: 'secondary.light',
                            padding: '10px 0',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography>جدول تماس‌ها</Typography>
                        <SearchInput
                            sx={{maxWidth: '35%'}}
                            loading={searchLoading}
                            value={props.searchValue}
                            setSearchValue={props.setSearchValue}
                            onChange={(e) => props.setSearchValue?.(e.target.value)}
                            onFinish={() => {
                                props.setRerender?.((o) => !o);
                                props.setPage(1);
                            }}
                            placeholder="جستجو شماره تماس"
                        />
                    </Box>
                    <Table size="medium">
                        <TableHead>
                            <TableRow>
                                {props.headerRow.map((item, key) => (
                                    <TableCell
                                        key={key}
                                        align={item.align || props.align}
                                        sx={{...item.sx, borderColor: 'secondary.light'}}
                                    >
                                        {props.loading ? <Skeleton/> : item.text}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{maxHeight: '600px', overflow: 'auto'}}>
                            {props.loading
                                ? [...Array(10)].map((item, key) => {
                                    return (
                                        <TableRow component="th" scope="row" key={key.toString()}>
                                            {[...Array(8)].map((optionItem, key) => (
                                                <TableCell
                                                    key={key}
                                                    //   align={optionItem.align || props.align}
                                                    sx={{
                                                        borderColor: 'secondary.light',
                                                    }}
                                                >
                                                    <Skeleton/>
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    );
                                })
                                : props.rows &&
                                props.rows?.map((item, index) => (
                                    <TableRow component="th" scope="row" key={index.toString()}>
                                        {item.options.map((optionItem, key) => (
                                            <TableCell
                                                key={key}
                                                align={optionItem.align || props.align}
                                                sx={{
                                                    ...optionItem.sx,
                                                    borderColor: 'secondary.light',
                                                }}
                                            >
                                                {optionItem.text}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {props.pagination && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: 3,
                        }}
                    >
                        <Typography>{`نمایش رکوردهای ${
                            props.pagination.page == 1 ? 1 : (props.pagination.page - 1) * props.pageSize + 1
                        }-${props.pagination.page * props.pageSize} از مجموع ${
                            props.pagination.count
                        } تماس ضبط شده`}</Typography>

                        <CustomPagination
                            count={props.pagination.count}
                            page={props.pagination.page}
                            setPage={props.setPage}
                            setPageSize={props.setPageSize}
                            pageSize={props.pageSize}
                        />
                    </Box>
                )}
            </Wrapper>
        </>
    );
};
