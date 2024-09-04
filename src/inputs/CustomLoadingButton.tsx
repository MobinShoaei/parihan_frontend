import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import React from "react";

export const CustomeLoadingButton: React.FC<LoadingButtonProps> = (props) => {
    return (
        <LoadingButton
            type="submit"
            color="primary"
            variant="contained"
            size="large"
            loadingPosition="start"
            fullWidth
            {...props}
        />
    )
}