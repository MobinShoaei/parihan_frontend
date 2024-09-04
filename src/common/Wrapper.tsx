import { PaperProps, Paper as MuiPaper } from "@mui/material";
import React from "react";

export const Wrapper: React.FC<PaperProps> = (props) => {
    return (
        <MuiPaper
            {...props}
            sx={{
                background: '#FFFFFF',
                border: '1px solid',
                borderColor: 'secondary.light',
                borderRadius: '6px',
                display: "flex",
                flexDirection: "column",
                boxShadow: 'none',
                '& .MuiTableContainer-root': {
                    borderRadius: "6px"
                },
                ...props.sx,
            }}
        >
            {props.children}
        </MuiPaper>

    )
};