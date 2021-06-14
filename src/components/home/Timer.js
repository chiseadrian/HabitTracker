import React, { useEffect, useState } from 'react';
import moment from 'moment';


export const Timer = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <p className="home-time"> {moment(time).format('HH:mm')} </p>
    )
}
