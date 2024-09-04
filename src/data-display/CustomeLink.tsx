import { SxProps, Theme, Typography } from "@mui/material"
import Link from "next/link"
import React from "react"

interface CustomeLinkProps {
    href: string,
    children: any,
    sx?: SxProps<Theme>,
    fontSize?: number
}

export const CustomeLink: React.FC<CustomeLinkProps> = (props) => {
    return (
        <Link href={props.href}>
            <a>
                <Typography variant="body2" fontSize={props.fontSize} sx={props.sx}>
                    {props.children}
                </Typography>
            </a>
        </Link>
    )
}