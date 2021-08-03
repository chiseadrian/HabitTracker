import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { routineStartLoading } from '../../actions/routine';
import { AddNewFab } from '../ui/AddNewFab';
import { MainTopBar } from '../ui/MainTopBar';
import { RoutineChart } from './RoutineChart';
import { RoutineModal } from './RoutineModal';
import { RoutineTable } from './RoutineTable';


export const RoutineScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { routines } = useSelector(state => state.routine);


    useEffect(() => {
        dispatch(routineStartLoading());
    }, [dispatch])

    return (
        <div className="fill-parent">
            <MainTopBar title={'Daily Routine'} t={t} />

            <div className="content-scroll-y">
                <RoutineTable routines={routines} t={t} />
                <RoutineChart routines={routines} t={t} />

                <AddNewFab type="routine" t={t} />
                <RoutineModal t={t} />
            </div>
        </div>
    )
}
