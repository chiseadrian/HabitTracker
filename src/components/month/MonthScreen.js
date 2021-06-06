import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { MonthChart } from './MonthChart'
import { dayStartLoading } from '../../actions/task';
import { MainTopBar } from '../ui/MainTopBar';
import { dateMonth } from '../../helpers/dateFormat';
import { MonthTable } from './MonthTable';


export const MonthScreen = () => {
    const dispatch = useDispatch();
    const { routines } = useSelector(state => state.routine);
    const { days } = useSelector(state => state.week);
    const [currentDate, setCurentDate] = useState(new Date());

    const { last } = dateMonth(currentDate);
    const date = moment(currentDate);

    useEffect(() => {
        dispatch(dayStartLoading('month', currentDate));  //hay que hacerlo con currentdate para cada mes + botones atras y adelante
    }, [dispatch, currentDate])



    return (
        <div className="fill-parent">
            <MainTopBar
                handleBack={() => setCurentDate(date.add(-1, 'month').toDate())}
                handleForward={() => setCurentDate(date.add(1, 'month').toDate())}
                title={`${last.format('MMMM')}`}
                last={(last.toDate().getTime() >= new Date().getTime())}
            />

            < MonthChart
                days={days}
                routines={routines}
            />

            {
                (days.length > 0) && (
                    <MonthTable
                        days={days}
                        routines={routines}
                        last={last}
                    />
                )
            }
        </div >
    )
}
