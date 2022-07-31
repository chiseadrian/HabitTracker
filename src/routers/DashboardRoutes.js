import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';
import i18next from 'i18next';

import { SidebarScreen } from '../components/ui/SidebarScreen';
import { Home } from '../components/home/Home';
import { NotesScreen } from '../components/notes/NotesScreen';
import { RoutineScreen } from '../components/routine/RoutineScreen';
import { WeekScreen } from '../components/routine/week/WeekScreen';
import { MonthScreen } from '../components/routine/month/MonthScreen';
import { ListsScreen } from '../components/lists/ListsScreen';
import { TimerScreen } from '../components/timer/TimerScreen';


export const DashboardRoutes = () => {
    const { sidebarOpen } = useSelector(state => state.ui);
    const { language } = useSelector(state => state.auth);

    useEffect(() => {
        i18next.changeLanguage(language);
    }, [language])

    return (
        <>
            <SidebarScreen />
            <div className={(sidebarOpen) ? 'contenedor' : 'contenedor-sidebar-closed'}>
                <Switch>
                    <Route exact path="/notes" component={NotesScreen} />
                    <Route exact path="/routine" component={RoutineScreen} />
                    <Route exact path="/routine/week" component={WeekScreen} />
                    <Route exact path="/routine/month" component={MonthScreen} />
                    <Route exact path="/lists" component={ListsScreen} />
                    <Route exact path="/timer" component={TimerScreen} />
                    <Route exact path="/" component={Home} />

                    <Redirect to="/" />
                </Switch>
            </div >
        </ >
    )
}
