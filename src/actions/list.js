import Swal from "sweetalert2";

import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";
import { uiCloseModal } from "./ui";


export const listStartLoading = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`lists`);
            const body = await resp.json();
            const lists = body.lists;

            dispatch(listSetActive(lists[0]));
            dispatch(listsLoaded(lists));
        } catch (error) {
            console.log(error);
        }
    }
}

export const listStartAddNew = (list, t) => {
    return async (dispatch, getState) => {
        const { uid, name } = getState().auth;

        try {
            const resp = await fetchConToken('lists', list, 'POST');
            const body = await resp.json();

            if (body.ok) {
                list.id = body.list.id;
                list.user = {
                    _id: uid,
                    name: name
                }
                dispatch(listAddNewList(list));
            }
            else
                Swal.fire('Error', t(body.msg), 'error');
        } catch (error) {
            console.log(error);
        }
    }
}

export const listStartDeleteList = (id, t) => {
    return async (dispatch, getState) => {

        try {
            const resp = await fetchConToken(`lists/${id}`, {}, 'DELETE');
            const body = await resp.json();
            if (body.ok) {
                await dispatch(listDelete(id));
                Swal.fire({
                    icon: 'success',
                    title: t('Deleted'),
                    text: t('Your list has been deleted'),
                    showConfirmButton: false,
                    timer: 1500
                });

                const { lists } = getState().list;
                (lists.length > 0)
                    ? dispatch(listSetActive(lists[0]))
                    : dispatch(listClearActive())

                dispatch(uiCloseModal());
            } else
                Swal.fire('Error', t(body.msg), 'error');
        } catch (error) {
            console.log(error);
        }
    }
}

export const listStartUpdateList = (list, t) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`lists/${list.id}`, list, 'PUT');
            const body = await resp.json();

            (body.ok)
                ? dispatch(listUpdate(list))
                : Swal.fire('Error', t(body.msg), 'error');

            dispatch(listSetActive(list));
        } catch (error) {
            console.log(error);
        }
    }
}

export const listStartRow = (type, row, t) => {
    return async (dispatch, getState) => {
        if (type === 'add') {
            await dispatch(listAddNewRow(row));
        } else if (type === 'delete') {
            await dispatch(listDeleteRow(row)); //row = value id (date timestamp)
        } else if (type === 'update') {
            await dispatch(listUpdateRow(row));
        }

        const { activeList: list } = getState().list;

        try {
            const resp = await fetchConToken(`lists/${list.id}`, list, 'PUT');
            const body = await resp.json();

            (body.ok)
                ? dispatch(listUpdate(list))
                : Swal.fire('Error', t(body.msg), 'error');
        } catch (error) {
            console.log(error);
        }
    }
}


export const listAddNewList = (list) => ({ type: types.listAddNewList, payload: list });
export const listAddNewRow = (row) => ({ type: types.listAddNewRow, payload: row });
export const listClearActive = () => ({ type: types.listClearActive });
export const listDelete = (id) => ({ type: types.listDelete, payload: id });
export const listDeleteRow = (rowId) => ({ type: types.listDeleteRow, payload: rowId });
export const listSetActive = (list) => ({ type: types.listSetActive, payload: list });
export const listSetActiveRow = (row) => ({ type: types.listSetActiveRow, payload: row });
export const listsLoaded = (lists) => ({ type: types.listLoaded, payload: lists });
export const listUpdate = (list) => ({ type: types.listUpdate, payload: list });
export const listUpdateRow = (row) => ({ type: types.listUpdateRow, payload: row });