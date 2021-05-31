import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { taskAddNewDay, taskStartUpdateChange } from '../../actions/task';
import { getDateNumbers } from '../../helpers/dateFormat';
import { checkIsInChanges, inChanges } from '../../helpers/inputTimeChanges';
import { timeToMinutes } from '../../helpers/timeFormat';


export const TimeInput = ({ id, disabled, dayData, numDay, numMonth, numYear, weekChanged }) => {
    const dispatch = useDispatch();
    const { changes } = useSelector(state => state.week)
    const [value, setValue] = useState(dayData?.duration || '');
    const [error, setError] = useState(false);
    const hasChanged = inChanges(changes, id, numDay, numMonth, numYear);


    useEffect(() => {       //se actualiza el valor de los inputs 
        if (weekChanged)    //solo si cambia de semana
            setValue(dayData?.duration || '');
    }, [weekChanged, dayData]);


    const handleOnChange = ({ target }) => {
        setValue(target.value);
        (timeToMinutes(target.value) === null)
            ? setError(true)
            : setError(false);

        if (dayData === undefined) {                //si no existe el dia en week.days
            const { day, month, year } = getDateNumbers(new Date(numYear, numMonth - 1, numDay));
            const inChanges = checkIsInChanges(changes, day);

            if (!inChanges) {   //si aun no esta en changes se añade
                dispatch(taskAddNewDay({
                    numDay: day,
                    numMonth: month,
                    numYear: year,
                    done: 0,
                    date: new Date(year, month - 1, day).getTime(),
                    values: { [id]: target.value }
                }));
            } else {    //si esta en changes se actualiza
                dispatch(taskStartUpdateChange(null, { numDay: day, rid: id, value: target.value }));
            }
        } else {    //si existe se actualiza
            const change = {
                ...dayData.day,
                values: {
                    ...dayData.day.values,
                    [id]: target.value
                }
            }
            dispatch(taskStartUpdateChange(change, { numDay: dayData.day.numDay, rid: id, value: target.value }));
        }
    };

    return (
        <td >
            {
                (!disabled)
                && <input
                    type="text"
                    autoComplete="off"
                    className={`inputWeek ${(value !== '') && 'primary_color'} ${(error) ? 'input-error' : (hasChanged) && 'changed'}`}
                    name={`${id}-${numDay}-${numMonth}-${numYear}`}
                    onChange={handleOnChange}
                    value={(hasChanged) ? hasChanged : (value !== '0:00') ? value : ''}
                />
            }
        </td>
    );
};