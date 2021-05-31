
import React from 'react';
import { useSelector } from 'react-redux';

import { WeekTable } from './WeekTable';
import { WeekChart } from './WeekChart';
import { AddNewFab } from '../ui/AddNewFab';
import { getDaysDoneToChart } from '../../helpers/dataToChart';
import { weekTableFormat } from '../../helpers/tableFormat';


export const WeekScreen = () => {
    const { routines } = useSelector(state => state.routine);
    const { changes, days } = useSelector(state => state.week);
    const tableRows = weekTableFormat(days, routines);

    return (
        <div className="fill-parent main__content">
            <WeekTable
                days={days}
                routines={routines}
                tableRows={tableRows}
            />

            <WeekChart days={getDaysDoneToChart(tableRows)} />

            {
                (changes.length > 0) && <AddNewFab type="guardar" />
            }
        </div>
    )
}
