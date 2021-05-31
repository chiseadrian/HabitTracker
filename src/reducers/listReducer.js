import { types } from '../types/types';
import { getValuesFilterDelete, getValuesFilterEdit } from '../helpers/prepareState';

const initialState = {
    activeList: null,
    activeRow: null,
    lists: []
}

export const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.listLoaded:
            return {
                ...state,
                lists: action.payload
            };
        case types.listSetActive:
            return {
                ...state,
                activeList: action.payload
            };
        case types.listClearActive:
            return {
                ...state,
                activeList: null
            };
        case types.listAddNewList:
            return {
                ...state,
                lists: [action.payload, ...state.lists],
                activeList: action.payload
            };
        case types.listDelete:
            return {
                ...state,
                lists: state.lists.filter(list => list.id !== action.payload)
            };
        case types.listUpdate:
            return {
                ...state,
                lists: state.lists.map(e => (e.id === action.payload.id) ? action.payload : e)
            };
        case types.listAddNewRow:
            return {
                ...state,
                activeList: { ...state.activeList, values: { [new Date().getTime()]: action.payload, ...state.activeList.values } }
            };
        case types.listDeleteRow:
            return {
                ...state,
                activeList: { ...state.activeList, values: getValuesFilterDelete(state.activeList.values, action.payload) }
            };
        case types.listUpdateRow:
            return {
                ...state,
                activeList: { ...state.activeList, values: getValuesFilterEdit(state.activeList.values, action.payload) }
            };
        case types.listSetActiveRow:
            return {
                ...state,
                activeRow: action.payload
            }

        default:
            return state;
    }
}