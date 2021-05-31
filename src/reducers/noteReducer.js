import { types } from '../types/types';

const initialState = {
    activeNote: null,
    notes: []
}

export const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.noteSetActive:
            return {
                ...state,
                activeNote: action.payload
            };
        case types.noteClearActive:
            return {
                ...state,
                activeNote: null
            };
        case types.noteLoaded:
            return {
                ...state,
                notes: action.payload
            };
        case types.noteAddNew:
            return {
                ...state,
                notes: [...state.notes, action.payload]
            };
        case types.noteUpdate:
            return {
                ...state,
                notes: state.notes.map(
                    e => (e.id === action.payload.id) ? action.payload : e
                )
            };
        case types.noteDelete:
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.payload)
            };
        case types.noteClear:
            return {
                ...initialState
            };

        default:
            return state;
    }
}