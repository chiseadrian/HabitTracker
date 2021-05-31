import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import { uiCloseModal } from "./ui";


export const noteStartLoading = () => {
    return async (dispatch, getState) => {
        try {
            const resp = await fetchConToken(`notes`);
            const body = await resp.json();
            dispatch(notesLoaded(body.notes))
        } catch (error) {
            console.log(error);
        }
    }
}

export const noteStartAddNew = (note) => {
    return async (dispatch, getState) => {
        const { uid, name } = getState().auth;

        try {
            const resp = await fetchConToken('notes', note, 'POST');
            const body = await resp.json();

            if (body.ok) {
                note.id = body.note.id;
                note.user = {
                    _id: uid,
                    name: name
                }
                dispatch(noteAddNew(note))
            }
            else
                Swal.fire('Error', body.msg, 'error');
        } catch (error) {
            console.log(error);
        }
    }
}

export const noteStartUpdate = (note) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`notes/${note.id}`, note, 'PUT');
            const body = await resp.json();

            if (body.ok)
                dispatch(noteUpdate(note))
            else
                Swal.fire('Error', body.msg, 'error');
        } catch (error) {
            console.log(error);
        }
    }
}

export const noteStartDelete = (id) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`notes/${id}`, {}, 'DELETE');
            const body = await resp.json();

            if (body.ok) {
                dispatch(noteDelete(id));
                dispatch(noteClearActive());
                dispatch(uiCloseModal());
                Swal.fire('Deleted!', 'Your note has been deleted.', 'success')
            } else
                Swal.fire('Error', body.msg, 'error');
        } catch (error) {
            console.log(error);
        }
    }
}


export const noteSetActive = (note) => ({
    type: types.noteSetActive,
    payload: note
})
export const noteClearActive = () => ({
    type: types.noteClearActive
})
export const notesLoaded = (notes) => ({
    type: types.noteLoaded,
    payload: notes
})
export const noteAddNew = (note) => ({
    type: types.noteAddNew,
    payload: note
})
export const noteUpdate = (note) => ({
    type: types.noteUpdate,
    payload: note
})
export const noteClear = (note) => ({
    type: types.noteClear
})
export const noteDelete = (id) => ({
    type: types.noteDelete,
    payload: id
})