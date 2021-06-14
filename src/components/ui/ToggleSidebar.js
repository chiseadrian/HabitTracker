import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { uiCloseSidebar, uiOpenSidebar } from '../../actions/ui';


export const ToggleSidebar = () => {
    const dispatch = useDispatch();
    const { sidebarOpen } = useSelector(state => state.ui);

    const handleToggleSidebar = () => {
        (sidebarOpen) ? dispatch(uiCloseSidebar()) : dispatch(uiOpenSidebar());
    }

    return (
        <>
            <button className="open-close-sidebar" onClick={handleToggleSidebar}>
                {
                    (sidebarOpen)
                        ? <i className="fas fa-times"></i>
                        : <i className="fas fa-bars"></i>
                }
            </button>
        </>
    )
}
