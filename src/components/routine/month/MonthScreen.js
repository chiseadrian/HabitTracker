import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { MonthChart } from './MonthChart'
import { dayStartLoading } from '../../../actions/task';
import { MainTopBar } from '../../ui/MainTopBar';
import { dateMonth } from '../../../helpers/dateFormat';
import { MonthTable } from './MonthTable';

export const MonthScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { routines } = useSelector(state => state.routine);
    const { days } = useSelector(state => state.week);
    const [currentDate, setCurentDate] = useState(new Date());

    const { last } = dateMonth(currentDate);
    const topBar = {
        title: `${last.format('MMMM')}`,
        last: (last.toDate().getTime() >= new Date().getTime())
    }

    const switchMonth = (num) => {
        setCurentDate(moment(currentDate).add(num, 'month').toDate());
    }


    useEffect(() => {
        dispatch(dayStartLoading('month', currentDate));  //hay que hacerlo con currentdate para cada mes + botones atras y adelante
    }, [dispatch, currentDate])

    return (
        <>
            <MainTopBar
                handleBack={() => switchMonth(-1)}
                handleForward={() => switchMonth(1)}
                title={topBar.title}
                last={topBar.last}
                t={t}
            />

            <div className="content-scroll-y">
                < MonthChart
                    days={days}
                    routines={routines}
                    t={t}
                />

                {
                    (days.length > 0) && (
                        <MonthTable
                            days={days}
                            routines={routines}
                            last={last}
                            t={t}
                        />
                    )
                }
            </div>
        </ >
    )
}
