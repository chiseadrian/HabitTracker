import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';

import { Sidebar } from '../components/ui/Sidebar';
import { Home } from '../components/home/Home';
import { NotesScreen } from '../components/notes/NotesScreen';
import { RoutineScreen } from '../components/routine/RoutineScreen';
import { WeekScreen } from '../components/week/WeekScreen';
import { MonthScreen } from '../components/month/MonthScreen';
import { ListsScreen } from '../components/lists/ListsScreen';
import { TimerScreen } from '../components/timer/TimerScreen';


export const DashboardRoutes = () => {
    const { sidebarOpen } = useSelector(state => state.ui);

    return (
        <div className="flex">
            <Sidebar />
            <div className={(sidebarOpen) ? 'contenedor' : 'contenedor-sidebar-closed'}>
                <Switch>
                    <Route exact path="/notes" component={NotesScreen} />
                    <Route exact path="/routine" component={RoutineScreen} />
                    <Route exact path="/week" component={WeekScreen} />
                    <Route exact path="/month" component={MonthScreen} />
                    <Route exact path="/lists" component={ListsScreen} />
                    <Route exact path="/timer" component={TimerScreen} />
                    <Route exact path="/" component={Home} />

                    <Redirect to="/" />
                </Switch>
            </div >
        </div >
    )
}
