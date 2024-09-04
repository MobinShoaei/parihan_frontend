import React, {useState, useEffect} from 'react'
import {Typography} from "@mui/material";


export interface TimerProps {
    seconds: number;

    resendCode(): any;
}

export const Timer = (props: TimerProps): JSX.Element => {

    let max = props.seconds != null ? props.seconds : 120
    const [seconds, setSeconds] = useState<number>(max)

    useEffect(() => {
        let interval: any = null
        if (seconds == 0) {
            setSeconds(0)
            clearInterval(interval)
        } else {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [seconds])


    const showTimer = () => {
        let min: string = ("0" + (Math.floor(seconds / 60).toString())).slice(-2)
        let sec: string = ("0" + (seconds % 60).toString()).slice(-2)
        return (min + ':' + sec)
    }

    const resend = () => {
        props.resendCode()
        setSeconds(max)
    }

    return (
        (seconds == 0) ?
            <Typography sx={{color: '#35BBD6', cursor: 'pointer', textAlign: 'center'}} onClick={resend}>ارسال مجدد
                کد</Typography> :
            <Typography sx={{color: '#35BBD6', textAlign: 'center'}}> {showTimer()} تا ارسال مجدد</Typography>
    );
};