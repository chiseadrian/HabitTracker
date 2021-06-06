import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { routineStartLoading } from '../../actions/routine';
import { AddNewFab } from '../ui/AddNewFab';
import { MainTopBar } from '../ui/MainTopBar';
import { RoutineChart } from './RoutineChart';
import { RoutineModal } from './RoutineModal';
import { RoutineTable } from './RoutineTable';


export const RoutineScreen = () => {
    const dispatch = useDispatch();
    const { routines } = useSelector(state => state.routine);

    useEffect(() => {
        dispatch(routineStartLoading());
    }, [dispatch])


    return (
        <div className="fill-parent">
            <MainTopBar title={'Daily Routine'} />

            <div className="content-scroll-y">
                <RoutineTable routines={routines} />
                <RoutineChart routines={routines} />

                <AddNewFab type="routine" />
                <RoutineModal />
            </div>
        </div>
    )
}
