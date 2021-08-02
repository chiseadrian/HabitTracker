import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startLogout } from '../../actions/auth';
import { uiCloseSidebar } from '../../actions/ui';
import { sidebarOptions } from '../../static/sidebarOptions';
import { useTranslation } from 'react-i18next';


export const Sidebar = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { sidebarOpen } = useSelector(state => state.ui);


    const handleLogout = () => {
        dispatch(startLogout());
    }

    const handleCloseSidebarSmallScreen = () => {
        if (sidebarOpen && window.innerWidth < 768) {
            dispatch(uiCloseSidebar());
        }
    }

    return (
        <nav id="sidebar" className={!sidebarOpen ? 'active' : ''}>
            <ul className="list-unstyled components" onClick={handleCloseSidebarSmallScreen}>
                <li className="active sidebar-top-title">
                    {
                        (sidebarOpen) && <div> Habit Tracker </div>
                    }
                </li>

                {
                    sidebarOptions.map(({ title, icon, to }) =>
                        <li className="sidebar-item" title={t(title)} key={title}>
                            <NavLink
                                activeClassName="current"
                                className="nav-item nav-link"
                                to={to}
                            >
                                <i className={icon}></i>
                                {(sidebarOpen) && t(title)}
                            </NavLink>
                        </li>
                    )
                }
            </ul >

            <button className="logout" onClick={handleLogout} >
                <i className="fas fa-sign-out-alt"></i>
                {(sidebarOpen) && t('Logout')}
            </button>
        </nav >
    )
}
