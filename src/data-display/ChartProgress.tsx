import { Box, CircularProgress, circularProgressClasses, Typography } from "@mui/material";
import React from "react";
import { OverridableStringUnion } from '@mui/types';
import theme from "../theme";

interface ChartProgressProps {
    value?: number,
    text: JSX.Element | string,
    color?: OverridableStringUnion<
        'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit'
    >,
    size?: number,
    secondaryColor?: string,
}

export const ChartProgress: React.FC<ChartProgressProps> = ({
    value = 0,
    text,
    size = 130,
    color = 'secondary',
    secondaryColor = theme.palette.secondary.light
}) => {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex', justifyContent: "center", width: "100%" }}>
            <CircularProgress
                variant="determinate"
                sx={{
                    position: "absolute",
                    top: 0,
                    padding: `${size / 34}px`,
                    color: secondaryColor
                }}
                size={size - 0}
                thickness={1}
                value={100}
            />
            <CircularProgress
                variant="determinate" 
                value={value >= 100 ? 100 : value}
                size={size}
                color={color}
            />

            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                >
                    {text}
                </Typography>
            </Box>
        </Box>
    )
}