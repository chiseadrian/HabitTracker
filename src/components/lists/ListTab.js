import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listSetActive } from '../../actions/list';


export const ListTab = (list) => {
    const dispatch = useDispatch();
    const { activeList } = useSelector(state => state.list)

    const handleClick = () => {
        dispatch(listSetActive(list));
    }

    return (
        <li className="nav-item">
            <button
                className={`tab ${(activeList.id === list.id) && 'active-tab'}`}
                onClick={handleClick}
            >
                {list.name}
            </button>
        </li>
    )
}
