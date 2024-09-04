/**
 * upload file
 */
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import { Box, Button, Paper, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { ellipsisText } from '../../utils/functions';

interface UploadProps {
    maxFiles?: number;
    setFiles: Dispatch<SetStateAction<File[]>>;
}

const Upload: React.FC<UploadProps> = (props) => {
    const [files, setFiles] = useState<File[]>([]);

    // Use dropzone hook for drag and drop upload
    const onDrop = (acceptedFiles: File[]) => {
        if (!props.maxFiles) {
            setFiles((files) => [...files, ...acceptedFiles]);
            return;
        }

        props.maxFiles && (props.maxFiles == 0 || props.maxFiles > files.length)
            ? setFiles((files) => [...files, ...acceptedFiles])
            : toast.error(`اجازه انتخاب ${props.maxFiles} مورد را دارید!`);
    };

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop: onDrop,
        noClick: true,
        accept: ['.xlsx', '.xls', '.xml'],
    });

    useEffect(() => {
        props.setFiles(files);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files]);

    const removeFile = (key: number) => {
        if (files.length <= 1) {
            setFiles([]);
            return;
        }
        setFiles((files) =>
            files.filter((element, index) => {
                return index !== key;
            }),
        );
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '20px',
            }}
        >
            <Box
                {...getRootProps()}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    rowGap: '10px',
                    height: '170px',
                    backgroundColor: 'grey.200',
                    border: '1px dashed #C8C4CE',
                    borderRadius: '4px',
                    padding: '10px 15px',
                }}
            >
                <input {...getInputProps()} />
                <CloudUploadOutlinedIcon sx={{ color: 'primary.light', fontSize: '42px' }} />
                <Typography sx={{ textAlign: 'center' }}>برای بارگذاری اینجا کلیک کنید</Typography>
                <Button variant="outlined" onClick={open}>
                    افزودن فایل جدید
                </Button>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '10px',
                }}
            >
                {files.map((file, index) => {
                    return (
                        <Paper
                            key={index}
                            variant="outlined"
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '10px 20px',
                            }}
                        >
                            <Box sx={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
                                <FilePresentOutlinedIcon sx={{ color: 'primary.light' }} />
                                <Typography>{ellipsisText(file.name, 20)}</Typography>
                            </Box>
                            <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                startIcon={<DeleteOutlineOutlinedIcon />}
                                onClick={() => removeFile(index)}
                            >
                                حذف
                            </Button>
                        </Paper>
                    );
                })}
            </Box>
        </Box>
    );
};
Upload.defaultProps = {
    maxFiles: 0,
};

export default Upload;
