import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { startCheckin } from '../actions/auth';
import { AuthScreen } from '../components/auth/AuthScreen';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { DashboardRoutes } from './DashboardRoutes';
import { getBackgroundImage } from '../actions/ui';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';


export const AppRouter = () => {
    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startCheckin());
        dispatch(getBackgroundImage());
    }, [dispatch]);

    if (checking)
        return <LoadingSpinner />;

    return (
        <Router>
            <div className="flex full-screen">
                <Switch>
                    <PublicRoute
                        exact
                        path="/login"
                        component={AuthScreen}
                        isAuthenticated={!!uid} // !! devuelve falso si uid=null y true si uid es correcto
                    />
                    <PrivateRoute
                        path="/"
                        component={DashboardRoutes}
                        isAuthenticated={!!uid}
                    />
                </Switch>
            </div>
        </Router>
    )
}
