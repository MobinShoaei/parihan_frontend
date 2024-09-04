import React, { useState, useEffect, useContext, useRef } from 'react';
import wavesurfer from 'wavesurfer.js';

const AudioWaveform = () => {
    const wavesurferRef = useRef(null);
    const timelineRef = useRef(null);

    // fetch file url from the context
    const fileURL =
        'https://api.twilio.com//2010-04-01/Accounts/AC25aa00521bfac6d667f13fec086072df/Recordings/RE6d44bc34911342ce03d6ad290b66580c.mp3';

    // crate an instance of the wavesurfer
    const [wavesurferObj, setWavesurferObj] = useState<any>();

    const [playing, setPlaying] = useState(true); // to keep track whether audio is currently playing or not
    const [volume, setVolume] = useState(1); // to control volume level of the audio. 0-mute, 1-max
    const [zoom, setZoom] = useState(1); // to control the zoom level of the waveform
    const [duration, setDuration] = useState(0); // duration is used to set the default region of selection for trimming the audio

    // create the waveform inside the correct component
    useEffect(() => {
        if (wavesurferRef.current && !wavesurferObj) {
            setWavesurferObj(
                wavesurfer.create({
                    container: '#waveform',
                    scrollParent: true,
                    autoCenter: true,
                    cursorColor: 'violet',
                    loopSelection: true,
                    waveColor: '#211027',
                    progressColor: '#69207F',
                    responsive: true,
                }),
            );
        }
    }, [wavesurferRef, wavesurferObj]);

    // once the file URL is ready, load the file to produce the waveform
    useEffect(() => {
        if (fileURL && wavesurferObj) {
            wavesurferObj.load(fileURL);
        }
    }, [fileURL, wavesurferObj]);

    useEffect(() => {
        if (wavesurferObj) {
            // once the waveform is ready, play the audio
            wavesurferObj.on('ready', () => {
                wavesurferObj.play();
                wavesurferObj.enableDragSelection({}); // to select the region to be trimmed
                setDuration(Math.floor(wavesurferObj.getDuration())); // set the duration in local state
            });

            // once audio starts playing, set the state variable to true
            wavesurferObj.on('play', () => {
                setPlaying(true);
            });

            // once audio starts playing, set the state variable to false
            wavesurferObj.on('finish', () => {
                setPlaying(false);
            });
        }
    }, [wavesurferObj]);

    // set volume of the wavesurfer object, whenever volume variable in state is changed
    useEffect(() => {
        if (wavesurferObj) wavesurferObj.setVolume(volume);
    }, [volume, wavesurferObj]);

    // set zoom level of the wavesurfer object, whenever the zoom variable in state is changed
    useEffect(() => {
        if (wavesurferObj) wavesurferObj.zoom(zoom);
    }, [zoom, wavesurferObj]);

    // when the duration of the audio is available, set the length of the region depending on it, so as to not exceed the total lenght of the audio
    useEffect(() => {
        if (duration && wavesurferObj) {
            // add a region with default length
            wavesurferObj.addRegion({
                start: Math.floor(duration / 2) - Math.floor(duration) / 5, // time in seconds
                end: Math.floor(duration / 2), // time in seconds
                color: 'hsla(265, 100%, 86%, 0.4)', // color of the selected region, light hue of purple
            });
        }
    }, [duration, wavesurferObj]);

    const handlePlayPause = (e: any) => {
        wavesurferObj.playPause();
        setPlaying(!playing);
    };

    return (
        <section className="waveform-container">
            <div ref={wavesurferRef} id="waveform" />
            <div ref={timelineRef} id="wave-timeline" />
            <div className="all-controls">
                <div className="left-container">
                    <button title="play/pause" className="controls" onClick={handlePlayPause}>
                        {playing ? (
                            <i className="material-icons">pause</i>
                        ) : (
                            <i className="material-icons">play_arrow</i>
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AudioWaveform;
