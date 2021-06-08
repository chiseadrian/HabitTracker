import Swal from "sweetalert2";

import { giveStartEndPeriod } from "../helpers/dateFormat";
import { fetchConToken } from "../helpers/fetch";
import { checkIsInChanges } from "../helpers/inputTimeChanges";
import { timeToMinutes } from "../helpers/timeFormat";
import { types } from "../types/types";
import { routineStartLoading } from "./routine";


export const dayStartLoading = (period, date) => {
    return async (dispatch, getState) => {
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
export const taskLoaded = (days) => ({
    type: types.taskLoaded,
    payload: days
})

export const taskStartUpdateChange = (changeDay, change) => {
    return (dispatch, getState) => {
        const changes = getState().week.changes;

        const inChanges = checkIsInChanges(changes, change.numDay); //comprueba si ya se esta en week.changes
        if (!inChanges) dispatch(taskAddNewChange(changeDay));      //si no está se añade
        else dispatch(taskUpdateChange(change));                    //si está se actualiza
    }
}
export const taskUpdateChange = (task) => ({
    type: types.taskUpdateChange,
    payload: task
})
export const taskAddNewChange = (task) => ({
    type: types.taskAddNewChange,
    payload: task
})
export const taskAddNewDay = (day) => ({
    type: types.taskAddNewDay,
    payload: day
})

export const taskClearChanges = () => ({
    type: types.taskClearChanges
})

export const taskUpdate = (task) => ({
    type: types.taskUpdate,
    payload: task
})

export const taskStartSave = () => {
    return async (dispatch, getState) => {
        const changes = getState().week.changes;
        let errors = false;
        let resp = null;
        let body = null;

        try {
            changes.forEach(async change => {
                let newDone = 0;
                for (let rid in change.values) {
                    const time = timeToMinutes(change.values[rid]);
                    change.values[rid] = time;
                    if (time !== null) {
                        newDone += time
                    } else {
                        errors = true;
                        throw Swal.fire('Incorrect Format', 'e.g 1:30', 'error');
                    }
                }
                change.done = newDone;
                if (!errors) {
                    try {
                        if (change.id === undefined) {//si el dia no existe se crea
                            resp = await fetchConToken('days', change, 'POST');
                            body = await resp.json();
                        } else {
                            resp = await fetchConToken(`days/${change.id}`, { done: change.done, values: change.values }, 'PUT');
                            body = await resp.json();
                        }
                        (body.ok)
                            ? dispatch(taskUpdate(change))
                            : Swal.fire('Error', body.msg, 'error');
                    } catch (error) {
                        console.log(error);
                    }
                }
            });

            if (!errors)
                dispatch(taskClearChanges());
        } catch (error) {
            Swal.fire('Incorrect Format', 'e.g 1:30', 'error');
        }
    }
}

// export const dayStartLoadingMonth = () => {
//     return async (dispatch, getState) => {
//         const { uid } = getState().auth;

//         try {
//             const resp = await fetchConToken(`days/${uid}`);
//             const body = await resp.json();
//             const days = body.days;
//             dispatch(routineStartLoading());
//             dispatch(taskLoaded(days))
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }

export const taskClear = (task) => ({
    type: types.taskClear
})

export const taskUpdateChangeOnTasks = (toChange) => ({
    type: types.taskUpdateChangeOnTasks,
    payload: toChange
})





