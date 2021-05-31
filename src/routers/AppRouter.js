import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';

import { startCheckin } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { DashboardRoutes } from './DashboardRoutes';

export const AppRouter = () => {
    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(startCheckin());
    }, [dispatch]);

    if (checking) {
        return (<div className="spinner-content">
            <div className="lds-ripple"><div></div><div></div></div>
            Loading...
        </div >);
    }

    return (
        <Router>
            <div className="full-screen">
                <Switch>
                    <PublicRoute
                        exact
                        path="/login"
                        component={LoginScreen}
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
