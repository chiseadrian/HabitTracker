import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { uiCloseSidebar } from '../../actions/ui';

import { MenuItem } from 'react-pro-sidebar';


export const CustomMenuItem = ({ title, icon, to }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { sidebarOpen } = useSelector(state => state.ui);
    const handleCloseSidebarSmallScreen = () => {
        if (sidebarOpen && window.innerWidth < 768) {
            dispatch(uiCloseSidebar());
        }
    }

    return (
        <>
            <MenuItem
                onClick={handleCloseSidebarSmallScreen}
                icon={<i className={icon} />}
            >
                {t(title)} <Link to={to} />
            </MenuItem>
        </>
    )
}
