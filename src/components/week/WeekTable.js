import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { WeekHabit } from './WeekHabit';
import { timeToTableFormat } from '../../helpers/timeFormat';
import { calculateTotalWeek } from '../../helpers/calculateTotal';
import { dayStartLoading } from '../../actions/task';


let weekChanged = false;

export const WeekTable = ({ days, routines, tableRows, currentDate, weekDays, t }) => {
    const dispatch = useDispatch();
    const { changes } = useSelector(state => state.week);
    const totals = calculateTotalWeek(days, routines);

    useEffect(() => {
        dispatch(dayStartLoading('week', currentDate));
        weekChanged = true;
    }, [dispatch, currentDate]);


    return (
        <div className="scroll-x">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col" className="week__title-color table-warning">{t('Task')}</th>
                        <th scope="col" className="week__days-title">{t('Mon')}</th>
                        <th scope="col" className="week__days-title">{t('Tue')}</th>
                        <th scope="col" className="week__days-title">{t('Wed')}</th>
                        <th scope="col" className="week__days-title">{t('Thu')}</th>
                        <th scope="col" className="week__days-title">{t('Fri')}</th>
                        <th scope="col" className="week__days-title">{t('Sat')}</th>
                        <th scope="col" className="week__days-title">{t('Sun')}</th>
                        <th scope="col" className="week__done-title table-success">{t('Done')}</th>
                        <th scope="col" className="week__goal-title table-info">{t('Goal')}</th>
                        <th scope="col" className="week__title-color table-warning">{t('Completed')} (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (tableRows.length > 0)
                            ? (
                                tableRows.map(row => {
                                    return <WeekHabit
                                        key={row.rid}
                                        currentDate={currentDate}
                                        weekChanged={weekChanged}
                                        changes={changes}
                                        {...row}
                                    />
                                })
                            )
                            : (
                                <tr><th colSpan="11" style={{ textAlign: 'center' }}>No data available</th></tr>
                            )
                    }
                    <tr>
                        <th scope="row" className="week__title-color table-warning">Total</th>
                        {
                            weekDays.map((e, i) =>
                                <th scope="row" key={i} className="week__days-title">{totals[e.day]}</th>
                            )
                        }
                        <th scope="row" className="week__done-title table-success">{timeToTableFormat(totals.done)}</th>
                        <th scope="row" className="week__goal-title table-info">{timeToTableFormat(totals.goal)}</th>
                        <th scope="row" className="week__title-color table-warning">{totals.complete}%</th>
                    </tr>
                </tbody>
                {weekChanged = false}
            </table>
        </div>
    )
}
