import {Avatar, Box, CircularProgress, IconButton, Typography} from '@mui/material';
import React, {useState} from 'react';
import moment from 'jalali-moment';
import Image from 'next/image';
import DownloadIcon from '@mui/icons-material/Download';
import {downloadFileWithUrl} from '../../utils/functions';
import Modal from '../common/Modal';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface MessageProps {
    guest?: boolean;
    loading?: boolean;
    author: string;
    text?: string;
    file?: string;
    date: string;
}

export const Message = (props: MessageProps): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(false);
    const [fileFormat, setFileFormat] = useState<string | undefined>(
        props.file && props.text?.split('.').at(-1),
    );
    const [isImage, setIsImage] = useState<boolean>(
        fileFormat === 'jpg' || fileFormat === 'jpeg' || fileFormat === 'png',
    );
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <Box
            sx={{
                textAlign: 'left',
                display: 'flex',
                flexDirection: props.guest ? 'row' : 'row-reverse',
                mb: '25px',
                padding: '0 25px',
                gap: '10px',
            }}
        >
            <Typography
                sx={{
                    maxWidth: '65%',
                    lineHeight: 2,
                    backgroundColor: props.guest
                        ? 'rgba(234, 211, 211, 0.4)'
                        : 'rgba(34, 118, 216, 0.8)',
                    borderRadius: '10px',
                    fontSize: '14px',
                    color: props.guest ? 'black' : 'white',
                    padding: '10px 15px',
                    direction: 'ltr'
                }}
            >
                <Typography variant="caption">{props.author}</Typography>
                <br/>
                {props.loading ? (
                    <CircularProgress color="inherit" size={55} sx={{margin: '15px 25px'}}/>
                ) : props.file ? (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                        }}
                    >
                        <Box
                            onClick={() => {
                                if (isImage) {
                                    setVisible(true);
                                } else {
                                    if (props.file) {
                                        downloadFileWithUrl({
                                            url: props.file,
                                            name: props.text,
                                            isImage,
                                            changeLoading: setLoading,
                                        });
                                    }
                                }
                            }}
                            sx={{
                                width: '60px',
                                height: '60px',
                                background: isImage
                                    ? 'transparent'
                                    : props.guest
                                        ? '#3993fb'
                                        : '#fcc936',
                                color: 'white',
                                borderRadius: '10px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                                position: 'relative',
                                '&:hover': {
                                    '& .file-message-download': {
                                        opacity: 1,
                                    },
                                },
                            }}
                        >
                            {isImage ? (
                                <Image
                                    src={props.file}
                                    layout="fill"
                                    quality={35}
                                    objectFit="contain"
                                    alt="true"
                                />
                            ) : (
                                fileFormat
                            )}
                            <Box
                                className="file-message-download"
                                sx={{
                                    transition: 'opacity 0.2s',
                                    cursor: 'pointer',
                                    opacity: 0,
                                    position: 'absolute',
                                    borderRadius: isImage ? '0px' : '10px',
                                    top: 0,
                                    alignItems: 'center',
                                    display: 'flex',
                                    height: '100%',
                                    background: 'inherit',
                                    width: '100%',
                                    justifyContent: 'center',
                                    backdropFilter: 'blur(4px)',
                                }}
                            >
                                {loading ? (
                                    <CircularProgress size={25} color="inherit"/>
                                ) : !isImage ? (
                                    <DownloadIcon sx={{cursor: 'pointer'}}/>
                                ) : (
                                    <RemoveRedEyeIcon/>
                                )}
                            </Box>
                        </Box>
                        {props.text}
                    </Box>
                ) : (
                    props.text
                )}
            </Typography>
            <Typography
                sx={{display: 'flex', alignItems: 'end', fontSize: '14px', color: '#8C8C8C'}}
            >
                {moment(props.date).locale('fa').format('H:mm')}
            </Typography>
            <Modal open={visible} onClose={() => setVisible(false)}>
                <>
                    {props.file && (
                        <Image
                            src={props.file}
                            width={600}
                            height={700}
                            quality={100}
                            objectFit="contain"
                            className="modal-message-file-image"
                            alt="Image"
                        />
                    )}
                    <IconButton
                        sx={{
                            position: 'absolute',
                            bottom: '20px',
                            right: '26px',
                        }}
                        onClick={() => {
                            if (props.file) {
                                downloadFileWithUrl({
                                    url: props.file,
                                    name: props.text,
                                    isImage,
                                    changeLoading: setLoading,
                                });
                            }
                        }}
                    >
                        <DownloadIcon color="primary"/>
                    </IconButton>
                </>
            </Modal>
        </Box>
    );
};
