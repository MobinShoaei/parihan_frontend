import { CircularProgress, IconButton, InputBase, SxProps } from '@mui/material';
import { Box } from '@mui/system';
import React, {Dispatch, SetStateAction} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { LoadingButton } from '@mui/lab';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
interface SearchInputProps {
    value?: string;
    loading?: boolean;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    onFinish?: (value: string | undefined) => void;
    sx?: SxProps;
    placeholder?: string;
    setSearchValue?:Dispatch<SetStateAction<string>>
}

export const SearchInput: React.FC<SearchInputProps> = (props) => {
    return (
        <Box
            sx={{
                display: 'flex',
                border: '1px solid #8C8C8C',
                borderRadius: '6px',
                ...props.sx,
            }}
        >
            <InputBase
                sx={{
                    ml: 1,
                    flex: 1,
                    '& ::placeholder': {
                        fontSize: { md: '14px', xs: '11px' },
                    },
                }}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                fullWidth={true}
                onKeyDown={(e) => {
                    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
                        if (!e.shiftKey) {
                            if (props.onFinish) {
                                props.onFinish(props.value);
                            }
                        }
                    }
                }}

                endAdornment={props.value && <HighlightOffIcon color={'primary'} sx={{cursor:'pointer'}} onClick={()=> {
                    props.setSearchValue && props.setSearchValue('')
                    props.onFinish && props.onFinish('')
                }}/>}
            />
            <IconButton
                disabled={props.loading}
                type="submit"
                sx={{
                    p: '10px',
                    borderRadius: '0px',
                }}
                aria-label="search"
                onClick={() => {
                    if (props.onFinish) {
                        props.onFinish(props.value);
                    }
                }}
            >
                {!props.loading ? (
                    <SearchIcon
                        sx={{
                            color: 'secondary.main',
                        }}
                    />
                ) : (
                    <CircularProgress color={`inherit`} size={24} />
                )}
            </IconButton>
        </Box>
    );
};
