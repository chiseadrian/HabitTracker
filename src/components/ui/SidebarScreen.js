import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { useTranslation } from 'react-i18next';
import { sidebarOptions } from '../../static/sidebarOptions';
import { CustomMenuItem } from './CustomMenuItem';
import logo from '../../static/ht-logo.png';

import { ProSidebar, Menu, SubMenu, SidebarFooter, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

export const SidebarScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { sidebarOpen } = useSelector(state => state.ui);

    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
        <ProSidebar collapsed={!sidebarOpen} id="sidebar" className={(!sidebarOpen) && 'active'}>
            <SidebarHeader>
                <div className={(sidebarOpen) ? 'sidebar-header' : 'sidebar-closed-header'}>
                    <img src={logo} className={`rotate ${(sidebarOpen) ? 'sidebar-logo' : 'sidebar-closed-logo'}`} />
                    {(sidebarOpen) && 'Habit Tracker'}
                </div>
            </SidebarHeader>
            <SidebarContent>
                <Menu iconShape="round">
                    {
                        sidebarOptions.map(({ title, icon, to, submenu }) =>
                            (!!submenu) ?
                                <SubMenu key={title} title={t(title)} icon={<i className={icon} />}>
                                    {
                                        submenu.map(({ title: a, icon: b, to: c }) =>
                                            <CustomMenuItem key={a} title={a} icon={b} to={c} />
                                        )
                                    }
                                </SubMenu>
                                :
                                <CustomMenuItem key={title} title={title} icon={icon} to={to} />
                        )
                    }
                </Menu>
            </SidebarContent>
            <SidebarFooter>
                <button className="logout" onClick={handleLogout} >
                    <i className="fas fa-sign-out-alt"></i>
                    {(sidebarOpen) && t('Logout')}
                </button>
            </SidebarFooter>
        </ProSidebar >
    )
}