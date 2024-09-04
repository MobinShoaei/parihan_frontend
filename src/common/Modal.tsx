import React from 'react';
import {
    Backdrop,
    Box,
    Fade,
    Modal as MuiModal,
    ModalProps as MuiModalProps,
    SxProps,
} from '@mui/material';

interface ModalProps {
    children?: any;
    containerSx?: SxProps;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    borderRadius: '10px',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxWidth: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const Modal: React.FC<ModalProps & MuiModalProps> = (props) => {
    return (
        <MuiModal
            {...props}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.open}>
                <Box sx={{ ...style, ...props.containerSx }}>{props.children}</Box>
            </Fade>
        </MuiModal>
    );
};

export default Modal;
