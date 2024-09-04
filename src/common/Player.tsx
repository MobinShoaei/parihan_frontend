import { Box, Button, IconButton, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Slider from '@mui/material/Slider';
import { sendRequest } from '../../utils/axios';
import { BackendUrls } from '../../utils/backend-urls';

interface PlayerProps {
    src?: string;
}
export const Player: React.FC<PlayerProps> = (props) => {
    const ref = useRef<HTMLAudioElement>(null);
    const [playing, setPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);

    useEffect(() => {
        if (playing) {
            ref.current?.play();
        } else {
            ref.current?.pause();
        }
    }, [playing]);

    useEffect(() => {
        ref.current?.addEventListener('timeupdate', () => {
            if (currentTime !== ref.current?.currentTime && ref.current?.currentTime) {
                setCurrentTime(Number(Number(ref.current?.currentTime).toFixed(0)));
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: 'secondary.light',
                display: 'flex',
                alignItems: 'center',
                maxWidth: '400px',
                gap: '10px',
                padding: '5px',
                borderRadius: '10px',
            }}
        >
            <audio hidden preload="auto" ref={ref} src={props.src} />
            <Typography variant="caption" width="37.5px">
                {new Date(currentTime * 1000).toISOString().substr(11, 8)}
            </Typography>
            <Slider
                step={1}
                component="span"
                min={0}
                value={currentTime}
                max={ref.current?.duration}
                onChange={(_, value) => {
                    if (typeof value === 'number' && ref.current) {
                        ref.current.currentTime = value;
                        setCurrentTime(value);
                    }
                }}
            />
            <IconButton sx={{ padding: '4px' }} onClick={() => setPlaying((r) => !r)}>
                {playing ? <PauseIcon color="primary" /> : <PlayArrowIcon color="primary" />}
            </IconButton>
        </Box>
    );
};
