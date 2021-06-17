import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { taskAddNewDay, taskUpdateChange } from '../../actions/task';
import { getDateNumbers } from '../../helpers/dateFormat';
import { checkIsInChanges, inChanges } from '../../helpers/inputTimeChanges';
import { timeToMinutes } from '../../helpers/timeFormat';


export const WeekTimeInput = ({ id, disabled, dayData, numDay, numMonth, numYear, weekChanged }) => {
    const dispatch = useDispatch();
    const { changes } = useSelector(state => state.week);
    const [value, setValue] = useState(dayData?.duration || '');
    const [error, setError] = useState(false);
    const hasChanged = inChanges(changes, id, numDay, numMonth, numYear);


    const createDay = (value) => {
        const { day, month, year } = getDateNumbers(new Date(numYear, numMonth - 1, numDay));
        const date = new Date(year, month - 1, day).getTime();
        const inChanges = checkIsInChanges(changes, date);

        if (!inChanges) {   //se añade a changes si no existe el dia
            dispatch(taskAddNewDay({
                numDay: day,
                numMonth: month,
                numYear: year,
                done: 0,
                date,
                values: { [id]: value }
            }));
        } else {    //se actualiza en changes (pero sin estar en la BD)
            dispatch(taskUpdateChange({
                date,
                rid: id,
                value
            }));
        }
    }

    const updateDay = (value) => {
        const inChanges = checkIsInChanges(changes, dayData.day.date);

        (!inChanges)
            ? dispatch(taskAddNewDay({
                ...dayData.day,
                values: { ...dayData.day.values, [id]: value }
            }))
            : dispatch(taskUpdateChange({
                date: dayData.day.date,
                rid: id,
                value
            }));
    }

    const handleOnChange = ({ target }) => {
        const { value } = target;
        setValue(value);
        (timeToMinutes(value) === null) ? setError(true) : setError(false);

        (dayData === undefined)
            ? createDay(value)   //si no existe el dia en week.days
            : updateDay(value);  //si existe se actualiza
    }

    useEffect(() => {       //se actualiza el valor de los inputs 
        if (weekChanged)    //solo si cambia de semana
            setValue(dayData?.duration || '');
    }, [weekChanged, dayData]);


    return (
        <td >
            {
                (!disabled) && (
                    <input
                        type="text"
                        autoComplete="off"
                        className={`inputWeek ${(value !== '') && 'primary_color'} ${(error) ? 'input-error' : (hasChanged) && 'changed'}`}
                        name={`${id}-${numDay}-${numMonth}-${numYear}`}
                        onChange={handleOnChange}
                        value={(hasChanged) ? hasChanged : (value !== '0:00') ? value : ''}
                    />
                )
            }
        </td>
    );
};