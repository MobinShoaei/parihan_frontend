import { Box, OutlinedInput } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';

export const Footer = (props: {
    onSend: () => void;
    setComment: Dispatch<SetStateAction<string>>;
    comment: string;
    record: number;
}): JSX.Element => {
    return (
        <Box
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'flex-end',
                width: '100%',
                padding: '10px 15px',
                height: '60px',
                '& .chat-input': { padding: '2.5px 14px', paddingRight: 0 },
                '& .chat-input label:hover': { backgroundColor: 'unset' },
            }}
        >
            <OutlinedInput
                placeholder="پیام خود را اینجا بنویسید"
                fullWidth
                maxRows={3}
                sx={{ direction: 'ltr' }}
                onKeyDown={(e) => {

                    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
                        if (!e.shiftKey) {
                            e.preventDefault();
                            props.onSend();
                        }
                    }
                }}
                multiline
                onChange={(e) => props.setComment(e.target.value)}
                value={props.comment}
                size="small"
            />
            <IconButton sx={{ p: '10px' }}>
                <SendIcon
                    sx={{ transform: 'scaleX(-1)', color: '#35BBD6' }}
                    onClick={props.onSend}
                />
            </IconButton>
        </Box>
    );
};
