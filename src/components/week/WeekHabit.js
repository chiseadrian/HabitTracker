import React from 'react';

import { dateWeek } from '../../helpers/dateFormat';
import { timeToTableFormat } from '../../helpers/timeFormat';
import { TimeInput } from '../ui/TimeInput';

const today = new Date().getTime();

export const WeekHabit = ({ rid, rname, rgoal, rdone, values, currentDate, weekChanged }) => {
    const { weekDays } = dateWeek(currentDate);

    return (
        <tr id={rid}>
            <th scope="row">{rname}</th>
            {
                weekDays.map(({ day, month, year }, i) => {
                    const current = new Date(year, month - 1, day).getTime();

                    return (<TimeInput
                        key={i}
                        id={rid}
                        disabled={(current > today)}
                        dayData={values[day]}
                        numDay={day}
                        numMonth={month}
                        numYear={year}
                        weekChanged={weekChanged}
                    />)
                })
            }
            <th scope="row">{timeToTableFormat(rdone)}</th>
            <th scope="row">{timeToTableFormat(rgoal)}</th>
            <th scope="row">{Math.trunc(rdone * 100 / rgoal)}%</th>
        </tr>
    )
}
