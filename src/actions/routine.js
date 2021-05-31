import Swal from "sweetalert2";

import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";


export const routineStartLoading = () => {
    return async (dispatch, getState) => {
        try {
            const resp = await fetchConToken(`routines`);
            const body = await resp.json();
            const routines = body.routines;
            dispatch(routineLoaded(routines))
        } catch (error) {
            console.log(error);
        }
    }
}
export const routineLoaded = (routines) => ({
    type: types.routineLoaded,
    payload: routines
})

export const routineStartAddNew = (routine) => {
    return async (dispatch, getState) => {
        const { uid, name } = getState().auth;

        try {
            const resp = await fetchConToken('routines', routine, 'POST');
            const body = await resp.json();

            if (body.ok) {
                routine.id = body.routine.id;
                routine.user = {
                    _id: uid,
                    name: name
                }
                dispatch(routineAddNew(routine))
            }
            else
                Swal.fire('Error', body.msg, 'error');
        } catch (error) {
            console.log(error);
        }
    }
}
export const routineAddNew = (routine) => ({
    type: types.routineAddNew,
    payload: routine
})

export const routineStartDelete = (id) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`routines/${id}`, {}, 'DELETE');
            const body = await resp.json();
            if (body.ok) {
                dispatch(routineDelete(id));
                Swal.fire('Deleted!', 'Your routine has been deleted.', 'success')
            } else
                Swal.fire('Error', body.msg, 'error');
        } catch (error) {
            console.log(error);
        }
    }
}
export const routineDelete = (id) => ({
    type: types.routineDelete,
    payload: id
})

export const routineStartUpdate = (routine) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`routines/${routine.id}`, routine, 'PUT');
            const body = await resp.json();
            (body.ok)
                ? dispatch(routineUpdate(routine))
                : Swal.fire('Error', body.msg, 'error');
        } catch (error) {
            console.log(error);
        }
    }
}
const routineUpdate = (routine) => ({
    type: types.routineUpdate,
    payload: routine
})

export const routineSetActive = (routine) => ({
    type: types.routineSetActive,
    payload: routine
})
export const routineClearActive = () => ({
    type: types.routineClearActive
})
export const routineClear = () => ({
    type: types.routineClear
})