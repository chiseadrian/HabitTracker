import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { startLogout } from '../../actions/auth';
import { uiCloseSidebar, uiOpenSidebar } from '../../actions/ui';


export const Sidebar = () => {
    const dispatch = useDispatch();
    const { sidebarOpen } = useSelector(state => state.ui);
    const { name } = useSelector(state => state.auth);

    const handleHideSidebar = () => {
        (sidebarOpen) ? dispatch(uiCloseSidebar()) : dispatch(uiOpenSidebar());
    }

    const handleLogout = (e) => {
        dispatch(startLogout());
    }

    const userIcon = [
        'fas fa-user',
        'fas fa-user-tie',
        'fas fa-user-secret',
        'fas fa-user-ninja',
        'fas fa-user-md',
        'fas fa-user-injured',
        'fas fa-user-graduate',
        'fas fa-user-astronaut',
        'fas fa-poo',
    ]

    return (
        <nav id="sidebar" className={!sidebarOpen ? 'active' : ''}>
            <ul className="list-unstyled components">
                <li className="active mt-1 sidebar-top-title">
                    {
                        (sidebarOpen) && (
                            <div>
                                Habit Tracker
                            </div>
                        )
                    }
                    <button className="btn shadow-none" onClick={handleHideSidebar}>
                        <i className={(sidebarOpen) ? "fas fa-times" : "fas fa-bars"}></i>
                    </button>
                </li>
                <li className="sidebar-item mt-1" title={name}>
                    <Link
                        className="nav-item nav-link"
                        to="/"
                    >
                        <i className={`${userIcon[7]} mr-5`}></i>
                        {(sidebarOpen) && name}
                    </Link>
                </li>
                <li className="sidebar-item mt-1" title="Routine">
                    <NavLink
                        activeClassName="current"
                        className="nav-item nav-link"
                        exact
                        to="/routine"
                    >
                        <i className="fas fa-calendar-day mr-5"></i>
                        {(sidebarOpen) && 'Routine'}
                    </NavLink>
                </li>
                <li className="sidebar-item mt-1" title="Week">
                    <NavLink
                        activeClassName="current"
                        className="nav-item nav-link"
                        exact
                        to="/week"
                    >
                        <i className="fas fa-calendar-week mr-5"></i>
                        {(sidebarOpen) && 'Week'}
                    </NavLink>
                </li>
                <li className="sidebar-item mt-1" title="Month">
                    <NavLink
                        activeClassName="current"
                        className="nav-item nav-link"
                        exact
                        to="/month"
                    >
                        <i className="far fa-calendar-alt mr-5"></i>
                        {(sidebarOpen) && 'Month'}
                    </NavLink>
                </li>
                <li className="sidebar-item mt-1" title="Notes">
                    <NavLink
                        activeClassName="current"
                        className="nav-item nav-link"
                        exact
                        to="/notes"
                    >
                        <i className="fas fa-sticky-note mr-5"></i>
                        {(sidebarOpen) && 'Notes'}
                    </NavLink>
                </li>
                <li className="sidebar-item mt-1" title="Lists">
                    <NavLink
                        activeClassName="current"
                        className="nav-item nav-link"
                        exact
                        to="/lists"
                    >
                        <i className="fas fa-list-ul mr-5"></i>
                        {(sidebarOpen) && 'Lists'}
                    </NavLink>
                </li>
                <li className="sidebar-item mt-1" title="Timer">
                    <NavLink
                        activeClassName="current"
                        className="nav-item nav-link"
                        exact
                        to="/timer"
                    >
                        <i className="fas fa-stopwatch mr-5"></i>
                        {(sidebarOpen) && 'Timer'}
                    </NavLink>
                </li>
            </ul>

            <button
                className="logout"
                onClick={handleLogout}
            >
                <i className="fas fa-sign-out-alt"></i>
                {(sidebarOpen) && 'Logout'}
            </button>
        </nav>
    )
}
