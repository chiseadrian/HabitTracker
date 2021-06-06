import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { getRandomQuote } from '../helpers/prepareState';
import { OpenCloseSidebar } from './ui/OpenCloseSidebar';


const urlImage = "https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
const { text, author } = getRandomQuote();

export const Home = () => {
    const [time, setTime] = useState(new Date());


    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <div className="home__main-content" style={{ backgroundImage: `url(${urlImage})` }}>
            <div className="sidebar-button-home">
                <OpenCloseSidebar />
            </div>
            <div className="centered">
                <p className="home-time"> {moment(time).format('HH:mm')} </p>
            </div>

            <div className="centered-bottom">
                <div className="quote">{text}</div>

                <em className="quote-author">- {author}</em>
            </div>
        </div>
    )
}
