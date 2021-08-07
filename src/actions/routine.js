import Swal from "sweetalert2";

import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";


export const routineStartLoading = () => {
    return async (dispatch) => {
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

export const routineStartAddNew = (routine, t) => {
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
                };

                dispatch(routineAddNew(routine))
            }
            else
                Swal.fire('Error', t(body.msg), 'error');
        } catch (error) {
            console.log(error);
        }
    }
}

export const routineStartDelete = (id, t) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`routines/${id}`, {}, 'DELETE');
            const body = await resp.json();

            if (body.ok) {
                dispatch(routineDelete(id));
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: t('Deleted'),
                    text: t('Your routine has been deleted'),
                    showConfirmButton: false,
                    timer: 1500
                });
            } else
                Swal.fire('Error', t(body.msg), 'error');
        } catch (error) {
            console.log(error);
        }
    }
}

export const routineStartUpdate = (routine, t) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`routines/${routine.id}`, routine, 'PUT');
            const body = await resp.json();

            (body.ok)
                ? dispatch(routineUpdate(routine))
                : Swal.fire('Error', t(body.msg), 'error');
        } catch (error) {
            console.log(error);
        }
    }
}

export const routineAddNew = (routine) => ({ type: types.routineAddNew, payload: routine });
export const routineClear = () => ({ type: types.routineClear });
export const routineClearActive = () => ({ type: types.routineClearActive });
export const routineDelete = (id) => ({ type: types.routineDelete, payload: id });
export const routineLoaded = (routines) => ({ type: types.routineLoaded, payload: routines });
export const routineSetActive = (routine) => ({ type: types.routineSetActive, payload: routine });
export const routineUpdate = (routine) => ({ type: types.routineUpdate, payload: routine });