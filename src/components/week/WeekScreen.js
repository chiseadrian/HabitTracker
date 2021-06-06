
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { WeekTable } from './WeekTable';
import { WeekChart } from './WeekChart';
import { AddNewFab } from '../ui/AddNewFab';
import { getDaysDoneToChart } from '../../helpers/dataToChart';
import { weekTableFormat } from '../../helpers/tableFormat';
import { MainTopBar } from '../ui/MainTopBar';
import { dateWeek } from '../../helpers/dateFormat';


export const WeekScreen = () => {
    const { routines } = useSelector(state => state.routine);
    const { changes, days } = useSelector(state => state.week);
    const [currentDate, setCurentDate] = useState(new Date());

    const tableRows = weekTableFormat(days, routines);
    const { monday, sunday, weekDays } = dateWeek(currentDate);
    const date = moment(currentDate);

    return (
        <div className="fill-parent">
            <MainTopBar
                handleBack={() => setCurentDate(date.add(-7, 'days').toDate())}
                handleForward={() => setCurentDate(date.add(7, 'days').toDate())}
                title={`${monday.format('DD MMMM')} - ${sunday.format('DD MMMM YYYY')}`}
                last={(sunday.add(1, 'days').toDate().getTime() >= new Date().getTime())}
            />

            <div className="content-scroll-y">
                <WeekTable
                    days={days}
                    routines={routines}
                    tableRows={tableRows}
                    currentDate={currentDate}
                    weekDays={weekDays}
                />

                <WeekChart days={getDaysDoneToChart(tableRows)} />

                {
                    (changes.length > 0) && <AddNewFab type="guardar" />
                }
            </div>
        </div>
    )
}
