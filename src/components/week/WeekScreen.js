
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { WeekTable } from './WeekTable';
import { WeekChart } from './WeekChart';
import { AddNewFab } from '../ui/AddNewFab';
import { getDaysDoneToChart } from '../../helpers/dataToChart';
import { weekTableFormat } from '../../helpers/tableFormat';
import { MainTopBar } from '../ui/MainTopBar';
import { dateWeek } from '../../helpers/dateFormat';


export const WeekScreen = () => {
    const { t } = useTranslation();
    const { routines } = useSelector(state => state.routine);
    const { changes, days } = useSelector(state => state.week);
    const [currentDate, setCurentDate] = useState(new Date());

    const tableRows = weekTableFormat(days, routines);
    const { monday, sunday, weekDays } = dateWeek(currentDate);

    const topBar = {
        title: `${monday.format('DD MMMM')} - ${sunday.format('DD MMMM YYYY')}`,
        last: (sunday.add(1, 'days').toDate().getTime() >= new Date().getTime())
    }

    const switchWeek = (num) => {
        setCurentDate(moment(currentDate).add(num, 'days').toDate());
    }

    return (
        <div className="fill-parent">
            <MainTopBar
                handleBack={() => switchWeek(-7)}
                handleForward={() => switchWeek(7)}
                title={topBar.title}
                last={topBar.last}
                t={t}
            />

            <div className="content-scroll-y">
                <WeekTable
                    days={days}
                    routines={routines}
                    tableRows={tableRows}
                    currentDate={currentDate}
                    weekDays={weekDays}
                    t={t}
                />

                <WeekChart days={getDaysDoneToChart(tableRows)} t={t} />

                {
                    (changes.length > 0) && <AddNewFab type="guardar" t={t} />
                }
            </div>
        </div>
    )
}
