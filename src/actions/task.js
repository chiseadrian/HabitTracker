import Swal from "sweetalert2";

import { giveStartEndPeriod } from "../helpers/dateFormat";
import { fetchConToken } from "../helpers/fetch";
import { timeToMinutes } from "../helpers/timeFormat";
import { types } from "../types/types";
import { routineStartLoading } from "./routine";


export const dayStartLoading = (period, date) => {
    return async (dispatch) => {
        const { start, end } = giveStartEndPeriod(period, date);

        try {
            const resp = await fetchConToken(`days/${start}/${end}`);
            const body = await resp.json();
            const days = body.days;

            dispatch(routineStartLoading());
            dispatch(taskLoaded(days))
        } catch (error) {
            console.log(error);
        }
    }
}

export const taskStartSave = (t) => {
    return async (dispatch, getState) => {
        const changes = getState().week.changes;
        let errors = false;

        try {
            changes.forEach(async change => {
                const { newDone, error } = calculateDone(change, t);
                change.done = newDone;
                errors = error;

                if (!errors)
                    await updateChange(dispatch, change, t);
            });

            if (!errors) {
                dispatch(taskClearChanges());
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: t('Saved successfully'),
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            Swal.fire(t('Incorrect Format'), `${t('e.g.')} 1: 30`, 'error');
        }
    }
}

const calculateDone = ({ values }, t) => {
    let newDone = 0;
    let error = false;

    for (let rid in values) {
        const time = timeToMinutes(values[rid]);
        values[rid] = time;

        if (time === null) {
            error = true;
            Swal.fire(t('Incorrect Format'), `${t('e.g.')} 1: 30`, 'error');
        } else {
            newDone += time
        }
    }

    return { newDone, error };
}

const updateChange = async (dispatch, change, t) => {
    const { id, done, values } = change;
    let resp = null;
    let body = null;

    try {
        (id === undefined)
            ? resp = await fetchConToken('days', change, 'POST')                    //si el dia no existe, se crea
            : resp = await fetchConToken(`days / ${id} `, { done, values }, 'PUT');    //si existe se actualiza

        body = await resp.json();

        (body.ok)
            ? dispatch(taskUpdate(change))
            : Swal.fire('Error', t(body.msg), 'error');
    } catch (error) {
        console.log(error);
    }
}

export const taskAddNewDay = (day) => ({ type: types.taskAddNewDay, payload: day });
export const taskUpdateChange = (task) => ({ type: types.taskUpdateChange, payload: task });
export const taskClear = () => ({ type: types.taskClear });
export const taskClearChanges = () => ({ type: types.taskClearChanges });
export const taskLoaded = (days) => ({ type: types.taskLoaded, payload: days });
export const taskUpdate = (task) => ({ type: types.taskUpdate, payload: task });



