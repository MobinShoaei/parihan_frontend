import {Box, OutlinedInput} from '@mui/material';
import React, {Dispatch, SetStateAction} from 'react';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';

export const Footer = (props: {
    onSend: () => void;
    setMessage: Dispatch<SetStateAction<string>>;
    message: string;
    sendFile: (e: any) => void;
    sendLoading: boolean

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
                '& .chat-input': {padding: '2.5px 14px', paddingRight: 0},
                '& .chat-input label:hover': {backgroundColor: 'unset'},
            }}
        >
            <IconButton sx={{p: '10px'}}>
                <SendIcon
                    sx={{transform: 'scaleX(-1)', color: 'primary.main'}}
                    onClick={props.onSend}
                />
            </IconButton>
            <OutlinedInput
                placeholder="پیام خود را اینجا بنویسید"
                fullWidth
                maxRows={3}
                sx={{direction: 'ltr'}}
                endAdornment={
                    <IconButton component="label">
                        <AttachFileIcon/>
                        {!props.sendLoading && <input
                            onChange={(e) => {
                                props.sendFile(e.currentTarget.files?.item(0));
                            }}
                            type="file"
                            hidden
                        />}
                    </IconButton>
                }
                onKeyDown={(e) => {
                    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
                        if (!e.shiftKey) {
                            e.preventDefault();
                            props.onSend();
                        }
                    }
                }}
                multiline
                onChange={(e) => props.setMessage(e.target.value)}
                value={props.message}
                className="chat-input"
                disabled={props.sendLoading}
            />
        </Box>
    );
};
