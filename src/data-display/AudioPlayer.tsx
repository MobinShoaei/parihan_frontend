import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/AudioPlayer.module.css';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';
import { Box } from '@mui/material';

interface AudioPlayerProps {
    url: string;
}

const AudioPlayer = (props: AudioPlayerProps) => {
    // state
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [duration, setDuration] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);

    // references
    const audioPlayer: any = useRef(); // reference our audio component
    const progressBar: any = useRef(); // reference our progress bar
    const animationRef: any = useRef(); // reference the animation

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
        progressBar.current.max = seconds;
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

    const calculateTime = (secs: number) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    };

    const onLoadedMetadata = () => {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
        progressBar.current.max = seconds;
    };

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    };

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
    };

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
    };

    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty(
            '--seek-before-width',
            `${(progressBar.current.value / duration) * 100}%`,
        );

        setCurrentTime(progressBar.current.value);
    };

    return (
        <Box className={styles.audioPlayer}>
            <Box className={styles.duration}>{duration ? calculateTime(duration) : '00:00'}</Box>

            <Box sx={{ direction: 'initial', display: 'flex' }}>
                <input
                    type="range"
                    className={styles.progressBar}
                    defaultValue="0"
                    ref={progressBar}
                    onChange={changeRange}
                />
            </Box>

            <Box className={styles.currentTime}>{calculateTime(currentTime)}</Box>
            <button onClick={togglePlayPause} className={styles.playPause}>
                {isPlaying ? (
                    <FaPause size={16} className={styles.play} />
                ) : (
                    <FaPlay size={16} className={styles.play} />
                )}
            </button>
            <audio ref={audioPlayer} src={props.url} preload="none"></audio>
        </Box>
    );
};

export default AudioPlayer;
