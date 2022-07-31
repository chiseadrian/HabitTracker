import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getRandomQuote } from '../../helpers/prepareState';
import { ToggleSidebar } from '../ui/ToggleSidebar';
import { Timer } from './Timer';
import { UserEditModal } from './UserEditModal';
import { uiOpenUserEditModal } from '../../actions/ui';


const { text, author } = getRandomQuote();

export const Home = () => {
    const dispatch = useDispatch();
    const { backgroundImage } = useSelector(state => state.ui);

    const handleUserEdit = () => {
        dispatch(uiOpenUserEditModal());
    }


    return (
        <div className="home__main-content inner-shadow" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="top-bar-home">
                <ToggleSidebar />

                <button className="top-bar-buttons-home" onClick={handleUserEdit} >
                    <i className="fas fa-user-edit"></i>
                </button>
            </div>

            <div className="centered">
                <Timer />
            </div>

            <div className="centered-bottom">
                <div className="quote">{text}</div>
                <em className="quote-author">- {author}</em>
            </div>

            <UserEditModal />
        </div>
    )
}
