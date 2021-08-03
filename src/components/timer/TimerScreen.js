import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MainTopBar } from '../ui/MainTopBar';
import { timeToTimerFormat } from '../../helpers/timeFormat';


export const TimerScreen = () => {
    const { t } = useTranslation();
    const [play, setPlay] = useState(false);
    const [initial, setInitial] = useState(null);
    const [diff, setDiff] = useState(null);
    const { hours, minutes, seconds, milliseconds } = timeToTimerFormat(diff);


    const handlePlay = () => {
        (!play && !initial)
            ? setInitial(new Date())                              // play (first time)
            : (!play) && setInitial(new Date(new Date() - diff))  // paly (after stop)

        setPlay(!play);
    }

    const handleRestart = () => {
        setPlay(false);
        setInitial(new Date());
    }
    // const handleFlagTime = () => {
    //     console.log(hours, minutes, seconds, milliseconds);
    // }

    const tick = () => {
        setDiff(new Date(new Date() - initial));
    }

    useEffect(() => {
        (initial) && requestAnimationFrame(tick);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initial]);

    useEffect(() => {
        const interval = setInterval(() => { (diff && play) && tick() }, 10);
        return () => { clearInterval(interval); }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [diff, play]);


    return (
        <div className="fill-parent align-center" style={{ background: '#212529' }}>
            <MainTopBar title={'Timer'} t={t} />

            <div className="content-scroll-y">
                <div className="timer">
                    <div className="minutes">{hours}:{minutes}:{seconds},</div>
                    <div className="milliseconds">{milliseconds}</div>
                </div>


                <button className="start-timer" onClick={handlePlay} title="Play/Pause">
                    {
                        (play) ? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>
                    }
                </button>
                {/* <button className="button-timer" onClick={handleFlagTime} title="Flag Time" disabled={!play}>
                <i className="fas fa-flag"></i>
            </button> */}
                <button className="button-timer" onClick={handleRestart} title="Restart" disabled={play}>
                    <i className="fas fa-undo"></i>
                </button>

            </div>
        </div>
    )
}
