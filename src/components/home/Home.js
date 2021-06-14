import React from 'react';
import { useSelector } from 'react-redux';

import { getRandomQuote } from '../../helpers/prepareState';
import { ToggleSidebar } from '../ui/ToggleSidebar';
import { Timer } from './Timer';


const { text, author } = getRandomQuote();

export const Home = () => {
    const { backgroundImage } = useSelector(state => state.ui);

    return (
        <div className="home__main-content" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="sidebar-button-home">
                <ToggleSidebar />
            </div>

            <div className="centered">
                <Timer />
            </div>

            <div className="centered-bottom">
                <div className="quote">{text}</div>
                <em className="quote-author">- {author}</em>
            </div>
        </div>
    )
}
